import { projectSummary as dobonglifeProjectSummary } from "./dobonglife";
import { panopticon } from "./panopticon";
import { projectSummary as schMiniProjectSummary } from "./sch-miniproject";

export const profile = {
  name: "임우진",
  englishName: "Woojin Lim",
  displayName: "임우진 · Lim Woojin",
  headline: "DevOps Engineer",
  birth: {
    date: "2001.02.26",
    ageText: "만 25세",
  },
} as const;

export const about = [
  {
    title: "네트워크를 좋아하는 클라우드/DevOps 엔지니어 임우진 입니다.",
    body: "사용자의 요청이 네트워크와 서버를 지나 데이터베이스까지 처리되는 전체 흐름을 이해하고 설계하는 것을 좋아합니다. 계층별로 나누어진 시스템의 흐름을 따라가며, 서비스가 end-to-end로 연결되는 구조를 이해하는 것이 중요하다고 생각합니다.",
  },
  {
    title: "여러 기술 분야를 이해하고 연결하는 개발자를 지향합니다.",
    body: "프론트엔드, 백엔드, 인프라, 네트워크, 보안, 임베디드, AI, 운영체제 등 다양한 분야를 공부하고 프로젝트를 진행해왔습니다. 하나의 기술만 사용하는 개발자가 아니라, 서비스의 전체 분야를 이해하고 필요한 기술을 적재적소에 사용할 수 있는 개발자를 지향합니다.",
  },
  {
    title: "불편함을 해결하고 자동화하기 위해 개발합니다.",
    body: "DevOps는 개발과 운영 사이에서 반복되는 배포, 검증, 모니터링 흐름을 정리하고 자동화해 서비스가 안정적으로 전달되도록 만드는 역할이라고 생각합니다. 복잡한 워크플로우를 단순화하고, 사람이 직접 확인하던 작업을 재현 가능한 시스템 흐름으로 바꾸는 데 관심이 있습니다.",
  },
] as const;

export const education = {
  school: "순천향대학교",
  major: "사물인터넷학과",
  period: "2020.03 ~ 2026.08",
  grade: "평점 4.22/4.5",
  status: "졸업예정",
} as const;

export const language = {
  language: "영어",
  name: "TOEIC",
  score: 810,
  date: "2025.11 취득",
} as const;

export const military = {
  type: "육군",
  state: "병장 만기 전역",
  branch: "MW 통신병",
  period: "2022.05 ~ 2023.11",
} as const;

export const publication = {
  label: "Publication",
  title: "한국컴퓨터종합학술대회(KCC2025) 학부생 논문 발표",
  description: "모바일 로봇 양방향 제어를 위한 Unity-기반 실시간 SLAM 시각화",
  href: "https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12318703",
  ariaLabel:
    "DBpia에서 논문 모바일 로봇 양방향 제어를 위한 Unity-기반 실시간 SLAM 시각화 보기",
} as const;

export const contact = [
  {
    type: "phone",
    href: "tel:010-2296-1280",
    label: "전화번호",
    value: "010-2296-1280",
  },
  {
    type: "email",
    href: "mailto:woojin2296@gmail.com",
    label: "이메일",
    value: "woojin2296@gmail.com",
  },
  {
    type: "portfolio",
    href: "https://woojin2296.github.io",
    label: "포트폴리오",
    value: "https://woojin2296.github.io",
    external: true,
  },
  {
    type: "github",
    href: "https://github.com/woojin2296",
    label: "깃허브",
    value: "https://github.com/woojin2296",
    external: true,
  },
  {
    type: "blog",
    href: "https://velog.io/@talking_tomato",
    label: "기술 블로그",
    value: "velog.io/@talking_tomato",
    external: true,
  },
] as const;

export const skills = [
  {
    title: "Cloud / Infra",
    skills: ["AWS", "Terraform", "Kubernetes", "Linux", "Nginx"],
  },
  {
    title: "CI/CD / GitOps",
    skills: ["GitHub Actions", "Argo CD", "Git", "Docker Compose"],
  },
  {
    title: "Observability",
    skills: ["Prometheus", "Grafana", "Loki", "Alloy"],
  },
  {
    title: "Backend",
    skills: ["Spring Boot", "Java", "MySQL", "Python"],
  },
  {
    title: "Frontend",
    skills: ["Next.js", "TypeScript"],
  },
] as const;

export const experience = {
  primary: [
    {
      period: "2026.07 ~ Current",
      title: "(주)엔키화이트햇",
      role: "사원",
      description: ["DevOps 엔지니어"],
    },
    {
      period: "2026.04 ~ 2026.06 · 3개월",
      title: "(주)유머스트알엔디",
      role: "계약직 사원",
      description: [
        "도봉라이프 AWS 인프라 구축 및 운영",
        "회사 ERP 시스템 백엔드 개발 및 운영",
      ],
    },
    {
      period: "2025.09 ~ 2026.02 · 6개월",
      title: "(주)유머스트알엔디",
      role: "인턴 사원",
      description: [
        "X-ray 치료기기 GUI 개발 참여",
        "사내 환경 관제 시스템 개발",
      ],
    },
    {
      period: "2024.01 — 2026.02 · 2년",
      title: "순천향대학교 UBICOMP LAB",
      role: "학부연구생",
      description: [
        "데이터 수집 파이프라인 관제 시스템 개발 - 판옵티콘",
        "ROS 기반 PCD 수집 파이프라인 구축",
        "KCC2025 학부생 논문 제출",
      ],
    },
  ],
  additional: [
    {
      period: "2024.01 — 2025.12",
      title: "수업 조교 6회",
      role: "순천향대학교",
      description: [
        "IoT 플랫폼 (24-1, 25-1)",
        "임베디드 시스템 (24-2, 25-2)",
        "나만의 게임만들기 (24-1)",
        "웹페이지 제작의 실제 (24-2)",
      ],
    },
    {
      period: "2024.01 — 2025.12",
      title: "해커톤 참여 3회",
      role: "기획 · 개발 · 발표",
      description: [
        "2024 캡스톤디자인 및 AI 해커톤",
        "2025 캡스톤디자인 및 AI 해커톤",
        "2025 대한민국 해커톤",
      ],
    },
    {
      period: "2024.01 — 2025.12",
      title: "멘토링 프로그램 2회",
      role: "멘토",
      description: [
        "2024 순천향 AI·SW 창의한마당",
        "2025 SW 학습멘토링(머신러닝)",
      ],
    },
  ],
} as const;

export const projectSummary = [
  dobonglifeProjectSummary,
  panopticon.projectSummary,
  schMiniProjectSummary,
] as const;

export const awards = [
  {
    date: "2024.11",
    prize: "최우수상",
    title: "SW융합대학 학술제 (E-Sports 개발)",
    project: "캐주얼 리듬게임 - 탭 스페이스 (Tab Space)",
  },
  {
    date: "2025.11",
    prize: "장려상",
    title: "2025 SCHU AI SW Festival",
    project: "AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)",
  },
  {
    date: "2025.11",
    prize: "장려상",
    title: "2025 캡스톤 디자인 및 AI 해커톤",
    project: "장소에 맞는 음악 생성 서비스 - 카라멜 (Caramel)",
  },
  {
    date: "2025.08",
    prize: "장려상",
    title: "2025 글로벌 캡스톤디자인 경진대회",
    project: "AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)",
  },
  {
    date: "2024.10",
    prize: "장려상",
    title: "2024 캡스톤디자인 및 AI 해커톤",
    project: "입법 현황 실시간 분석 시스템 - 라다온 (LawDaon)",
  },
] as const;
