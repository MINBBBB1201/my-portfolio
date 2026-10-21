/**
 * 해상 컨테이너 제원 — 3D 적재 계산기의 기준 상수.
 *
 * 단위는 전부 cm / kg 다. 화물 입력이 cm 로 들어오기 때문에 컨테이너 쪽을
 * cm 로 맞춰 두는 편이 변환 실수를 줄인다.
 *
 * ⚠️ 내치수·최대적재중량은 "표준 공표치"가 아니라 선사·제조사·리스사마다
 *    수 mm / 수백 kg 씩 다르다. 아래 값은 아래 출처들의 공통 범위를 택한
 *    실무용 근사치이고, 실제 부킹 컨테이너의 CSC 명판 값과는 다를 수 있다.
 *    그래서 계산 로직에 숫자를 박아 넣지 않고 여기 상수로만 모아 둔다.
 *    나중에 선사별 실제 데이터가 생기면 이 파일만 갈아 끼우면 된다.
 *
 *    출처(2026-08 확인):
 *    - https://www.icontainers.com/help/20-foot-container/       (20FT 5.90 × 2.35 × 2.39 m, 최대적재 약 28,200kg)
 *    - https://www.icontainers.com/help/40-foot-high-cube-container/
 *    - https://www.bws.net/toolbox/container-specifications/40-foot-dry-high-cube  (40HC 12.03 × 2.35 × 2.70 m, 28,620kg)
 *    - https://www.maersk.com/support/faqs/cargo-weight-limit    (선사별 중량 상한이 다르다는 근거)
 */

/*
 * 알려진 제약 — 해상 드라이 컨테이너 3종만 다룬다.
 *
 * 항공 화물의 ULD(단위탑재용기)는 지원하지 않는다. AKE·PMC 같은 대표 규격은
 * 기체 동체 곡률에 맞춰 한쪽 아래 모서리가 깎여 나간 형상이라 직육면체가
 * 아니다. 이 모듈은 컨테이너도 화물도 축에 정렬된 직육면체로 놓고 겹침·지지면을
 * 판정하므로(packer.ts), ULD 를 "그냥 다른 치수의 상자"로 끼워 넣으면 깎인
 * 모서리 부분에 실을 수 없는 화물을 실을 수 있다고 계산해 버린다.
 *
 * 즉 상수 세 줄을 더하는 일이 아니라 배치 판정에 형상 개념을 들이는 일이라
 * 별도 스코프다. ULD 를 다루게 되면 컨테이너를 "직육면체 + 잘라낼 영역"으로
 * 표현하고 canPlace 에 그 영역 검사를 추가하는 쪽이 출발점이 된다.
 */
export type ContainerTypeId = "20FT_DRY" | "40FT_DRY" | "40FT_HC"

export interface ContainerSpec {
  readonly id: ContainerTypeId
  /** 화면 표기용 한국어 이름 */
  readonly label: string
  /** 내부 길이(cm) — 도어에서 안쪽 끝까지 */
  readonly innerLengthCm: number
  /** 내부 폭(cm) */
  readonly innerWidthCm: number
  /** 내부 높이(cm) — 바닥에서 천장까지 */
  readonly innerHeightCm: number
  /** 최대 적재중량(kg) — 화물 순중량 기준(컨테이너 자중 제외) */
  readonly maxPayloadKg: number
}

export const CONTAINER_SPECS: Record<ContainerTypeId, ContainerSpec> = {
  "20FT_DRY": {
    id: "20FT_DRY",
    label: "20피트 드라이",
    innerLengthCm: 589.8,
    innerWidthCm: 235.2,
    innerHeightCm: 239.3,
    maxPayloadKg: 28180,
  },
  "40FT_DRY": {
    id: "40FT_DRY",
    label: "40피트 드라이",
    innerLengthCm: 1203.2,
    innerWidthCm: 235.2,
    innerHeightCm: 239.3,
    maxPayloadKg: 28780,
  },
  "40FT_HC": {
    id: "40FT_HC",
    label: "40피트 하이큐브",
    innerLengthCm: 1203.2,
    innerWidthCm: 235.2,
    innerHeightCm: 269.8,
    maxPayloadKg: 28600,
  },
}

export const CONTAINER_TYPE_IDS = Object.keys(CONTAINER_SPECS) as ContainerTypeId[]

/** 내부 부피(㎥) — 적재율 분모로 쓴다 */
export function containerVolumeM3(spec: ContainerSpec): number {
  return (spec.innerLengthCm * spec.innerWidthCm * spec.innerHeightCm) / 1_000_000
}
