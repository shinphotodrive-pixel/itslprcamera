export interface CameraModel {
  id: string;
  vendor: string;
  model: string;
  pixels: number; // in 10k (e.g. 800 = 8MP)
  resolution: string;
  lens: string;
  irWdr: string;
  aiFeatures: string;
  priceText: string;
  priceNum: number; // in 10k KRW (e.g. 285 = 2.85M)
  irRange: number; // meters
  maxSpeedKmH: number;
  ipRating: string;
  npuSpecs: string;
  url: string;
  recommendedUse: string;
}

export interface VideoReference {
  id: string;
  category: string;
  publisher: string;
  title: string;
  summary: string;
  youtubeId: string;
  url: string;
  badgeColor: string;
  keyTakeaway: string;
}

export const CAMERA_DATA: CameraModel[] = [
  {
    id: "hanwha-pno-a9081r",
    vendor: "한화비전 (Hanwha Vision)",
    model: "PNO-A9081R / PNV-A9081R",
    pixels: 800,
    resolution: "800만 화소 (4K UHD 3840x2160 @30fps)",
    lens: "4.5~10mm 전동 가변 초점 (광학 2.2배)",
    irWdr: "WiseIR 가시거리 30m / 120dB extreme WDR",
    aiFeatures: "온디바이스 엣지 AI 객체 분류(차량/사람/얼굴/번호판), BestShot 캡처, 속성 분석(차종, 색상), IP66/67, IK10, NEMA4X 방폭/내후",
    priceText: "약 280만 ~ 290만 원대",
    priceNum: 285,
    irRange: 30,
    maxSpeedKmH: 120,
    ipRating: "IP66 / IP67 / IK10 / NEMA4X",
    npuSpecs: "한화 Wisenet7 SoC 엣지 딥러닝 NPU 내장",
    url: "https://www.hanwhavision.com/ko/products/product-details/PNO-A9081R",
    recommendedUse: "고속도로 다차로 동시 감지, 스마트 교차로 종합 관제, 4K 초고화질 차종/색상 분류"
  },
  {
    id: "idis-dc-t2362hrl",
    vendor: "아이디스 (IDIS)",
    model: "DC-T2362HRL",
    pixels: 217,
    resolution: "2.17MP 저조도 특화 광학 센서 (1920x1080 @60fps)",
    lens: "12~50mm 수동 가변 초점 (초점심도 깊은 원거리 줌)",
    irWdr: "야간 전조등 직사 억제 특화 IR / True WDR",
    aiFeatures: "자체 딥러닝 차량번호 인식(ANPR) 엔진 탑재, 시속 80km 주행 차량 99% 이상 인식 보장, 차량 번호판 자동 추적",
    priceText: "약 250만 ~ 280만 원대",
    priceNum: 265,
    irRange: 25,
    maxSpeedKmH: 80,
    ipRating: "IP66 방수방진",
    npuSpecs: "IDIS 자체 ANPR 딥러닝 가속 펌웨어",
    url: "https://idisglobal.com/index/product_view/3529",
    recommendedUse: "도시 간선도로 중속 통행로, 주차 게이트 원거리 LPR, 고속 60fps 추적"
  },
  {
    id: "hikvision-ids-2cd7a26g0",
    vendor: "하이크비전 (Hikvision)",
    model: "iDS-2CD7A26G0/P-IZHS(Y)",
    pixels: 200,
    resolution: "200만 화소 (2MP) 고감도 센서 (1920x1080 @60fps)",
    lens: "2.8~12mm 전동 가변 초점 (Moto Varifocal)",
    irWdr: "DarkFighter 초저조도 컬러 야간 기술 / 140dB WDR",
    aiFeatures: "DeepinView ANPR 딥러닝 알고리즘, 국가별 번호판 패턴 분류, 화이트리스트/블랙리스트 내부 매칭, 내식성 코팅(-Y)",
    priceText: "약 $785 ~ $1,178 (약 110만 ~ 160만 원)",
    priceNum: 135,
    irRange: 20,
    maxSpeedKmH: 120,
    ipRating: "IP67 / IK10 / NEMA 4X",
    npuSpecs: "Hikvision DeepinView 온보드 AI 프로세서",
    url: "https://www.hikdistribution.com/products/2mp-deepinview-anpr-moto-varifocal-bullet-camera-hikvision-ids-2cd7a26g0-p-izhsy",
    recommendedUse: "국제 규격 번호판 지원 현장, 예산 최적화 공공 주차/출입 관제"
  },
  {
    id: "truen-tgw-005",
    vendor: "트루엔 / 원우이엔씨 (Truen/Wonwoo)",
    model: "TGW-005 / LPR 통합 솔루션",
    pixels: 350,
    resolution: "3MP ~ 4MP 고해상도 HD 스트림",
    lens: "2.8~12mm Auto Iris 또는 6mm 고정 초점",
    irWdr: "최소 밝기 500Lux 적외선 자동 전환 / AGC 리미터",
    aiFeatures: "0.2초 초고속 인식, 99% 인식률, 주차 게이트 일체형 음성 안내 스피커 연동, DIY 맞춤형 전광판 텍스트 프롬프트",
    priceText: "약 29만 ~ 49만 원대 (모듈형/게이트용)",
    priceNum: 39,
    irRange: 15,
    maxSpeedKmH: 40,
    ipRating: "IP66 방수",
    npuSpecs: "임베디드 LPR 전용 경량 DSP",
    url: "https://www.davincigate.kr/products/400090",
    recommendedUse: "스마트 무인 주차장 차단기 일체형, 상업 시설 주차 유도 시스템"
  },
  {
    id: "cpro-lpr-5mp",
    vendor: "씨프로 (CPRO)",
    model: "CPRO LPR High-End Series",
    pixels: 500,
    resolution: "5MP CMOS 초고해상도 센서 (2592x1944 @30fps)",
    lens: "광학 8배 줌 (초장거리 원격 화각 정밀 조절)",
    irWdr: "18m 고휘도 IR LED 6구 / 야간 전조등 특수 광학 필터",
    aiFeatures: "극한 환경 콜드 스타터 내장 히터 (-40°C ~ +50°C 동작 보증), 고속 주행 차량 흔들림 보정(DIS), 결로 방지 팬",
    priceText: "프로젝트 단위 별도 견적 (약 200만 원선)",
    priceNum: 200,
    irRange: 18,
    maxSpeedKmH: 100,
    ipRating: "IP67 방진방수 / 특수 하우징",
    npuSpecs: "산업용 LPR 하드웨어 프로세서",
    url: "https://www.cpro-cam.com/kr/m21.php?cate=technology&idx=2&sn2=1",
    recommendedUse: "혹한/혹서기 야외 고속도로, 터널 출입구, 혹독한 기후 지자체 방범 LPR"
  }
];

