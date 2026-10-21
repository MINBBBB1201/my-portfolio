import type { ContainerSpec } from "./containers"
import type { CargoBoxInput, Orientation, PlacedBox } from "./types"
import { allowedOrientations, cmToMm, mmToCm, orientedSize } from "./geometry"

/**
 * Extreme-point 배치 휴리스틱 — 직접 구현.
 *
 * binpackingjs(bp3d 계열)를 그대로 쓰지 않고 다시 짠 이유는 파일 맨 아래
 * "왜 직접 구현했나" 주석에 적어 두었다. 배치 아이디어 자체는 같은 계열이다.
 *
 * 계산은 전부 mm 정수로 한다. cm 실수로 하면 "박스 윗면 높이 == 후보점 높이"
 * 같은 동등 비교가 부동소수 오차로 어긋나서 지지면 판정이 조용히 깨진다.
 */

/** 지지면 최소 비율 — 밑면의 이만큼이 아래 화물에 닿아야 놓는다 */
export const MIN_SUPPORT_RATIO = 0.8

interface Cuboid {
  /** 최소 모서리 [x, y, z] (mm) */
  readonly pos: readonly [number, number, number]
  /** 축별 크기 [dx, dy, dz] (mm) */
  readonly size: readonly [number, number, number]
}

interface PlacedInternal extends Cuboid {
  readonly instanceId: string
  readonly box: CargoBoxInput
  readonly orientation: Orientation
  /** 이 위에 아무것도 못 쌓는 화물인지 */
  readonly blocksAbove: boolean
}

/** 두 구간이 실제 길이를 갖고 겹치는지 (맞닿기만 한 건 겹침이 아니다) */
function overlaps1D(aMin: number, aLen: number, bMin: number, bLen: number): boolean {
  return aMin < bMin + bLen && bMin < aMin + aLen
}

/** 두 구간이 겹치는 길이 (맞닿기만 하면 0) */
function overlapLength(aMin: number, aLen: number, bMin: number, bLen: number): number {
  return Math.max(0, Math.min(aMin + aLen, bMin + bLen) - Math.max(aMin, bMin))
}

function intersects(a: Cuboid, b: Cuboid): boolean {
  return (
    overlaps1D(a.pos[0], a.size[0], b.pos[0], b.size[0]) &&
    overlaps1D(a.pos[1], a.size[1], b.pos[1], b.size[1]) &&
    overlaps1D(a.pos[2], a.size[2], b.pos[2], b.size[2])
  )
}

/** x-y 평면(밑면) 겹침 면적 */
function footprintOverlapArea(a: Cuboid, b: Cuboid): number {
  return (
    overlapLength(a.pos[0], a.size[0], b.pos[0], b.size[0]) *
    overlapLength(a.pos[1], a.size[1], b.pos[1], b.size[1])
  )
}

type Point = readonly [number, number, number]

function pointKey(p: Point): string {
  return p[0] + "," + p[1] + "," + p[2]
}

export interface PackerLimits {
  readonly innerMm: readonly [number, number, number]
  readonly maxPayloadKg: number
}

/** 놓지 못한 인스턴스. 최종 사유 분류는 호출부(plan-load)가 한다 */
export interface RejectedInstance {
  readonly box: CargoBoxInput
  /** true 면 중량 상한 때문, false 면 공간 부족 */
  readonly byWeight: boolean
}

export interface PackAttemptResult {
  readonly placed: readonly PlacedBox[]
  readonly rejected: readonly RejectedInstance[]
  readonly totalWeightKg: number
}

/** 배치 대상 인스턴스 하나 (수량을 펼친 결과) */
export interface CargoInstance {
  readonly instanceId: string
  readonly box: CargoBoxInput
  /** mm 정수로 바꾼 [length, width, height] */
  readonly dimsMm: readonly [number, number, number]
}

/**
 * 수량을 개별 인스턴스로 펼치고 배치 순서를 정한다.
 *
 * 순서 규칙:
 *  1. 적재 가능(stackable) 화물이 먼저, 적재 불가 화물이 나중.
 *     — 적재 불가 화물을 먼저 깔면 그 위 천장까지가 통째로 사장된다.
 *       나중에 놓아 짐 맨 위를 덮게 하는 편이 공간을 훨씬 덜 버린다.
 *  2. 부피 큰 것 먼저 — 큰 덩어리를 못 넣고 남기는 사태를 줄인다.
 *  3. 밑면적 큰 것 먼저, 무거운 것 먼저 — 아래층에 크고 무거운 게 깔린다.
 *  4. 마지막으로 id — 같은 입력이면 항상 같은 결과가 나오게(결정적).
 */
