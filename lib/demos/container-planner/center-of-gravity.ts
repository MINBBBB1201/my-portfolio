import type { ContainerSpec } from "./containers"
import type { CenterOfGravity, PlacedBox } from "./types"

/**
 * 무게중심 허용 오차(%) — 컨테이너 기하중심에서 이만큼까지만 치우쳐도 된다.
 *
 * Cargo-Planner 의 "Prioritize Center of Gravity" 설정이 보장하는 값과 같은
 * 10% 를 쓴다. 참고로 업계 일반 권고는 ±5% 이고, 최신 스프레더가 편심을
 * 흡수할 수 있어서 ±10% 까지 받아 주는 정도다 — 즉 10% 는 "안전"이 아니라
 * "이 이상은 곤란"에 가까운 상한선이다.
 *
 * 출처(2026-08 확인):
 * - https://cargo-planner.com/docs/guide/load-settings/
 * - https://ctm-survey.com/en/principles-of-loading-and-weight-distribution-in-a-container/
 */
export const CENTER_OF_GRAVITY_TOLERANCE_PERCENT = 10

/*
 * ─────────────────────────────────────────────────────────────────────────
 * 알려진 제약 — 무게중심은 "검사"만 하고 "분산 최적화"는 하지 않는다.
 *
 * packInstances 는 컨테이너 안쪽 끝(x=0)부터 한 베이씩 채워 나온다. 그래서
 * 물량이 컨테이너를 다 채우지 못하면 짐이 앞쪽에 몰리고, 이 함수가 그걸
 * 편심으로 잡아 경고를 띄운다. 이건 버그가 아니라 의도된 동작이다 —
 * 실제로 그렇게 실으면 정말로 앞이 무거운 컨테이너가 나가기 때문이다.
 *
 * "경고가 안 뜨게 알아서 분산해 주지" 를 하려면 배치 자체를 무게중심을
 * 목적함수에 넣고 다시 푸는 일이 된다 (Cargo-Planner 의 "Prioritize Center of
 * Gravity" 설정이 그것이고, 저쪽도 적재율을 깎아 먹는 트레이드오프라고
 * 명시한다). 이번 범위 밖이라 넣지 않았다. 붙인다면 planLoad 에 옵션으로
 * 얹고, 적재율이 떨어지는 대신 편심이 준다는 것을 화면에서 알려 줘야 한다.
 * ─────────────────────────────────────────────────────────────────────────
 */

/**
 * 치우침 비율의 분모 — 해당 축의 컨테이너 내치수(전장) 이다.
 *
 * ⚠️ 여기서 % 의 정의를 못 박아 둔다. "중심에서 10%" 는 반길이 대비가 아니라
 *    전장 대비다. 40FT(내부 길이 1203.2cm)라면 허용 범위는 중심 ±120.32cm,
 *    즉 컨테이너 전체로 보면 가운데 80% 구간 안에 무게중심이 있어야 한다는 뜻.
 *    반길이 기준으로 잘못 잡으면 허용치가 절반으로 좁아져서, 멀쩡한 적재안이
 *    경고로 뜬다.
 */

/**
 * 배치된 박스들의 무게중심을 구한다.
 *
 * 각 박스를 밀도가 균일한 직육면체로 보고, 박스의 기하중심에 그 박스의 전체
 * 중량이 몰려 있다고 계산한다(= 질점 근사). 박스 중심은 최소 모서리 + 크기/2 다.
 *
 *   CoG_axis = Σ(중량 × 박스중심_axis) / Σ(중량)
 *
 * 화물이 하나도 없으면 컨테이너 기하중심을 그대로 돌려준다 — 치우침 0,
 * 판정 통과. 빈 컨테이너를 "무게중심 불량"으로 띄우면 안 되니까.
 */
export function computeCenterOfGravity(
  container: ContainerSpec,
  placed: readonly PlacedBox[]
): CenterOfGravity {
  const containerSize: readonly [number, number, number] = [
    container.innerLengthCm,
    container.innerWidthCm,
    container.innerHeightCm,
  ]
  const geometricCenter: [number, number, number] = [
    containerSize[0] / 2,
    containerSize[1] / 2,
    containerSize[2] / 2,
  ]

  const totalWeight = placed.reduce((sum, p) => sum + p.weightKg, 0)

  const position: [number, number, number] = [...geometricCenter]

  if (totalWeight > 0) {
    const moment: [number, number, number] = [0, 0, 0]
    for (const p of placed) {
      for (let axis = 0; axis < 3; axis++) {
        const boxCenter = p.positionCm[axis] + p.sizeCm[axis] / 2
        moment[axis] += p.weightKg * boxCenter
      }
    }
    for (let axis = 0; axis < 3; axis++) {
      position[axis] = moment[axis] / totalWeight
    }
  }

  const offsetCm: [number, number, number] = [0, 0, 0]
  const offsetPercent: [number, number, number] = [0, 0, 0]
  for (let axis = 0; axis < 3; axis++) {
    offsetCm[axis] = position[axis] - geometricCenter[axis]
    offsetPercent[axis] = (offsetCm[axis] / containerSize[axis]) * 100
  }

  // 길이(x)·폭(y)만 본다. 높이(z)는 이 기준의 대상이 아니다 — 짐을 아래에서부터
  // 쌓으면 무게중심은 당연히 바닥 쪽으로 내려가고, 그건 오히려 안전한 상태다.
  // 수직 무게중심은 별도 기준(예: 60/50 룰)으로 따로 봐야 해서 여기 섞지 않는다.
  const withinTolerance =
    Math.abs(offsetPercent[0]) <= CENTER_OF_GRAVITY_TOLERANCE_PERCENT &&
    Math.abs(offsetPercent[1]) <= CENTER_OF_GRAVITY_TOLERANCE_PERCENT

  return {
    positionCm: position,
    offsetCm,
    offsetPercent,
    tolerancePercent: CENTER_OF_GRAVITY_TOLERANCE_PERCENT,
    withinTolerance,
  }
}