export const VIDEO_REFERENCES: VideoReference[] = [
  {
    id: "vid-police-rear",
    category: "이륜차 후면 단속 (정책 및 원리)",
    publisher: "경찰청 공식 채널 (Police KR)",
    title: "단속 카메라 사각지대 이륜차 후면 단속 카메라 원리와 현장 취재",
    summary: "오토바이 후면 번호판 단속 카메라의 물리적 설치 기준(지상고 250~900mm)과 과속/신호위반 적발 메커니즘을 시연합니다.",
    youtubeId: "QGbAVBwg9-w",
    url: "https://www.youtube.com/watch?v=QGbAVBwg9-w",
    badgeColor: "bg-blue-900/60 text-blue-300 border-blue-700/50",
    keyTakeaway: "전면 번호판이 없는 이륜차의 이동 궤적을 후방에서 레이더와 카메라가 복합 추적하여 위반 확정"
  },
  {
    id: "vid-mbc-helmet",
    category: "이륜차 후면 & 헬멧 적발",
    publisher: "MBC 뉴스 / MBC 충북",
    title: "후면 단속 카메라, 헬멧 미착용까지 AI가 가려낸다",
    summary: "단속 카메라 통과 후 급가속하는 오토바이와 라이더의 안전모 미착용을 딥러닝 비전 모델로 즉시 분별하는 현장 보도.",
    youtubeId: "d-Unl1Bkslw",
    url: "https://www.youtube.com/watch?v=d-Unl1Bkslw",
    badgeColor: "bg-red-900/60 text-red-300 border-red-700/50",
    keyTakeaway: "라이더 두부 영역의 형상 윤곽선 및 헬멧 착용 여부를 온디바이스 AI가 실시간 자동 판정"
  },
  {
    id: "vid-radar-tracking",
    category: "레이더 추적 & 사각지대 해소",
    publisher: "SBS / YTN / KBS 종합",
    title: "신호 무시 폭주 이륜차 적발 레이더 추적 기술",
    summary: "마이크로파 도플러 레이더와 초고해상도 광학 카메라의 시공간 융합을 통해 번호판 훼손 회피 차량 궤적 역추적.",
    youtubeId: "dJCYVdBz1l4",
    url: "https://www.youtube.com/watch?v=dJCYVdBz1l4",
    badgeColor: "bg-sky-900/60 text-sky-300 border-sky-700/50",
    keyTakeaway: "레이더 거리-속도 벡터 정보와 광학 픽셀 좌표를 융합하여 단속 정확도 99% 달성"
  },
  {
    id: "vid-etri-sr",
    category: "훼손 번호판 AI 원천 복원",
    publisher: "YTN 사이언스 / ETRI (한국전자통신연구원)",
    title: "ETRI, 흐릿하고 찌그러진 CCTV 번호판 딥러닝 복원 기술",
    summary: "육안 식별이 불가능한 저해상도 모션 블러 및 찌그러진 훼손 번호판을 초해상도(Super Resolution) GAN 모델로 선명하게 복원.",
    youtubeId: "pThN2EdU-G8",
    url: "https://www.youtube.com/watch?v=pThN2EdU-G8",
    badgeColor: "bg-purple-900/60 text-purple-300 border-purple-700/50",
    keyTakeaway: "인공신경망 사전 지식을 바탕으로 번호판 폰트의 기하학적 형태를 유추 복원"
  },
  {
    id: "vid-heavy-mobile",
    category: "건설기계 및 모바일 LPR",
    publisher: "건설기계 인식 시스템 시연 데모",
    title: "스마트폰 카메라 연동 건설기계 번호판 AI 인식 및 수검 여부 판별",
    summary: "비포장 현장에서 스마트폰 또는 모바일 LPR 카메라로 진흙 오염 건설기계 촬영 시 국토부 통합 DB와 실시간 대조.",
    youtubeId: "oiC2Snc8I2g",
    url: "https://www.youtube.com/watch?v=oiC2Snc8I2g",
    badgeColor: "bg-amber-900/60 text-amber-300 border-amber-700/50",
    keyTakeaway: "가상 루프 코일 소프트웨어 트리거로 물리 루프 매설이 불가능한 험로에서도 안정적 동작"
  },
  {
    id: "vid-perspective-lpr",
    category: "기하광학 주차 관제 LPR",
    publisher: "실시간 주차 관제 솔루션 현장",
    title: "진입 각도 자유 왜곡 보정 실시간 LPR 데모",
    summary: "수직 30° 이상 가혹한 급경사 각도 및 야간 전조등 역광에서도 기하학적 투영 변환(Homography)으로 보정 판독.",
    youtubeId: "uuPnjlUTmO0",
    url: "https://www.youtube.com/watch?v=uuPnjlUTmO0",
    badgeColor: "bg-emerald-900/60 text-emerald-300 border-emerald-700/50",
    keyTakeaway: "투영 변환 매트릭스를 거쳐 번호판 평면을 정면 2D 직사각형으로 교정한 후 OCR 전달"
  }
];