export function expandAndSort(boxes: readonly CargoBoxInput[]): CargoInstance[] {
  const instances: CargoInstance[] = []

  for (const box of boxes) {
    const dimsMm: [number, number, number] = [
      cmToMm(box.lengthCm),
      cmToMm(box.widthCm),
      cmToMm(box.heightCm),
    ]
    for (let i = 0; i < box.quantity; i++) {
      instances.push({ instanceId: box.id + "#" + (i + 1), box, dimsMm })
    }
  }

  const volume = (d: readonly [number, number, number]) => d[0] * d[1] * d[2]

  return instances.sort((a, b) => {
    const aStack = a.box.stackable === false ? 1 : 0
    const bStack = b.box.stackable === false ? 1 : 0
    if (aStack !== bStack) return aStack - bStack

    const dv = volume(b.dimsMm) - volume(a.dimsMm)
    if (dv !== 0) return dv

    const da = b.dimsMm[0] * b.dimsMm[1] - a.dimsMm[0] * a.dimsMm[1]
    if (da !== 0) return da

    const dw = b.box.weightKg - a.box.weightKg
    if (dw !== 0) return dw

    return a.instanceId.localeCompare(b.instanceId)
  })
}

/** 빈 컨테이너에 어느 방향으로든 들어가는 치수인지 */
export function fitsEmptyContainer(
  dimsMm: readonly [number, number, number],
  box: CargoBoxInput,
  innerMm: readonly [number, number, number]
): boolean {
  return allowedOrientations(box).some((o) => {
    const s = orientedSize(dimsMm, o)
    return s[0] <= innerMm[0] && s[1] <= innerMm[1] && s[2] <= innerMm[2]
  })
}

interface Spot {
  readonly pos: readonly [number, number, number]
  readonly size: readonly [number, number, number]
  readonly orientation: Orientation
}

/**
 * 실제 배치.
 *
 * 후보점(extreme point)을 (x, z, y) 오름차순으로 훑으면서 처음 들어가는 자리에
 * 놓는 deepest-bottom-left 방식이다. x 를 가장 앞에 두었으므로 안쪽 끝 벽부터
 * 폭 → 높이 순으로 한 베이씩 채우고 도어 쪽으로 나온다 — 실제 컨테이너를
 * 싣는 순서와 같아서 3D 뷰에 그렸을 때도 납득이 가는 그림이 나온다.
 */
export function packInstances(
  instances: readonly CargoInstance[],
  limits: PackerLimits
): PackAttemptResult {
  const { innerMm, maxPayloadKg } = limits

  const placed: PlacedInternal[] = []
  const rejected: RejectedInstance[] = []
  let totalWeightKg = 0

  // 후보점 집합. 빈 컨테이너의 유일한 후보는 원점이다.
  let points: Point[] = [[0, 0, 0]]

  for (const inst of instances) {
    if (totalWeightKg + inst.box.weightKg > maxPayloadKg) {
      rejected.push({ box: inst.box, byWeight: true })
      continue
    }

    const spot = findSpot(inst, points, placed, innerMm)

    if (!spot) {
      rejected.push({ box: inst.box, byWeight: false })
      continue
    }

    placed.push({
      instanceId: inst.instanceId,
      box: inst.box,
      pos: spot.pos,
      size: spot.size,
      orientation: spot.orientation,
      blocksAbove: inst.box.stackable === false,
    })
    totalWeightKg += inst.box.weightKg

    points = refreshPoints(points, spot, placed)
  }

  return { placed: placed.map(toPlacedBox), rejected, totalWeightKg }
}

function findSpot(
  inst: CargoInstance,
  points: readonly Point[],
  placed: readonly PlacedInternal[],
  innerMm: readonly [number, number, number]
): Spot | null {
  // 깊은 곳(x) → 낮은 곳(z) → 왼쪽(y) 순. 한 베이를 다 채우고 다음 베이로 간다.
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[2] - b[2] || a[1] - b[1])
  const orientations = allowedOrientations(inst.box)

  for (const pos of sorted) {
    for (const orientation of orientations) {
      const size = orientedSize(inst.dimsMm, orientation)
      if (canPlace({ pos, size }, placed, innerMm)) {
        return { pos, size, orientation }
      }
    }
  }
  return null
}

function canPlace(
  candidate: Cuboid,
  placed: readonly PlacedInternal[],
  innerMm: readonly [number, number, number]
): boolean {
  // 1) 컨테이너 벽을 뚫지 않는가
  for (let axis = 0; axis < 3; axis++) {
    if (candidate.pos[axis] < 0) return false
    if (candidate.pos[axis] + candidate.size[axis] > innerMm[axis]) return false
  }

  const baseArea = candidate.size[0] * candidate.size[1]
  const candidateBottom = candidate.pos[2]
  let supportedArea = 0

  for (const other of placed) {
    // 2) 다른 화물과 겹치지 않는가
    if (intersects(candidate, other)) return false

    const otherTop = other.pos[2] + other.size[2]
    const footprint = footprintOverlapArea(candidate, other)

    // 3) 적재 불가 화물 위쪽에 올라가지 않는가.
    //    "바로 위에 얹는 것"만이 아니라 "위쪽 공간 전체"를 막는다. 파손 위험
    //    화물 위를 옆 박스에 걸쳐 건너뛰는 배치까지 실무에서는 허용하지 않는다.
    if (other.blocksAbove && footprint > 0 && candidateBottom >= otherTop) {
      return false
    }

    // 4) 지지면 — 윗면 높이가 후보 밑면과 정확히 같은 화물만 받쳐 준다
    if (otherTop === candidateBottom) {
      supportedArea += footprint
    }
  }

  // 바닥에 놓는 경우는 항상 완전 지지
  if (candidateBottom === 0) return true

  return supportedArea >= baseArea * MIN_SUPPORT_RATIO
}

