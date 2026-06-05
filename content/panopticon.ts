const metadata = {
  title:
    "판옵티콘(Panopticon) - 연구실 실험 데이터 수집 관제 및 이상 알림 시스템",
  description: "판옵티콘(Panopticon) 소개 페이지",
} as const;

const data = {
  title: "판옵티콘(Panopticon)",
  subtitle: "데이터 수집 관제 시스템",
  description:
    "연구실 실험 데이터 수집 파이프라인 관제 및 이상 알림 시스템을 개발한 프로젝트",
  period: ["2024.07-2026.02", "(1년 8개월 - 개발 및 운영)"] as const,
  affiliation: "순천향대학교 UBICOMP LAB",
  position: "학부연구생",
  role: ["Team Lead", "Full Stack Developer"] as const,
} as const;

const summary = {
  main: [
    "팀 리드로서 요구사항 정리, 기능 범위 정의, 전체 시스템 아키텍처 설계",
    "데이터 수집·조회·장애 상태 흐름을 고려한 DB 스키마 설계 및 Spring Boot API 구현",
    "장치 상태, 최근 수집 시각, 센서 데이터를 한 화면에서 확인하는 관제 UI 설계 및 Next.js 프론트엔드 구현",
    "self-hosted runner 기반 CI/CD 파이프라인 구축 및 Docker 기반 배포 환경 구성",
    "TCP Socket과 WebSocket을 사용한 상태 이벤트 전달 구조 구현",
  ] as const,
} as const;

const skills = {
  main: [
    { name: "Next.js", primary: true },
    { name: "Spring Boot", primary: true },
    { name: "MySQL", primary: true },
    { name: "Docker Compose", primary: false },
    { name: "GitHub Actions", primary: false },
    { name: "Self-hosted Runner", primary: false },
  ] as const,
  project: [
    { name: "Next.js", primary: true },
    { name: "Spring Boot", primary: true },
    { name: "MySQL", primary: true },
    { name: "Docker Compose", primary: false },
    { name: "GitHub Actions", primary: false },
    { name: "Self-hosted Runner", primary: false },
  ] as const,
} as const;

const projectSummary = {
  link: "/projects/panopticon/",
  title: `${data.title} - ${data.subtitle}`,
  affiliation: data.affiliation,
  position: data.position,
  period: data.period[0],
  image: {
    src: "/projects/panopticon/panopticon-system-architecture.jpg",
    alt: "판옵티콘 아키텍처 대표 이미지",
    width: 4879,
    height: 3279,
  },
  summary: summary.main,
  techStack: skills.project,
} as const;

const sectionLinks = [
  { id: "overview", label: "프로젝트 개요" },
  { id: "role", label: "역할" },
  { id: "skills", label: "기술 스택" },
  { id: "monitoring-system", label: "데이터 수집 파이프라인 관제 시스템 개발" },
  {
    id: "monitoring-architecture",
    label: "확장성을 고려한 모듈 아키텍처 설계",
  },
  {
    id: "realtime-delivery",
    label: "TCP Socket과 WebSocket을 사용한 상태 이벤트 전달 구조 구현",
  },
  {
    id: "deployment-automation",
    label: "Self-hosted Runner 기반 내부망 배포 자동화 구축",
  },
  { id: "retrospective", label: "회고 및 개선 방향" },
] as const;

const hero = {
  eyebrow: "Project No.2",
  title: data.title,
  description: data.description,
  period: data.period[0],
  periodDetail: data.period[1],
  affiliation: data.affiliation,
  position: data.position,
  role: data.role,
} as const;

