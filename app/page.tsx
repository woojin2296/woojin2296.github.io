import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  BookOpenText,
  ChevronDown,
  Mail,
  Phone,
} from "lucide-react";
import { ExpandableImage } from "@/app/_components/expandable-image";
import { SectionHeading } from "@/app/_components/section-heading";
import { SectionNavigation } from "@/app/_components/section-navigation";

export default function Home() {
  const architecturalDiagrams = [
    {
      src: "/projects/dobonglife/Architecture - DobongLife AWS Infra - V1.jpg",
      alt: "도봉라이프 V1 AWS 인프라 아키텍처 다이어그램",
      caption: "도봉라이프 인프라 아키텍처 - V1",
      width: 5800,
      height: 2758,
    },
    {
      src: "/projects/dobonglife/Architecture - DobongLife CICD - V1.jpg",
      alt: "도봉라이프 V1 CI/CD 아키텍처 다이어그램",
      caption: "도봉라이프 CI/CD 파이프라인 - V1",
      width: 4598,
      height: 3479,
    },
    {
      src: "/projects/dobonglife/Architecture - DobongLife AWS Infra - V2.jpg",
      alt: "도봉라이프 V2 AWS 인프라 아키텍처 다이어그램",
      caption: "도봉라이프 인프라 아키텍처 - V2",
      width: 5333,
      height: 2999,
    },
    {
      src: "/projects/dobonglife/Architecture - DobongLife CICD - V2.jpg",
      alt: "도봉라이프 V2 CI/CD 아키텍처 다이어그램",
      caption: "도봉라이프 CI/CD 파이프라인 - V2",
      width: 5756,
      height: 2779,
    },
    {
      src: "/projects/panopticon/Architecture - Panopticon Architecture.jpg",
      alt: "판옵티콘 전체 아키텍처 다이어그램",
      caption: "판옵티콘 전체 아키텍처",
      width: 4879,
      height: 3279,
    },
    {
      src: "/projects/panopticon/Architecture - Panopticon CICD.jpg",
      alt: "판옵티콘 self-hosted runner CI/CD 시퀀스 다이어그램",
      caption: "판옵티콘 CI/CD 파이프라인",
      width: 4765,
      height: 3357,
    },
  ];

  const mainProjects = [
    {
      link: "/projects/dobonglife/",
      title: "도봉라이프(DobongLife) - AWS 인프라 구축 및 운영",
      affiliation: "(주)유머스트알엔디",
      position: "인턴 사원",
      period: "2025.12 ~ current",
      image: {
        src: "/projects/dobonglife/Architecture - DobongLife AWS Infra - V2.jpg",
        alt: "도봉라이프 AWS 인프라 대표 이미지",
        width: 5333,
        height: 2999,
      },
      summary: [
        "AWS 기반 서비스 인프라 설계 및 구축",
        "Terraform을 활용한 IaC 구현으로 인프라 재현성 확보",
        "AWS SSM + GitHub Actions(OIDC) 기반 CI/CD 파이프라인 구축",
        "CloudWatch로 운영 로그 수집 및 모니터링 환경 구축",
      ],
      techStack: [
        { name: "AWS", primary: true },
        { name: "Terraform", primary: true },
        { name: "GitHub Actions", primary: false },
        { name: "Docker Compose", primary: false },
        { name: "CloudWatch", primary: false },
      ],
    },
    {
      link: "/projects/panopticon/",
      title: "판옵티콘(Panopticon) - 데이터 수집 관제 및 이상 감지 시스템",
      affiliation: "순천향대학교 UBICOMP LAB",
      position: "학부연구생",
      period: "2024.07 ~ 2026.02",
      image: {
        src: "/projects/panopticon/Architecture - Panopticon Architecture.jpg",
        alt: "판옵티콘 아키텍처 대표 이미지",
        width: 4879,
        height: 3279,
      },
      summary: [
        "확장성을 고려한 Pluggable Architecture 설계",
        "TCP Socket과 WebSocket을 사용한 상태 이벤트 전달 구조",
        "실시간 및 기간별 데이터 조회 기능으로 DB 접속 없는 조회 흐름 구현",
        "Self-hosted Runner 기반 내부망 배포 자동화",
      ],
      techStack: [
        { name: "Next.js", primary: true },
        { name: "Spring Boot", primary: true },
        { name: "MySQL", primary: true },
        { name: "Docker Compose", primary: false },
        { name: "GitHub Actions", primary: false },
        { name: "Self-hosted Runner", primary: false },
      ],
    },
    {
      link: "/projects/sch-miniproject/",
      title: "SCH MiniProject PMS",
      affiliation: "순천향대학교 ML/DL 강의",
      position: "개인 프로젝트",
      period: "2025.06 ~ 2026.02",
      image: {
        src: "/projects/sch-iot-rankingboard/sch-iot-ranking-board.png",
        alt: "SCH MiniProject PMS 대표 이미지",
        width: 1920,
        height: 1080,
      },
      summary: [
        "교수자 요구사항을 바탕으로 과제 제출, 점수 비교, 익명 랭킹, 관리자 기능 범위 정의",
        "학생용 과제 제출/랭킹 화면과 교수자용 관리 화면의 UI/UX 설계 및 구현",
        "서버 세션 인증, 역할 기반 접근 제어, 서버 측 점수 검증, 파일 업로드 검증, 감사 로그 개발",
        "Docker Compose 기반 실행 환경 구성과 졸업 전까지 배포 및 운영 대응",
      ],
      techStack: [
        { name: "Next.js", primary: true },
        { name: "SQLite", primary: true },
        { name: "Docker Compose", primary: false },
      ],
    },
  ];

  const skillGroups = [
    {
      title: "Cloud / Infra",
      skills: ["AWS", "Terraform", "Docker", "Linux"],
    },
    {
      title: "Backend",
      skills: ["Spring Boot", "Java", "MySQL"],
    },
    {
      title: "Frontend",
      skills: ["Next.js", "TypeScript"],
    },
    {
      title: "Tooling",
      skills: ["Git", "GitHub Actions", "Python"],
    },
  ];

  const experience = {
    primary: [
      {
        period: "2025.09 — 2026.02 · 6개월",
        title: "(주)유머스트알엔디",
        role: "인턴 사원",
        description:
          "도봉라이프 AWS 인프라 구축 및 운영 · 회사 ERP 시스템 벡엔드 개발 및 운영 · X-ray 치료기기 GUI 개발",
      },
      {
        period: "2024.01 — 2026.02 · 2년",
        title: "UBICOMP LAB",
        role: "학부연구생",
        description:
          "판옵티콘 개발 · ROS 기반 PCD 수집 · KCC2025 학부생 논문 제출",
      },
    ],
    additional: [
      {
        period: "2024.01 — 2025.12",
        title: "수업 조교 6회",
        role: "순천향대학교",
        description:
          "IoT 플랫폼 (24-1, 25-1) · 임베디드 시스템 (24-2, 25-2) · 나만의 게임만들기 (24-1) · 웹페이지 제작의 실제 (24-2)",
      },
      {
        period: "2024.01 — 2025.12",
        title: "해커톤 참여 3회",
        role: "기획 · 개발 · 발표",
        description:
          "2024 캡스톤디자인 및 AI 해커톤 · 2025 캡스톤디자인 및 AI 해커톤 · 2025 대한민국 해커톤",
      },
      {
        period: "2024.01 — 2025.12",
        title: "멘토링 프로그램 2회",
        role: "멘토",
        description:
          "2024 순천향 AI·SW 창의한마당 · 2025 SW 학습멘토링(머신러닝)",
      },
    ],
  };

  const awards = [
    {
      meta: "2024.11 · 최우수상",
      title: "SW융합대학 학술제 (E-Sports 개발)",
      description: "캐주얼 리듬게임 - 탭 스페이스 (Tab Space)",
    },
    {
      meta: "2025.11 · 장려상",
      title: "2025 SCHU AI SW Festival",
      description: "AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)",
    },
    {
      meta: "2025.11 · 장려상",
      title: "2025 캡스톤 디자인 및 AI 해커톤",
      description: "장소에 맞는 음악 생성 서비스 - 카라멜 (Caramel)",
    },
    {
      meta: "2025.08 · 장려상",
      title: "2025 글로벌 캡스톤디자인 경진대회",
      description: "AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)",
    },
    {
      meta: "2024.10 · 장려상",
      title: "2024 캡스톤디자인 및 AI 해커톤",
      description: "입법 현황 실시간 분석 시스템 - 라다온 (LawDaon)",
    },
  ];

  const contactLinks = [
    {
      icon: (
        <Phone className="h-4 w-4 shrink-0 text-black" aria-hidden="true" />
      ),
      href: "tel:010-2296-1280",
      label: "010-2296-1280",
      ariaLabel: "전화번호 010-2296-1280",
    },
    {
      icon: <Mail className="h-4 w-4 shrink-0 text-black" aria-hidden="true" />,
      href: "mailto:woojin2296@gmail.com",
      label: "woojin2296@gmail.com",
      ariaLabel: "이메일 woojin2296@gmail.com",
    },
    {
      icon: <GitHubIcon />,
      href: "https://github.com/woojin2296",
      label: "github.com/woojin2296",
      ariaLabel: "GitHub 프로필 github.com/woojin2296",
      external: true,
    },
    {
      icon: (
        <BookOpenText
          className="h-4 w-4 shrink-0 text-black"
          aria-hidden="true"
        />
      ),
      href: "https://velog.io/@talking_tomato",
      label: "velog.io/@talking_tomato",
      ariaLabel: "기술 블로그 velog.io/@talking_tomato",
      external: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SectionNavigation />

      <main className="mx-auto max-w-[760px] px-5 pt-12 sm:px-6">
        <header className="flex flex-col gap-4 py-[88px]">
          <p className="text-xs uppercase tracking-[0.22em] text-[#737373]">
            Portfolio 2026
          </p>
          <h1 className="font-display text-[48px] font-semibold leading-[1.04] tracking-normal text-black sm:text-[56px]">
            임우진 · Lim Woojin
          </h1>
          <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
            DevOps Engineer
          </p>
        </header>

        <section id="about" className="flex flex-col gap-[88px] py-[88px]">
          <section className="flex flex-col gap-4">
            <h2 className="font-heading text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              네트워크를 좋아하는 DevOps Engineer 임우진 입니다.
            </h2>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              사용자의 요청이 네트워크와 서버를 지나 데이터베이스까지 처리되는
              전체 흐름을 이해하고 설계하는 것을 좋아합니다. 계층별로 나누어진
              시스템의 흐름을 따라가며, 서비스가 end-to-end로 연결되는 구조를
              이해하는 것을 중요하게 생각합니다. 이를 위해 프로젝트에서
              아키텍처를 정립하고 인터페이스와 데이터 흐름을 고려하는 것을
              우선시합니다.
            </p>
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto overflow-y-hidden pr-8 [scrollbar-width:none] [-webkit-mask-image:linear-gradient(to_right,black_calc(100%_-_56px),transparent)] [-webkit-overflow-scrolling:touch] [mask-image:linear-gradient(to_right,black_calc(100%_-_56px),transparent)] [&::-webkit-scrollbar]:hidden">
                {architecturalDiagrams.map((diagram, index) => (
                  <figure key={index} className="shrink-0">
                    <ExpandableImage
                      src={diagram.src}
                      alt={diagram.alt}
                      width={diagram.width}
                      height={diagram.height}
                      unoptimized
                      wrapperClassName="block h-32"
                      className="h-full w-auto max-w-none object-contain object-top"
                    />
                    <figcaption className="mt-2 text-xs font-normal leading-[1.33] tracking-normal text-[#737373]">
                      {diagram.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="font-heading text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
                다양한 기술 계층을 이해하고 연결하는 개발자를 지향합니다.
              </h2>
              <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
                프론트엔드, 백엔드, 인프라, 네트워크, 보안, 임베디드, AI,
                운영체제 등 다양한 분야를 공부하고 프로젝트를 진행해왔습니다.{" "}
                하나의 기술만 사용하는 개발자가 아니라, 전체 구조를 이해하고
                적재적소에 사용할 수 있는 개발자를 지향합니다. 다양한 계층의
                흐름을 이해하고 있기 때문에, 장애 발생 시 원인을 빠르게 추적하고
                해결하는 과정에도 강점을 가지고 있습니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                  Cloud / Infra
                </p>
                <p className="mt-2 flex items-baseline gap-1 text-black">
                  <span className="text-[24px] font-medium leading-none">
                    1
                  </span>
                  <span className="text-xs font-normal uppercase tracking-normal text-[#737373]">
                    project
                  </span>
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                  CI/CD
                </p>
                <p className="mt-2 flex items-baseline gap-1 text-black">
                  <span className="text-[24px] font-medium leading-none">
                    3
                  </span>
                  <span className="text-xs font-normal uppercase tracking-normal text-[#737373]">
                    pipelines
                  </span>
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                  Full-stack
                </p>
                <p className="mt-2 flex items-baseline gap-1 text-black">
                  <span className="text-[24px] font-medium leading-none">
                    2
                  </span>
                  <span className="text-xs font-normal uppercase tracking-normal text-[#737373]">
                    services
                  </span>
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                  Data / IoT
                </p>
                <p className="mt-2 flex items-baseline gap-1 text-black">
                  <span className="text-[24px] font-medium leading-none">
                    1
                  </span>
                  <span className="text-xs font-normal uppercase tracking-normal text-[#737373]">
                    pipeline
                  </span>
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                  Embedded
                </p>
                <p className="mt-2 flex items-baseline gap-1 text-black">
                  <span className="text-[24px] font-medium leading-none">
                    1
                  </span>
                  <span className="text-xs font-normal uppercase tracking-normal text-[#737373]">
                    project
                  </span>
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                  AI / Hackathon
                </p>
                <p className="mt-2 flex items-baseline gap-1 text-black">
                  <span className="text-[24px] font-medium leading-none">
                    3
                  </span>
                  <span className="text-xs font-normal uppercase tracking-normal text-[#737373]">
                    builds
                  </span>
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-heading text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              불편함을 해결하고 자동화하기 위해 개발합니다.
            </h2>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              DevOps는 개발과 운영 사이에서 반복되는 배포, 검증, 모니터링 흐름을
              정리하고 자동화해 서비스가 안정적으로 전달되도록 만드는 역할이라고
              생각합니다. 기존의 복잡한 워크플로우를 단순화하고 자동화하며,
              사람이 직접 확인하던 작업을 재현 가능한 시스템 흐름으로 바꾸는 데
              관심이 있습니다.
            </p>
          </section>
        </section>

        <section id="projects" className="py-[88px]">
          <SectionHeading>Projects</SectionHeading>

          <div className="mt-6 divide-y divide-[#e5e5e5] border-y border-[#e5e5e5]">
            {mainProjects.map((project, index) => (
              <Link
                key={index}
                href={project.link}
                aria-label={`${project.title} 프로젝트 상세 보기`}
                className="group block cursor-pointer py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <h3 className="font-heading text-2xl font-bold leading-[1.33] tracking-normal text-black">
                      {project.title}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed tracking-normal text-[#737373] sm:whitespace-nowrap">
                      {project.affiliation} | {project.position} |{" "}
                      {project.period}
                    </p>
                  </div>
                  <div className="w-full overflow-hidden px-0 py-2 sm:px-16">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      width={project.image.width}
                      height={project.image.height}
                      unoptimized
                      className="h-auto w-full object-contain object-left-top"
                    />
                  </div>
                  <ul className="grid gap-2 text-base font-normal leading-relaxed tracking-normal text-[#525252]">
                    {project.summary.map((text, index) => (
                      <li key={index} className="flex gap-3">
                        <span
                          className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-black"
                          aria-hidden="true"
                        />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="grid gap-4 pt-2 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((skill, index) => (
                        <span
                          key={index}
                          className={`inline-flex h-8 items-center rounded-full px-3 text-sm leading-none tracking-normal ${skill.primary ? "bg-[#eeeeee] font-medium text-black" : "bg-[#fafafa] font-normal text-[#737373]"}`}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-medium leading-none text-white transition-colors group-hover:bg-[#090909]">
                      상세 보기
                      <ArrowUpRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            <div className="flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#737373]">
              <span>그 외 프로젝트 더보기</span>
              <ChevronDown
                className="h-4 w-4 text-current"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        <section id="experience" className="py-[88px]">
          <SectionHeading>Experience</SectionHeading>

          <div className="mt-6 border-b border-[#e5e5e5]">
            {experience.primary.map((item) => (
              <div
                key={`${item.period}-${item.title}`}
                className="border-t border-[#e5e5e5] py-6"
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                  {item.period}
                </p>
                <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                  <h4 className="text-[17px] font-medium leading-relaxed text-black">
                    {item.title}
                  </h4>
                  <p className="text-sm font-medium text-[#737373]">
                    {item.role}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#737373]">
                  {item.description}
                </p>
              </div>
            ))}

            <details className="group border-t border-[#e5e5e5]">
              <summary className="flex cursor-pointer list-none items-center justify-center gap-2 py-4 text-sm font-medium text-[#737373] transition-colors hover:text-black focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-black [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">그 외 경험 더보기</span>
                <span className="hidden group-open:inline">
                  그 외 경험 접기
                </span>
                <ChevronDown className="h-4 w-4 text-current transition-transform group-open:rotate-180" />
              </summary>
              <div>
                {experience.additional.map((item) => (
                  <div
                    key={`${item.period}-${item.title}`}
                    className="border-t border-[#e5e5e5] py-6"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                      {item.period}
                    </p>
                    <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                      <h4 className="text-[17px] font-medium leading-relaxed text-black">
                        {item.title}
                      </h4>
                      <p className="text-sm font-medium text-[#737373]">
                        {item.role}
                      </p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#737373]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </section>

        <section id="awards" className="py-[88px]">
          <SectionHeading>Awards</SectionHeading>

          <div className="mt-6 grid gap-6">
            {awards.map((award) => (
              <div
                key={`${award.meta}-${award.title}`}
                className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-8"
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                  {award.meta}
                </p>
                <div>
                  <p className="text-[15px] font-medium text-black">
                    {award.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#737373]">
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="py-[88px]">
          <SectionHeading>Skills &amp; Tools</SectionHeading>

          <div className="mt-6 grid gap-6">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-8"
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                  {group.title}
                </p>
                <p className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex h-8 items-center rounded-full bg-[#fafafa] px-3 text-sm font-medium leading-none text-black"
                    >
                      {skill}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="profile" className="py-[88px]">
          <SectionHeading>Profile</SectionHeading>

          <div className="mt-6 grid gap-6">
            <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                Education
              </p>
              <div>
                <p className="text-[15px] font-medium text-black">
                  순천향대학교 사물인터넷학과
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#737373]">
                  졸업예정 · 2020.03 — 2026.08 · 평점 4.22 / 4.5
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                Publication
              </p>
              <div>
                <p className="text-[15px] font-medium text-black">
                  한국컴퓨터종합학술대회(KCC2025) 학부생 논문 제출
                </p>
                <a
                  href="https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12318703"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="DBpia에서 논문 모바일 로봇 양방향 제어를 위한 Unity-기반 실시간 SLAM 시각화 보기"
                  className="mt-1 inline-flex items-center gap-1 text-xs leading-relaxed text-[#737373] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  모바일 로봇 양방향 제어를 위한 Unity-기반 실시간 SLAM 시각화
                  <ArrowUpRight
                    className="h-3 w-3 shrink-0 text-current"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                Language
              </p>
              <div>
                <p className="text-[15px] font-medium text-black">TOEIC 810</p>
                <p className="mt-1 text-xs leading-relaxed text-[#737373]">
                  2025.11 취득
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                Military
              </p>
              <div>
                <p className="text-[15px] font-medium text-black">
                  육군 병장 만기 전역
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#737373]">
                  MW 통신병 · 2022.05 — 2023.11
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-[88px]">
          <SectionHeading>Contact</SectionHeading>

          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            {contactLinks.map((contact) => {
              return (
                <div key={contact.href} className="flex items-center gap-3">
                  {contact.icon}
                  <a
                    href={contact.href}
                    target={contact.external ? "_blank" : undefined}
                    rel={contact.external ? "noreferrer" : undefined}
                    aria-label={contact.ariaLabel}
                    className="text-[15px] font-medium text-black hover:underline"
                  >
                    {contact.label}
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-[760px] px-5 sm:px-6">
        <div className="py-8 text-center">
          <div className="flex justify-center gap-8 mb-4">
            <a
              href="mailto:woojin2296@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] uppercase tracking-[2px] text-[#737373] hover:text-[#0c0c0c] transition-colors"
            >
              Email
            </a>
            <a
              href="https://github.com/woojin2296"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] uppercase tracking-[2px] text-[#737373] hover:text-[#0c0c0c] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://velog.io/@talking_tomato"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] uppercase tracking-[2px] text-[#737373] hover:text-[#0c0c0c] transition-colors"
            >
              Blog
            </a>
          </div>
          <p className="text-[11px] text-[#a3a3a3]">
            &copy; 2026 임우진 (Woojin Lim) &mdash; All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-black"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      focusable="false"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.385.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.238 1.839 1.238 1.071 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.304-5.467-1.332-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.568 21.796 24 17.299 24 12c0-6.63-5.373-12-12-12z" />
    </svg>
  );
}
