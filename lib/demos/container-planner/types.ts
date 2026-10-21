import type { ContainerSpec } from "./containers"

/**
 * 좌표계 — 다음 단계의 3D 뷰어가 이 정의를 그대로 따라야 한다.
 *
 *   원점(0, 0, 0) = 컨테이너 안쪽 끝(도어 반대편) 벽 · 왼쪽 벽 · 바닥이 만나는 모서리
 *
 *   x : 길이 방향. 0 = 안쪽 끝 벽, 커질수록 도어 쪽. (0 ~ innerLengthCm)
 *   y : 폭 방향.   0 = 왼쪽 벽(도어에서 안을 바라볼 때). (0 ~ innerWidthCm)
 *   z : 높이 방향. 0 = 바닥, 위로 증가. (0 ~ innerHeightCm)
 *
 *   박스의 position 은 박스가 차지하는 직육면체의 "최소 모서리"다.
 *   즉 박스는 [x, x+sizeCm[0]] × [y, y+sizeCm[1]] × [z, z+sizeCm[2]] 를 차지한다.
 *   중심이 아니라 모서리인 점에 주의 — three.js 의 BoxGeometry 는 중심 기준이라
 *   뷰어에서는 position + size/2 로 변환해야 한다.
 *
 * 단위는 전부 cm / kg.
 */

/** 화물 한 종류(= 같은 규격·중량의 박스 묶음) */
export interface CargoBoxInput {
  /** 안정적인 식별자. LoadPlan 의 결과가 이 값으로 원본을 되짚는다 */
  readonly id: string
  /** 품목명 */
  readonly name: string
  /** 길이(cm) — 화주가 부르는 "가로" */
  readonly lengthCm: number
  /** 너비(cm) */
  readonly widthCm: number
  /** 높이(cm) */
  readonly heightCm: number
  /** 개당 중량(kg) */
  readonly weightKg: number
  /** 수량(개) */
  readonly quantity: number
  /**
   * 이 박스 위에 다른 화물을 쌓을 수 있는지.
   * false 면 이 박스 위쪽 공간은 비워 둔다. 생략하면 true(적재 가능).
   */
  readonly stackable?: boolean
  /**
   * 회전 허용 여부. 생략하면 true.
   * false 면 입력한 길이·너비·높이 그대로만 놓는다.
   *
   * 지금은 "6방향 전부 / 회전 금지" 두 가지뿐이다. 다음 단계에서 다룰
   * "이 면이 위로(this side up)" 제약이 붙으면 여기서 세로축을 고정한 채
   * 수평 회전 2가지만 허용하는 상태가 하나 더 생긴다.
   */
  readonly rotatable?: boolean
}

/**
 * 박스를 놓은 방향. 원본 (length, width, height) 가 컨테이너 (x, y, z) 축에
 * 각각 어느 것으로 갔는지를 나타낸다.
 *
 * 예: "LWH" = 길이가 x축, 너비가 y축, 높이가 z축 (= 회전 없음, 기본 자세)
 *     "WLH" = 길이와 너비를 맞바꿔 수평으로 90° 돌린 자세
 *     "LHW" = 옆으로 눕힌 자세 (높이가 y축으로 감)
 */
export type Orientation = "LWH" | "WLH" | "LHW" | "HLW" | "WHL" | "HWL"

/** 회전 없이 원본 자세 그대로인 방향 */
export const IDENTITY_ORIENTATION: Orientation = "LWH"

/** 세워 둔 자세를 유지하는(높이가 z축에 남는) 방향들 — 수평 회전만 한 경우 */
export const UPRIGHT_ORIENTATIONS: readonly Orientation[] = ["LWH", "WLH"]