const overviewSection = {
  id: "overview",
  title: "프로젝트 개요",
  paragraphs: [
    "순천향대학교 UBICOMP LAB의 연구실 실험 데이터 수집 파이프라인을 위한 실시간 관제 및 이상 알림 시스템입니다. 기존 환경에서는 수집이 멈추거나 데이터 품질에 문제가 생겨도 직접 데이터를 열람하기 전까지 이상 여부를 확인하기 어려웠고, 실제로 데이터 수집 중단을 3일간 인지하지 못한 사례가 있었습니다. 이 문제를 해결하기 위해 서버 응답 상태, 마지막 수집 시각, 데이터 품질을 기준으로 장애 여부를 자동 감지하도록 했습니다. 감지된 상태는 통합 대시보드와 실시간 알림을 통해 확인할 수 있도록 구성했습니다. 개발 이후 졸업 전까지 약 1년 8개월간 연구 과제 환경에서 실제 운영했으며, 현재도 연구실 실험 데이터 수집 환경에서 계속 운영되고 있습니다.",
  ],
} as const;

const roleSection = {
  id: "role",
  title: "역할",
  bullets: [
    "팀 리드로서 요구사항 정리, 기능 범위 정의, 전체 시스템 아키텍처 설계",
    "데이터 수집·조회·장애 상태 흐름을 고려한 DB 스키마 설계 및 Spring Boot API 구현",
    "장치 상태, 최근 수집 시각, 센서 데이터를 한 화면에서 확인하는 관제 UI 설계 및 Next.js 프론트엔드 구현",
    "self-hosted runner 기반 CI/CD 파이프라인 구축 및 Docker 기반 배포 환경 구성",
  ],
} as const;

const skillsSection = {
  id: "skills",
  title: "기술 스택",
  emphasized: skills.main
    .filter((skill) => skill.primary)
    .map((skill) => skill.name),
  items: skills.main
    .filter((skill) => !skill.primary)
    .map((skill) => skill.name),
} as const;