export interface OpticalPreset {
  name: string;
  desc: string;
  targetType: "reflective" | "motorcycle" | "damaged" | "standard";
  shutterVal: number; // 1 to 5
  agcVal: number; // 1 to 3
  irisVal: number; // 1 to 3
  irVal: number; // 1 to 3
  vehicleSpeed: number; // km/h
}

export const OPTICAL_PRESETS: OpticalPreset[] = [
  {
    name: "추천: 야간 고속도로 표준 프리셋",
    desc: "1/500s 고속 셔터, P-Iris F/2.8 고정, AGC Low로 반사필름 난반사 및 100km/h 블러 완전 차단",
    targetType: "reflective",
    shutterVal: 3,
    agcVal: 1,
    irisVal: 2,
    irVal: 2,
    vehicleSpeed: 100
  },
  {
    name: "추천: 이륜차 후면 & 헬멧 적발 프리셋",
    desc: "1/2000s 초고속 셔터, F/2.8, IR 강함으로 250mm 저지상고 소형 번호판과 헬멧 텍스처 선명 포착",
    targetType: "motorcycle",
    shutterVal: 4,
    agcVal: 1,
    irisVal: 2,
    irVal: 3,
    vehicleSpeed: 70
  },
  {
    name: "추천: 비포장 건설기계/오염판 프리셋",
    desc: "1/500s, IR 적정, 중간 게인으로 진흙에 덮인 음각/양각 번호판 윤곽선 및 가상루프 ROI 안정화",
    targetType: "damaged",
    shutterVal: 3,
    agcVal: 2,
    irisVal: 2,
    irVal: 2,
    vehicleSpeed: 40
  },
  {
    name: "경고: 전형적 튜닝 실패 사례 (화이트아웃)",
    desc: "조리개 완전개방(F/1.4), AGC High, IR Max 설정 시 반사필름이 완전히 백화되어 인식률 20% 이하 급락",
    targetType: "reflective",
    shutterVal: 1,
    agcVal: 3,
    irisVal: 1,
    irVal: 3,
    vehicleSpeed: 100
  }
];