/**
 * 후보점 갱신 — 방금 놓은 박스가 만든 세 모서리를 추가하고,
 * 이미 화물 속에 파묻힌 점은 버린다.
 */
function refreshPoints(
  points: readonly Point[],
  spot: Spot,
  placed: readonly PlacedInternal[]
): Point[] {
  const [x, y, z] = spot.pos
  const [dx, dy, dz] = spot.size

  const next = new Map<string, Point>()
  for (const p of points) next.set(pointKey(p), p)

  const born: Point[] = [
    [x + dx, y, z], // 도어 쪽 옆면
    [x, y + dy, z], // 오른쪽 옆면
    [x, y, z + dz], // 윗면
  ]
  for (const p of born) next.set(pointKey(p), p)

  // 방금 놓은 박스가 삼켜 버린 후보점에는 이제 아무것도 놓을 수 없다.
  return Array.from(next.values()).filter((p) => !placed.some((b) => containsPoint(b, p)))
}

/** 점이 박스 내부(경계 제외)에 들어 있는가 */
function containsPoint(b: Cuboid, p: Point): boolean {
  return (
    p[0] >= b.pos[0] &&
    p[0] < b.pos[0] + b.size[0] &&
    p[1] >= b.pos[1] &&
    p[1] < b.pos[1] + b.size[1] &&
    p[2] >= b.pos[2] &&
    p[2] < b.pos[2] + b.size[2]
  )
}

function toPlacedBox(p: PlacedInternal): PlacedBox {
  return {
    instanceId: p.instanceId,
    boxId: p.box.id,
    box: p.box,
    positionCm: [mmToCm(p.pos[0]), mmToCm(p.pos[1]), mmToCm(p.pos[2])],
    sizeCm: [mmToCm(p.size[0]), mmToCm(p.size[1]), mmToCm(p.size[2])],
    orientation: p.orientation,
    weightKg: p.box.weightKg,
  }
}

/** 컨테이너 내치수를 mm 정수 3원소로 */
export function innerMmOf(spec: ContainerSpec): [number, number, number] {
  return [cmToMm(spec.innerLengthCm), cmToMm(spec.innerWidthCm), cmToMm(spec.innerHeightCm)]
}

/*
 * ─────────────────────────────────────────────────────────────────────────
 * 왜 binpackingjs 를 그대로 쓰지 않았나 (v4.1.0 소스 직접 확인, 2026-08)
 *
 * 1. 회전 제어: 있다. Item3D.allowedRotations 로 박스별 6방향을 골라 줄 수 있다.
 *    격리 테스트로 확인했다 — 높이 90 짜리를 높이 30 컨테이너에 넣을 때
 *    자유 회전이면 눕혀서 들어가고, WHD 하나로 잠그면 미적재로 떨어진다.
 *
 * 2. 적재 불가(non-stackable): 없다. 소스 전체에 stack/support 개념이 아예 없고
 *    모르는 필드는 조용히 무시된다. 실제로 fragile 박스 위에 다음 박스가 얹혔다.
 *
 * 3. 그리고 결정적으로 — 지지면(중력) 검사가 없다. bin.ts 의 putItem 은
 *    "컨테이너 밖으로 나가지 않는가 + 다른 박스와 겹치지 않는가" 두 가지만 본다.
 *    실제로 65x100x65 컨테이너에 20x50x20 기둥과 60x5x60 판을 넣었더니
 *    판이 z=50 에 떠서, 밑면의 11% 만 기둥에 걸치고 나머지는 허공이었다.
 *
 * 2번과 3번은 배치가 끝난 뒤에 후처리로 고칠 수 있는 종류가 아니다. 공중에 뜬
 * 박스를 사후에 내려놓으려 해도 그 자리엔 이미 다른 박스가 있고, 파손 위험 화물
 * 위에 얹힌 박스를 사후에 빼면 그 화물은 그냥 미적재가 된다 — 둘 다 배치를 처음부터
 * 다시 하는 것과 같다. 그래서 배치 시점에 조건을 거는 쪽으로 갔다.
 *
 * 배치 아이디어(extreme point 후보점 + 방향 선택)는 같은 계열이라 라이브러리에서
 * 배운 것을 버린 건 아니다. 의존성도 하나 줄었다.
 * ─────────────────────────────────────────────────────────────────────────
 */