const sections = [
  {
    id: "monitoring-system",
    title: "데이터 수집 파이프라인 관제 시스템 개발",
    paragraphs: [
      "서버와 데이터베이스의 응답 상태, 센서 데이터 수집 상태, 장애 이력을 대시보드에서 통합적으로 확인할 수 있도록 구성했습니다. 데이터 확인 과정도 DB 직접 접근에 의존하지 않도록 바꿨습니다. 운영자는 화면에서 실시간 데이터를 확인하고, 필요한 기간을 선택해 데이터를 조회한 뒤 CSV로 출력할 수 있습니다. 감지된 이상 상태는 Spring Boot 백엔드에 저장하고, 대시보드에 반영하는 동시에 이상 발생 시 Slack으로 알림을 전송하도록 연결했습니다.",
    ],
    figureGroupLabel: "판옵티콘 주요 화면",
    figures: [
      {
        src: "/projects/panopticon/panopticon-dashboard-overview.png",
        alt: "리소스 상태와 장애 이력을 확인하는 대시보드 화면",
        width: 1920,
        height: 1080,
        caption: "리소스 상태와 장애 이력을 확인하는 대시보드 화면",
      },
      {
        src: "/projects/panopticon/panopticon-realtime-monitoring.png",
        alt: "실시간 데이터 수집 상태를 확인하는 관제 대시보드 화면",
        width: 1920,
        height: 1080,
        caption: "실시간 데이터 수집 상태를 확인하는 관제 대시보드 화면",
      },
      {
        src: "/projects/panopticon/panopticon-period-data-export.png",
        alt: "기간별 데이터 조회와 CSV 출력을 위한 상세 화면",
        width: 1920,
        height: 1080,
        caption: "기간별 데이터 조회와 CSV 출력을 위한 상세 화면",
      },
    ],
  },
  {
    id: "monitoring-architecture",
    title: "확장성을 고려한 모듈 아키텍처 설계",
    paragraphs: [
      "Watchdog의 감지 로직과 Notification의 알림 전송 로직을 분리했습니다. 감지 대상이 늘어나더라도 해당 대상의 checker 모듈을 추가하는 방식으로 쉽게 확장할 수 있도록 구조를 잡았습니다. Slack 외의 알림 채널이 필요하면 notifier 모듈을 추가하는 구조로 설계했습니다. 백엔드는 Watchdog이 보낸 감지 결과를 저장하고, 프론트엔드는 저장된 상태 이벤트를 조회하거나 WebSocket으로 전달받아 화면을 갱신합니다.",
    ],
    figures: [
      {
        src: "/projects/panopticon/panopticon-system-architecture.jpg",
        alt: "역할별 모듈로 분리한 판옵티콘 전체 아키텍처",
        width: 4879,
        height: 3279,
        caption: "역할별 모듈로 분리한 판옵티콘 전체 아키텍처",
      },
    ],
  },
  {
    id: "realtime-delivery",
    title: "TCP Socket과 WebSocket을 사용한 상태 이벤트 전달 구조 구현",
    paragraphs: [
      "Watchdog은 각 감지 대상에 맞는 checker 전략을 실행하고 이상 상태를 판단합니다. 이상 상태가 확인되면 Watchdog은 감지 결과를 TCP 기반 소켓 통신으로 Spring Boot 백엔드에 전달합니다. 백엔드는 감지 결과를 상태 이벤트로 저장한 뒤 WebSocket 이벤트로 변환해 Next.js 프론트엔드에 전달합니다. Slack 알림도 같은 상태 이벤트를 기준으로 전송되도록 연동했습니다.",
    ],
    figures: [
      {
        src: "/projects/panopticon/panopticon-event-architecture.jpg",
        alt: "Watchdog 상태 이벤트 전파 구조",
        width: 7339,
        height: 2179,
        caption: "Watchdog 상태 이벤트 전파 구조",
      },
    ],
  },
  {
    id: "deployment-automation",
    title: "Self-hosted Runner 기반 내부망 배포 자동화 구축",
    paragraphs: [
      "서버가 학교 내부망에 있어 외부에서 SSH로 접속하는 배포 파이프라인을 사용할 수 없었습니다. 내부망 서버에 self-hosted runner를 설치하고, GitHub Actions job이 해당 runner에서 실행되도록 구성했습니다. GitHub Actions는 내부망 runner에 job을 전달하고, runner가 서버 안에서 소스 갱신, Docker 이미지 빌드, Docker Compose 기반 컨테이너 재배포를 순서대로 수행하도록 구성했습니다.",
    ],
    figures: [
      {
        src: "/projects/panopticon/panopticon-ci-cd.jpg",
        alt: "self-hosted runner를 사용한 CI/CD 시퀀스 다이어그램",
        width: 4765,
        height: 3357,
        caption: "self-hosted runner를 사용한 CI/CD 시퀀스 다이어그램",
      },
    ],
  },
  {
    id: "retrospective",
    title: "회고 및 개선 방향",
    paragraphs: [
      "시스템 구축 이후 사용률이 높아 보람찼던 프로젝트였습니다. 특히 실시간 데이터 그래프와 알림 시스템이 연구실 운영 과정에서 유용하게 사용되었습니다. 운영하면서 감지 대상과 알림 채널을 분리해 둔 점도 유지보수에 도움이 됐습니다. 새 서버를 감시하거나 Slack 외의 알림 방식을 붙일 때 Watchdog 전체를 수정하지 않고 모듈을 추가하는 방식으로 대응할 수 있었습니다. 반대로 Watchdog과 백엔드 사이를 TCP Socket으로 직접 연결한 구조는 네트워크 하위 계층을 직접 다루는 방식이라 신경 써야 할 부분이 많았습니다. 기존에 만들어진 코드가 있어 그대로 사용했지만, 다시 설계한다면 Watchdog의 감지 결과 전달은 HTTP/Webhook 기반 방식을 사용하거나, 프론트엔드 단방향 상태 갱신도 WebSocket 대신 SSE 등의 기술을 사용할 것 같습니다.",
    ],
  },
] as const;

export const panopticon = {
  metadata: metadata,
  data: data,
  summary: summary,
  skills: skills,
  projectSummary: projectSummary,
  sectionLinks: sectionLinks,
  hero: hero,
  overviewSection: overviewSection,
  roleSection: roleSection,
  skillsSection: skillsSection,
  sections: sections,
} as const;
