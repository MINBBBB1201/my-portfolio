import { containerVolumeM3, type ContainerSpec } from "./containers"
import { computeCenterOfGravity } from "./center-of-gravity"
import { cmToMm } from "./geometry"
import {
  expandAndSort,
  fitsEmptyContainer,
  innerMmOf,
  packInstances,
  type CargoInstance,
} from "./packer"
import type {
  CargoBoxInput,
  LoadPlan,
  UnplacedCargo,
  UnplacedReason,
} from "./types"

/** 소수 자릿수를 맞춰 반올림 — 화면에 0.30000000000000004 가 뜨는 걸 막는다 */
function round(value: number, digits: number): number {
  const f = 10 ** digits
  return Math.round(value * f) / f
}

/** 입력 검증 — 여기서 걸러 두면 패커가 이상한 값으로 무한히 헛돌지 않는다 */
function assertValidInput(boxes: readonly CargoBoxInput[]): void {
  const seen = new Set<string>()
  for (const box of boxes) {
    if (seen.has(box.id)) {
      throw new Error(`화물 id 가 중복됩니다: ${box.id}`)
    }
    seen.add(box.id)

    const numbers: [string, number][] = [
      ["lengthCm", box.lengthCm],
      ["widthCm", box.widthCm],
      ["heightCm", box.heightCm],
      ["weightKg", box.weightKg],
      ["quantity", box.quantity],
    ]
    for (const [field, value] of numbers) {
      if (!Number.isFinite(value)) {
        throw new Error(`${box.id}.${field} 가 숫자가 아닙니다: ${value}`)
      }
    }
    if (box.lengthCm <= 0 || box.widthCm <= 0 || box.heightCm <= 0) {
      throw new Error(`${box.id}: 치수는 0보다 커야 합니다`)
    }
    if (box.weightKg < 0) {
      throw new Error(`${box.id}: 중량은 음수일 수 없습니다`)
    }
    if (!Number.isInteger(box.quantity) || box.quantity < 0) {
      throw new Error(`${box.id}: 수량은 0 이상의 정수여야 합니다`)
    }
  }
}

/**
 * 컨테이너 한 개에 화물을 실어 보고 적재 계획을 낸다.
 *
 * 컨테이너 한 대 기준이다. 여러 대에 나눠 싣는 계산은 다음 단계에서
 * 이 함수를 반복 호출하는 형태로 얹는다.
 */
export function planLoad(
  container: ContainerSpec,
  boxes: readonly CargoBoxInput[]
): LoadPlan {
  assertValidInput(boxes)

  const innerMm = innerMmOf(container)

  // 1) 애초에 컨테이너에 안 들어가는 치수는 패커에 넘기지 않고 먼저 걷어낸다.
  //    안 그러면 매 인스턴스마다 모든 후보점을 훑는 헛수고를 한다.
  const oversized: UnplacedCargo[] = []
  const packable: CargoBoxInput[] = []

  for (const box of boxes) {
    if (box.quantity === 0) continue

    const dimsMm: [number, number, number] = [
      cmToMm(box.lengthCm),
      cmToMm(box.widthCm),
      cmToMm(box.heightCm),
    ]
    if (fitsEmptyContainer(dimsMm, box, innerMm)) {
      packable.push(box)
    } else {
      oversized.push({
        boxId: box.id,
        box,
        quantity: box.quantity,
        reason: "OVERSIZED",
      })
    }
  }

  // 2) 수량을 펼쳐 정렬한 뒤 배치
  const instances: CargoInstance[] = expandAndSort(packable)
  const result = packInstances(instances, {
    innerMm,
    maxPayloadKg: container.maxPayloadKg,
  })

  // 3) 못 실은 것들을 (화물 종류 × 사유) 로 묶는다
  const grouped = new Map<string, UnplacedCargo>()
  for (const item of oversized) {
    grouped.set(`${item.boxId}:OVERSIZED`, item)
  }
  for (const rejected of result.rejected) {
    const reason: UnplacedReason = rejected.byWeight ? "WEIGHT_LIMIT" : "NO_SPACE"
    const key = `${rejected.box.id}:${reason}`
    const existing = grouped.get(key)
    if (existing) {
      grouped.set(key, { ...existing, quantity: existing.quantity + 1 })
    } else {
      grouped.set(key, {
        boxId: rejected.box.id,
        box: rejected.box,
        quantity: 1,
        reason,
      })
    }
  }

  // 4) 부피·중량 집계
  const usedVolumeCm3 = result.placed.reduce(
    (sum, p) => sum + p.sizeCm[0] * p.sizeCm[1] * p.sizeCm[2],
    0
  )
  const usedVolumeM3 = usedVolumeCm3 / 1_000_000
  const totalVolumeM3 = containerVolumeM3(container)

  // 의뢰받은 전체 중량 — 못 실은 것까지 포함해야 "한 대로 되나"를 답할 수 있다
  const requestedWeightKg = boxes.reduce((sum, b) => sum + b.weightKg * b.quantity, 0)

  const centerOfGravity = computeCenterOfGravity(container, result.placed)

  return {
    container,
    placed: result.placed,
    unplaced: Array.from(grouped.values()),
    usedVolumeM3: round(usedVolumeM3, 3),
    containerVolumeM3: round(totalVolumeM3, 3),
    volumeUtilizationPercent: round((usedVolumeM3 / totalVolumeM3) * 100, 2),
    totalWeightKg: round(result.totalWeightKg, 3),
    requestedWeightKg: round(requestedWeightKg, 3),
    maxPayloadKg: container.maxPayloadKg,
    overweight: requestedWeightKg > container.maxPayloadKg,
    weightUtilizationPercent: round(
      (result.totalWeightKg / container.maxPayloadKg) * 100,
      2
    ),
    centerOfGravity: {
      ...centerOfGravity,
      positionCm: centerOfGravity.positionCm.map((v) => round(v, 2)) as [
        number,
        number,
        number,
      ],
      offsetCm: centerOfGravity.offsetCm.map((v) => round(v, 2)) as [
        number,
        number,
        number,
      ],
      offsetPercent: centerOfGravity.offsetPercent.map((v) => round(v, 2)) as [
        number,
        number,
        number,
      ],
    },
  }
}
