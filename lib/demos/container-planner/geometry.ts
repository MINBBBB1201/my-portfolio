import {
  IDENTITY_ORIENTATION,
  UPRIGHT_ORIENTATIONS,
  type CargoBoxInput,
  type Orientation,
} from "./types"

/**
 * 방향 문자열 → 원본 (length, width, height) 배열의 인덱스 순열.
 *
 * ORIENTATION_AXES["WLH"] === [1, 0, 2] 는
 * "x축에 원본[1](너비), y축에 원본[0](길이), z축에 원본[2](높이)" 라는 뜻이다.
 */
export const ORIENTATION_AXES: Record<Orientation, readonly [number, number, number]> = {
  LWH: [0, 1, 2],
  WLH: [1, 0, 2],
  LHW: [0, 2, 1],
  HLW: [2, 0, 1],
  WHL: [1, 2, 0],
  HWL: [2, 1, 0],
}

/** 높이가 z축에서 벗어나는 = 박스를 눕히는 자세들 */
const TIPPED_ORIENTATIONS: readonly Orientation[] = ["LHW", "WHL", "HLW", "HWL"]

/**
 * 시도 순서 — 세워 둔 자세(UPRIGHT_ORIENTATIONS)를 먼저, 눕히는 자세를 나중에.
 *
 * 눕히는 자세를 뒤로 미루는 이유: 종이박스든 목상자든 실무에서는 일단
 * 세워서 싣고, 공간이 모자랄 때만 눕힌다. 납작한 자세를 먼저 고르게 하면
 * 적재율은 조금 오르지만 3D 뷰에서 죄다 옆으로 누운 이상한 그림이 나온다.
 *
 * 두 배열을 이어 붙여 만든다 — 손으로 6개를 다시 나열해 두면 나중에 누가
 * UPRIGHT_ORIENTATIONS 를 고쳤을 때 여기가 조용히 어긋난다.
 */
export const ORIENTATION_ORDER: readonly Orientation[] = [
  ...UPRIGHT_ORIENTATIONS,
  ...TIPPED_ORIENTATIONS,
]

/** cm(소수 가능) → mm 정수. 내부 계산을 정수로 돌려 부동소수 비교 오차를 없앤다 */
export function cmToMm(cm: number): number {
  return Math.round(cm * 10)
}

/** mm 정수 → cm. 소수 첫째 자리까지만 의미가 있다 */
export function mmToCm(mm: number): number {
  return mm / 10
}

/** 이 박스에 허용된 방향들 */
export function allowedOrientations(box: CargoBoxInput): readonly Orientation[] {
  // rotatable 이 명시적으로 false 일 때만 원본 자세로 고정한다. 생략하면 허용.
  if (box.rotatable === false) return [IDENTITY_ORIENTATION]
  return ORIENTATION_ORDER
}

/** 방향을 적용해 축별 크기 [dx, dy, dz] 를 구한다 (단위는 넣은 그대로) */
export function orientedSize(
  dims: readonly [number, number, number],
  orientation: Orientation
): [number, number, number] {
  const axes = ORIENTATION_AXES[orientation]
  return [dims[axes[0]], dims[axes[1]], dims[axes[2]]]
}