/** 컨테이너 안에 실제로 놓인 박스 한 개 */
export interface PlacedBox {
  /** 인스턴스 식별자. `${boxId}#${1부터 시작하는 일련번호}` */
  readonly instanceId: string
  /** 원본 화물 종류의 id (CargoBoxInput.id) */
  readonly boxId: string
  /** 원본 화물 종류 참조 — 뷰어에서 이름·색을 뽑아 쓰라고 통째로 들고 있는다 */
  readonly box: CargoBoxInput
  /** 최소 모서리 좌표 [x, y, z] (cm). 위 좌표계 주석 참고 */
  readonly positionCm: readonly [number, number, number]
  /** 놓은 뒤 축별로 차지하는 크기 [dx, dy, dz] (cm) */
  readonly sizeCm: readonly [number, number, number]
  /** 어떻게 돌려 놓았는지 */
  readonly orientation: Orientation
  /** 개당 중량(kg) — 무게중심 계산 편의를 위해 복사해 둔다 */
  readonly weightKg: number
}

/** 못 실은 이유 */
export type UnplacedReason =
  /** 컨테이너 최대 적재중량을 넘겨서 */
  | "WEIGHT_LIMIT"
  /** 빈 컨테이너에 넣어도 어느 방향으로든 치수가 안 맞아서 */
  | "OVERSIZED"
  /** 치수·중량은 되지만 남은 공간이 부족해서 */
  | "NO_SPACE"

/** 못 실은 화물 — 종류별로 묶어서 보고한다 */
export interface UnplacedCargo {
  readonly boxId: string
  readonly box: CargoBoxInput
  /** 못 실은 개수 */
  readonly quantity: number
  readonly reason: UnplacedReason
}

/** 무게중심 리포트 */
export interface CenterOfGravity {
  /** 무게중심의 절대 좌표 [x, y, z] (cm) — 컨테이너 원점 기준 */
  readonly positionCm: readonly [number, number, number]
  /** 컨테이너 기하중심 대비 치우침 [dx, dy, dz] (cm). 양수면 도어/오른쪽/위쪽 */
  readonly offsetCm: readonly [number, number, number]
  /**
   * 치우침을 각 축의 컨테이너 내치수로 나눈 비율(%).
   * 예: 40FT(길이 1203.2cm)에서 x 가 +120.32cm 치우치면 +10.0%
   */
  readonly offsetPercent: readonly [number, number, number]
  /** 판정 기준(%) — CENTER_OF_GRAVITY_TOLERANCE_PERCENT */
  readonly tolerancePercent: number
  /**
   * 길이·폭 방향 치우침이 모두 허용치 이내인지.
   * 높이(z)는 이 기준의 대상이 아니다 — 아래 상수 주석 참고.
   */
  readonly withinTolerance: boolean
}

/** 적재 계산 결과 */
export interface LoadPlan {
  readonly container: ContainerSpec
  /** 컨테이너에 놓인 박스들 */
  readonly placed: readonly PlacedBox[]
  /** 못 실은 화물 (종류 × 사유별) */
  readonly unplaced: readonly UnplacedCargo[]
  /** 놓인 박스 부피 합(㎥) */
  readonly usedVolumeM3: number
  /** 컨테이너 내부 부피(㎥) */
  readonly containerVolumeM3: number
  /** 부피 기준 적재율(%) = usedVolumeM3 / containerVolumeM3 × 100 */
  readonly volumeUtilizationPercent: number
  /** 실제로 실은 박스 중량 합(kg) */
  readonly totalWeightKg: number
  /** 의뢰받은 화물 전체 중량 합(kg) — 못 실은 것까지 포함 */
  readonly requestedWeightKg: number
  /** 최대 적재중량(kg) */
  readonly maxPayloadKg: number
  /**
   * 중량 초과 여부 = requestedWeightKg > maxPayloadKg.
   *
   * ⚠️ 실은 중량(totalWeightKg)이 아니라 "의뢰받은 전체 중량" 기준이다.
   *    planLoad 는 상한을 넘겨서 싣지 않으니 실은 중량으로 재면 이 값은
   *    영원히 false 라 아무 쓸모가 없다. 실무자가 알고 싶은 건
   *    "이 물량을 이 컨테이너 한 대로 보낼 수 있나"이므로 의뢰 기준으로 잰다.
   *    한 대로 안 되면 unplaced 에 WEIGHT_LIMIT 로 몇 개가 남는지 함께 나온다.
   */
  readonly overweight: boolean
  /** 중량 기준 사용률(%) — 실은 중량 / 최대 적재중량 */
  readonly weightUtilizationPercent: number
  readonly centerOfGravity: CenterOfGravity
}
