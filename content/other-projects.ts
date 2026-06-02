export const otherProjects = [
  {
    title: "Image Denoising Project",
    subtitle: "이미지 노이즈 제거 필터 비교 분석 모듈",
    affiliation: "개인 프로젝트",
    period: "2023.11 ~ 2023.12",
    link: "https://github.com/woojin2296/Image-Denoising-Project.git",
    summary:
      "Salt & Pepper Noise와 Gaussian Noise가 포함된 이미지에 여러 필터링 기법을 적용하고, PSNR 기준으로 결과 품질을 비교한 이미지 처리 프로젝트입니다.",
    highlights: [
      "Salt & Pepper, Gaussian Noise 기반 테스트 데이터 생성",
      "Median Filter, Non-Local Means, Hybrid 필터링 알고리즘 구현",
      "PSNR 지표 기반 필터별 이미지 품질 비교 및 실험 결과 분석",
    ],
    techStack: ["Python", "NumPy", "OpenCV", "Matplotlib"],
  },
  {
    title: "Mobius Subscription",
    subtitle: "MQTT 구독 처리 파이썬 모듈",
    affiliation: "Ubicomp Lab K-Sensor 프로젝트",
    period: "2024.10",
    link: "https://github.com/woojin2296/MobiusSubscription",
    summary:
      "Mobius에서 발생하는 IoT 데이터 이벤트를 실시간으로 수집하기 위한 Python 기반 MQTT 구독 모듈입니다.",
    highlights: [
      "Mobius REST API 기반 AE·컨테이너 구독 생성 자동화 구현",
      "MQTT topic별 이벤트 수신과 JSON payload 파싱 로직 구현",
      "멀티 스레드 기반 다중 구독 처리와 종료 정리 구조 설계",
    ],
    techStack: ["Python", "MQTT", "oneM2M", "Mobius"],
  },
  {
    title: "플라보 (PLAVO)",
    subtitle: "AI 기반 발표 연습 보조 서비스",
    affiliation: "순천향대학교 사물인터넷학과 졸업작품",
    period: "2024.09 ~ 2025.06",
    link: "https://github.com/woojin2296/PLAVO",
    summary:
      "AI와 IoT 기술을 결합해 사용자의 발표를 실시간으로 분석하고, 연습 기록과 피드백 리포트를 제공하는 발표 연습 보조 서비스입니다.",
    highlights: [
      "Next.js 기반 발표 연습 화면, 결과 리포트, 성장 그래프 UI 구현",
      "음성·자세 분석 결과를 실시간으로 반영하는 WebSocket 처리 흐름 설계",
      "프로젝트·연습 기록·분석 결과 관리를 위한 MySQL 데이터 모델링과 API 구현",
    ],
    techStack: ["Next.js", "MySQL", "Raspberry Pi"],
  },
  {
    title: "루미온 (LUMION)",
    subtitle: "대화형 AI 자동 지식 아카이빙 서비스",
    affiliation: "2025 대한민국 해커톤",
    period: "2025.11",
    link: null,
    summary:
      "대화형 AI 사용 과정에서 생성되는 정보를 자동으로 정리하고, 마인드맵 형태로 구조화해 탐색할 수 있도록 만든 지식 아카이빙 서비스입니다.",
    highlights: [
      "사용자 입력, 답변 생성, 문장 임베딩, 유사도 계산, 그래프 구성으로 이어지는 AI 처리 흐름 설계",
      "대화 데이터를 노드·엣지 구조로 변환하는 마인드맵 기반 시각화 UI 구현",
      "노드 클릭 기반 확장 탐색과 지식 관계를 단계적으로 보여주는 인터랙션 설계",
    ],
    techStack: ["Next.js"],
  },
  {
    title: "카라멜 (Caramel)",
    subtitle: "장소에 맞는 AI 음악 생성 서비스",
    affiliation: "2025 캡스톤디자인 및 AI 해커톤 경진대회",
    period: "2025.11",
    link: "https://github.com/hackathon-caramel",
    summary:
      "사용자의 사진과 상황 입력을 기반으로 장소에 어울리는 음악을 생성하고, 생성 결과를 바로 재생할 수 있도록 만든 AI 기반 음악 생성 서비스입니다.",
    highlights: [
      "사용자 입력, 프롬프트 생성, 음악 생성, 결과 재생으로 이어지는 프론트엔드 흐름 설계",
      "Gemini API와 Suno API를 연결한 AI 음악 생성 요청·응답 처리 구현",
      "음악 생성 중 로딩 상태와 생성 완료 후 플레이어 UI를 포함한 인터랙션 구현",
    ],
    techStack: ["Next.js", "Gemini API", "Suno API"],
  },
  {
    title: "라다온 (Lawdaon)",
    subtitle: "입법 현황 실시간 분석 시스템",
    affiliation: "2024 캡스톤디자인 및 AI 해커톤 경진대회",
    period: "2024.10",
    link: "https://github.com/Eumgill/LawdaOn-BE",
    summary:
      "입법 발의 및 처리 현황 데이터를 수집·분석해 최신 입법 동향과 통계 정보를 제공하는 실시간 분석 시스템입니다.",
    highlights: [
      "입법 데이터 수집 및 처리 로직 구현",
      "입법 현황 조회와 분석 결과 제공을 위한 Spring Boot API 설계",
      "데이터 수집, 분석, 제공으로 이어지는 백엔드 처리 흐름 구현",
    ],
    techStack: ["Spring Boot"],
  },
  {
    title: "Tab Space",
    subtitle: "Unity 기반 캐주얼 리듬게임",
    affiliation: "순천향대학교 제1회 SW중심대학 학술제 e-sports 공모전",
    period: "2024.10",
    link: null,
    summary:
      "음악 타이밍에 맞춰 스페이스바를 입력해 방향 전환과 점프를 수행하고, 점수와 랭킹으로 경쟁하는 Unity 기반 캐주얼 리듬게임입니다.",
    highlights: [
      "스페이스바 입력 기반 이동, 방향 전환, 점프 플레이 로직 구현",
      "정확도 판정과 추가 점수 계산을 포함한 리듬게임 점수 시스템 구현",
      "목숨 판정, 게임 진행 UI, 랭킹보드 반영 흐름 구현",
    ],
    techStack: ["Unity", "C#"],
  },
  {
    title: "소방 보조용 스마트 헬멧",
    subtitle: "IMU 기반 실내 상대위치 추적 및 관제 시스템",
    affiliation: "IoT 플랫폼 기말 프로젝트",
    period: "2024.05 ~ 2024.06",
    link: "https://github.com/LanternOfDusk",
    summary:
      "GPS가 동작하기 어려운 실내 환경에서 IMU 센서 데이터를 활용해 소방관의 상대 위치를 추정하고, 중앙에서 실시간으로 관제하는 시스템입니다.",
    highlights: [
      "가속도·자이로 데이터를 활용한 PDR 기반 상대 위치 계산 로직 구현",
      "Mobius oneM2M 플랫폼을 활용한 센서 데이터 수집 흐름 설계",
      "Three.js 기반 3D 위치 시각화와 Spring Boot 위치 데이터 API 구현",
    ],
    techStack: [
      "Spring Boot",
      "MySQL",
      "Python",
      "Mobius",
      "oneM2M",
      "Three.js",
      "Vue.js",
      "Raspberry Pi",
    ],
  },
  {
    title: "Smart Bus Stop",
    subtitle: "임베디드 시스템 기반 스마트 버스정류장 시스템",
    affiliation: "순천향대학교 사물인터넷학과 임베디드 시스템 기말 프로젝트",
    period: "2021.09 ~ 2021.12",
    link: "https://github.com/woojin2296/Smart-Bus-Stop",
    summary:
      "버스 도착 정보와 센서 기반 환경 정보를 디스플레이로 제공하고, 사용자 입력 기반 인터랙션을 지원하는 스마트 버스정류장 시스템입니다.",
    highlights: [
      "Arduino 기반 센서 데이터 수집 및 처리 로직 구현",
      "디스플레이 기반 버스 도착 정보와 환경 정보 표시 UI 구현",
      "하드웨어와 소프트웨어 연동 구조 설계 및 통합 테스트 수행",
    ],
    techStack: ["Arduino", "C", "Embedded System"],
  },
] as const;
