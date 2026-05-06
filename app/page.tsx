import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

function ProjectImageSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-video w-full overflow-hidden border border-[#c4c0b8] bg-[#eef1f4]"
    >
      <div className="absolute inset-x-5 top-5 h-3 bg-white/70" />
      <div className="absolute left-5 top-10 h-3 w-2/3 bg-white/55" />
      <div className="absolute bottom-5 left-5 h-16 w-16 bg-[#d8dde7]" />
      <div className="absolute bottom-5 left-24 right-5 h-3 bg-white/55" />
      <div className="absolute bottom-10 left-24 right-16 h-3 bg-white/45" />
    </div>
  );
}

function SectionHeading({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={`border-b-[2px] border-[#111418] pb-4 ${className}`}>
      <h3 className="text-lg uppercase tracking-[2.5px] text-[#111418] font-bold leading-none">
        {children}
      </h3>
    </div>
  );
}

function ProjectDetailCue() {
  return (
    <div className="flex shrink-0 items-center">
      <span className="inline-flex items-center gap-1 border-b border-[#111418] pb-0.5 text-xs font-semibold text-[#111418]">
        상세 보기
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </div>
  );
}

type Experience = {
  period: string;
  duration?: string;
  title: string;
  role: string;
  desc: string;
};

const experiences: Experience[] = [
  {
    period: "2025.09 — 2026.02",
    duration: "6m",
    title: "(주)유머스트알엔디",
    role: "인턴 사원",
    desc: "도봉라이프 AWS 인프라 구축 및 운영 · X-ray 치료기기 GUI 개발",
  },
  {
    period: "2024.01 — 2026.02",
    duration: "2y",
    title: "UBICOMP LAB",
    role: "학부연구생",
    desc: "판옵티콘 개발 · ROS 기반 PCD 수집 · KCC2025 논문 게재",
  },
  {
    period: "2024.01 — 2025.12",
    title: "수업 조교 6회",
    role: "순천향대학교",
    desc: "IoT 플랫폼 (24-1, 25-1) · 임베디드 시스템 (24-2, 25-2) · 나만의 게임만들기 (24-1) · 웹페이지 제작의 실제 (24-2)",
  },
  {
    period: "2024.01 — 2025.12",
    title: "해커톤 참여 3회",
    role: "기획 · 개발 · 발표",
    desc: "2024 캡스톤디자인 및 AI 해커톤 · 2025 캡스톤디자인 및 AI 해커톤 · 2025 대한민국 해커톤",
  },
  {
    period: "2024.01 — 2025.12",
    title: "멘토링 프로그램 2회",
    role: "멘토",
    desc: "2024 순천향 AI·SW 창의한마당 · 2025 SW 학습멘토링(머신러닝)",
  },
];

type Award = {
  grade: string;
  date: string;
  title: string;
  desc: string;
};

const awards: Award[] = [
  {
    grade: "최우수상",
    date: "2024.11",
    title: "SW융합대학 학술제 (E-Sports 개발)",
    desc: "캐주얼 리듬게임 - 탭 스페이스 (Tab Space)",
  },
  {
    grade: "장려상",
    date: "2025.11",
    title: "2025 SCHU AI SW Festival",
    desc: "AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)",
  },
  {
    grade: "장려상",
    date: "2025.11",
    title: "2025 캡스톤 디자인 및 AI 해커톤",
    desc: "장소에 맞는 음악 생성 서비스 - 카라멜 (Caramel)",
  },
  {
    grade: "장려상",
    date: "2025.08",
    title: "2025 글로벌 캡스톤디자인 경진대회",
    desc: "AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)",
  },
  {
    grade: "장려상",
    date: "2024.10",
    title: "2024 캡스톤디자인 및 AI 해커톤",
    desc: "입법 현황 실시간 분석 시스템 - 라다온 (LawDaon)",
  },
];

const skillGroups = [
  {
    label: "Cloud / Infra",
    items: ["AWS", "Terraform", "Docker", "Linux"],
  },
  {
    label: "Delivery",
    items: ["Git", "GitHub Actions"],
  },
  {
    label: "Backend",
    items: ["Spring Boot", "Java", "MySQL"],
  },
  {
    label: "Frontend",
    items: ["Next.js", "TypeScript"],
  },
  {
    label: "Scripting",
    items: ["Python"],
  },
];

function ExperienceItem({
  exp,
  className = "",
}: {
  exp: Experience;
  className?: string;
}) {
  return (
    <div
      className={`grid gap-5 px-7 py-6 md:grid-cols-[200px_1fr] md:gap-8 ${className}`}
    >
      <div className="flex items-center gap-2 whitespace-nowrap">
        <p className="text-[15px] font-semibold leading-tight text-[#5a6775]">
          {exp.period}
        </p>
        {exp.duration ? (
          <p className="text-[13px] leading-tight text-[#7a8490]">
            ({exp.duration})
          </p>
        ) : null}
      </div>
      <div className="md:border-l md:border-[#c4c0b8] md:pl-7">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
          <h4 className="text-[17px] font-semibold text-[#111418]">
            {exp.title}
          </h4>
          <p className="text-sm font-medium text-[#5a6775]">{exp.role}</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#5a6775]">
          {exp.desc}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <nav className="flex justify-center gap-6 sm:gap-10 py-4 px-6 sm:px-10 border-b border-b-[#c4c0b8] border-t-[3px] border-t-[#111418] flex-wrap">
        {[
          "About",
          "Projects",
          "Experience",
          "Awards",
          "Skills",
          "Profile",
          "Contact",
        ].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="border-b-[1.5px] border-transparent text-[11px] uppercase tracking-[3px] text-[#111418] font-semibold hover:border-[#111418]"
          >
            {item}
          </a>
        ))}
      </nav>

      <main className="max-w-[1080px] mx-auto pt-16 px-6 sm:px-10">
        <header className="flex flex-col gap-4 py-16 items-center px-6 sm:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#5a6775]">
            Portfolio &mdash; 2026
          </p>
          <h1 className="text-6xl font-bold leading-tight tracking-tight text-[#111418]">
            Lim Woojin
          </h1>
          <p className="text-xl uppercase tracking-[0.35em] text-[#5a6775]">
            DevOps Engineer
          </p>
        </header>

        <section id="about" className="py-16 text-center">
          <h2 className="text-[clamp(36px,6vw,64px)] font-black leading-[1.1] tracking-tight max-w-[720px] mx-auto my-8 text-[#111418]">
            복잡한 워크플로우를
            <br />
            단순하고 직관적이게
          </h2>
          <p className="text-lg text-[#5a6775] max-w-[560px] mx-auto leading-relaxed">
            프론트엔드부터 벡엔드, 인프라까지 다양한 영역에서의 경험을 바탕으로
            제품의 전체 생명주기를 이해하고 사용자에게 가치를 전달하는 것을
            목표로 합니다.
          </p>
          <div className="mt-24 grid grid-cols-1 md:grid-cols-[1fr_1px_1fr_1px_1fr] border-t-[3px] border-t-[#111418] border-b-[1px] border-b-[#c4c0b8]">
            <div className="py-8 md:px-7">
              <span className="inline-block text-[10px] uppercase tracking-[2px] text-[#5a6775] border border-[#c4c0b8] px-2 py-0.5 mb-3">
                Cloud / Infra
              </span>
              <h3 className="text-lg font-bold text-[#111418] mb-3 leading-snug">
                견고한 인프라 위에
              </h3>
              <p className="text-sm text-[#5a6775] leading-relaxed">
                AWS, Terraform, Docker를 활용해 클라우드 인프라를 설계 및
                구축하고, 네트워크에 대한 깊은 이해를 바탕으로 Public/Private
                Subnet 분리와 Route Table 설계를 통해 트래픽 흐름을 정의하며
                사용자 요청의 유입부터 내부 서비스까지의 네트워크 경로를 고려한
                아키텍처를 구성합니다.
              </p>
            </div>
            <div className="hidden md:block bg-[#c4c0b8]" />
            <div className="py-8 md:px-7 border-t border-[#d8dde7] md:border-t-0">
              <span className="inline-block text-[10px] uppercase tracking-[2px] text-[#5a6775] border border-[#c4c0b8] px-2 py-0.5 mb-3">
                CI/CD
              </span>
              <h3 className="text-lg font-bold text-[#111418] mb-3 leading-snug">
                끊김 없는 배포를 위해
              </h3>
              <p className="text-sm text-[#5a6775] leading-relaxed">
                GitHub Actions 기반 CI/CD 파이프라인을 구축하고, OIDC + SSM을
                활용한 보안 배포와 self-hosted runner를 통한 On-prem 환경 지원을
                통해 반복적인 배포 작업을 줄이고 개발자의 불편함을 해소합니다.
              </p>
            </div>
            <div className="hidden md:block bg-[#c4c0b8]" />
            <div className="py-8 md:px-7 border-t border-[#d8dde7] md:border-t-0">
              <span className="inline-block text-[10px] uppercase tracking-[2px] text-[#5a6775] border border-[#c4c0b8] px-2 py-0.5 mb-3">
                Troubleshooting
              </span>
              <h3 className="text-lg font-bold text-[#111418] mb-3 leading-snug">
                문제의 지점을 좁혀가며
              </h3>
              <p className="text-sm text-[#5a6775] leading-relaxed">
                프론트엔드, 백엔드, 네트워크, 인프라까지 다양한 영역에서의
                경험을 바탕으로 서비스의 요청 흐름과 시스템 간 의존성을 함께
                봅니다. 장애 상황에서는 애플리케이션부터 네트워크의 여러
                계층까지 함께 살피며 원인을 좁혀가고, 복잡한 환경에서도 문제를
                빠르게 파악해 해결합니다.
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="py-16">
          <SectionHeading className="mt-8">Key Projects</SectionHeading>

          <div className="flex flex-col border-b-[1px] border-b-[#c4c0b8]">
            <div className="flex flex-col">
              <Link
                href="/projects/dobonglife/"
                aria-label="도봉라이프 프로젝트 상세 보기"
                className="group grid cursor-pointer gap-6 p-7 transition-colors hover:bg-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#111418] md:grid-cols-[minmax(220px,0.38fr)_1fr] md:items-start"
              >
                <ProjectImageSkeleton />
                <div>
                  <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold underline-offset-4 group-hover:underline">
                      도봉라이프 (Dobong Life)
                    </h3>
                    <ProjectDetailCue />
                  </div>
                  <p className="text-[13px] text-[#999] mb-3">
                    (주)유머스트알엔디 | 인턴사원 | 2025.12 — 2026.02 (3m)
                  </p>
                  <p className="text-[15px] text-[#555] mb-2">
                    서울시 도봉구 지역상권 활성화 애플리케이션의 AWS 인프라를
                    구축 및 운영.
                  </p>
                  <p className="text-sm text-[#666] mb-1">
                    - AWS(VPC, EC2, RDS, S3) 기반 서비스 인프라 설계 및 구축
                  </p>
                  <p className="text-sm text-[#666] mb-1">
                    - Terraform을 활용한 IaC로 인프라 재현성 확보
                  </p>
                  <p className="text-sm text-[#666] mb-1">
                    - SSM + GitHub Actions(OIDC) 기반 CI/CD 파이프라인 구축
                  </p>
                  <p className="text-sm text-[#666] mb-1">
                    - CloudWatch 기반 로그 수집/모니터링 환경 구축
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs px-3 py-1 font-medium bg-[#1a1a1a] text-white border border-[#1a1a1a]">
                      AWS
                    </span>
                    <span className="text-xs px-3 py-1 font-medium bg-[#1a1a1a] text-white border border-[#1a1a1a]">
                      Terraform
                    </span>
                    <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                      Docker Compose
                    </span>
                    <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                      Github Actions
                    </span>
                    <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                      CloudWatch
                    </span>
                  </div>
                </div>
              </Link>
              <Link
                href="/projects/panopticon/"
                aria-label="판옵티콘 프로젝트 상세 보기"
                className="group grid cursor-pointer gap-6 border-y-[1px] border-y-[#c4c0b8] p-7 transition-colors hover:bg-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#111418] md:grid-cols-[minmax(220px,0.38fr)_1fr] md:items-start"
              >
                <ProjectImageSkeleton />
                <div>
                  <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold underline-offset-4 group-hover:underline">
                      판옵티콘 (Panopticon)
                    </h3>
                    <ProjectDetailCue />
                  </div>
                  <p className="text-[13px] text-[#999] mb-3">
                    UBICOMP LAB | 학부연구생 | 2024.07 — 2026.02 (1y 7m)
                  </p>
                  <p className="text-[15px] text-[#555] mb-2">
                    연구실 AI 훈련용 실험 데이터 수집 파이프라인의 관제 및 이상
                    알림 시스템.
                  </p>
                  <p className="text-sm text-[#666] mb-1">
                    - Next.js + Spring Boot 기반 풀스택 개발 및 Docker Compose
                    배포
                  </p>
                  <p className="text-sm text-[#666] mb-1">
                    - GitHub Actions(self-hosted runner) 기반 On-prem CI/CD 구축
                  </p>
                  <p className="text-sm text-[#666] mb-1">
                    - 수집 지연/중단 자동 감지 및 Slack 기반 실시간 알림
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs px-3 py-1 font-medium bg-[#1a1a1a] text-white border border-[#1a1a1a]">
                      Next.js
                    </span>
                    <span className="text-xs px-3 py-1 font-medium bg-[#1a1a1a] text-white border border-[#1a1a1a]">
                      Spring Boot
                    </span>
                    <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                      MySQL
                    </span>
                    <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                      Docker Compose
                    </span>
                    <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                      GitHub Actions
                    </span>
                  </div>
                </div>
              </Link>
              <Link
                href="/projects/sch-miniproject/"
                aria-label="SCH MiniProject Submission System 프로젝트 상세 보기"
                className="group grid cursor-pointer gap-6 p-7 transition-colors hover:bg-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#111418] md:grid-cols-[minmax(220px,0.38fr)_1fr] md:items-start"
              >
                <ProjectImageSkeleton />
                <div>
                  <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold underline-offset-4 group-hover:underline">
                      SCH MiniProject Submission System
                    </h3>
                    <ProjectDetailCue />
                  </div>
                  <p className="text-[13px] text-[#999] mb-3">
                    개인 프로젝트 | 2025.06 — 2026.02 (9m)
                  </p>
                  <p className="text-[15px] text-[#555] mb-2">
                    학과 ML/DL 강의에서 사용하는 과제 제출 및 랭킹 관리 시스템.
                    월 평균 40명 이용.
                  </p>
                  <p className="text-sm text-[#666] mb-1">
                    - 과제 제출, 평가, 랭킹 관리를 통합한 웹 서비스 설계 및 개발
                  </p>
                  <p className="text-sm text-[#666] mb-1">
                    - 세션 기반 인증 및 계층형 권한 구조, 파일 업로드 검증 로직
                    구현
                  </p>
                  <p className="text-sm text-[#666] mb-1">
                    - Docker Compose 기반 배포 및 감사 로그 시스템 구축
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs px-3 py-1 font-medium bg-[#1a1a1a] text-white border border-[#1a1a1a]">
                      Next.js
                    </span>
                    <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                      SQLite
                    </span>
                    <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                      Docker Compose
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section id="experience" className="py-16">
          <SectionHeading>Experience</SectionHeading>

          <div className="border-b border-[#c4c0b8]">
            {experiences.slice(0, 2).map((exp, i) => (
              <ExperienceItem
                key={`${exp.period}-${exp.title}`}
                exp={exp}
                className={i > 0 ? "border-t border-[#c4c0b8]" : ""}
              />
            ))}

            <details className="group border-t border-[#c4c0b8]">
              <summary className="flex cursor-pointer list-none items-center justify-center gap-2 px-7 py-5 text-xs font-medium text-[#7a8490] transition-colors hover:text-[#5a6775] [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">그 외 경험 더보기</span>
                <span className="hidden group-open:inline">접기</span>
                <ChevronDown className="h-4 w-4 text-[#7a8490] transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-[#c4c0b8]">
                {experiences.slice(2).map((exp, i) => (
                  <ExperienceItem
                    key={`${exp.period}-${exp.title}`}
                    exp={exp}
                    className={i > 0 ? "border-t border-[#c4c0b8]" : ""}
                  />
                ))}
              </div>
            </details>
          </div>
        </section>

        <section id="awards" className="py-16">
          <SectionHeading>Awards</SectionHeading>

          <div className="border-b border-[#c4c0b8]">
            {awards.map((award, i) => (
              <div
                key={`${award.date}-${award.title}`}
                className={`grid gap-2 px-7 py-5 md:grid-cols-[82px_72px_minmax(220px,0.95fr)_minmax(240px,1.05fr)] md:items-baseline md:gap-6 ${
                  i > 0 ? "border-t border-[#c4c0b8]" : ""
                }`}
              >
                <div className="flex items-baseline justify-center gap-4 text-center md:block md:-translate-x-1.5">
                  <p className="text-xs text-[#5a6775]">{award.date}</p>
                  <p
                    className={`text-[13px] font-medium md:hidden ${
                      award.grade === "최우수상"
                        ? "text-[#b7791f]"
                        : "text-[#111418]"
                    }`}
                  >
                    {award.grade}
                  </p>
                </div>
                <p
                  className={`hidden text-center text-[13px] font-medium md:block md:-translate-x-1.5 ${
                    award.grade === "최우수상"
                      ? "text-[#b7791f]"
                      : "text-[#111418]"
                  }`}
                >
                  {award.grade}
                </p>
                <h4 className="text-[15px] font-medium leading-snug text-[#111418]">
                  {award.title}
                </h4>
                <p className="text-sm leading-relaxed text-[#5a6775]">
                  {award.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="py-16">
          <SectionHeading>Skills &amp; Tools</SectionHeading>

          <div className="border-b border-[#c4c0b8]">
            {skillGroups.map((group, i) => (
              <div
                key={group.label}
                className={`grid gap-3 px-7 py-5 md:grid-cols-[170px_1fr] md:items-baseline md:gap-8 ${
                  i > 0 ? "border-t border-[#c4c0b8]" : ""
                }`}
              >
                <p className="text-[11px] uppercase tracking-[2.5px] text-[#5a6775] font-semibold">
                  {group.label}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  {group.items.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="flex items-center gap-x-3 text-[15px] font-medium text-[#111418]"
                    >
                      {skillIndex > 0 ? (
                        <span className="text-[#c4c0b8]">/</span>
                      ) : null}
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="profile" className="py-16">
          <SectionHeading>Profile</SectionHeading>

          <div className="border-b border-[#c4c0b8]">
            {[
              {
                label: "Education",
                main: "순천향대학교 사물인터넷학과",
                sub: "졸업예정 · 2020.03 — 2026.08 · 평점 4.22 / 4.5",
              },
              {
                label: "Publication",
                main: "KCC2025 학부생 논문 게재",
                sub: "한국컴퓨터종합학술대회",
              },
              {
                label: "Language",
                main: "TOEIC 810",
                sub: "2025.11 취득",
              },
              {
                label: "Military",
                main: "육군 병장 만기 전역",
                sub: "MW 통신병 · 2022.05 — 2023.11",
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`grid gap-2 px-7 py-5 md:grid-cols-[160px_1fr] md:items-baseline ${
                  i > 0 ? "border-t border-[#c4c0b8]" : ""
                }`}
              >
                <p className="text-[10px] uppercase tracking-[2px] text-[#5a6775] font-semibold">
                  {item.label}
                </p>
                <div>
                  <p className="text-[15px] font-medium text-[#111418]">
                    {item.main}
                  </p>
                  <p className="mt-1 text-xs text-[#5a6775]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-16">
          <SectionHeading>Contact</SectionHeading>

          <div className="grid grid-cols-1 border-b border-[#c4c0b8] sm:grid-cols-2 md:grid-cols-4">
            {[
              {
                key: "Phone",
                val: "010-2296-1280",
                href: "tel:010-2296-1280",
              },
              {
                key: "Email",
                val: "woojin2296@gmail.com",
                href: "mailto:woojin2296@gmail.com",
              },
              {
                key: "GitHub",
                val: "github.com/woojin2296",
                href: "https://github.com/woojin2296",
              },
              {
                key: "Tech Blog",
                val: "velog.io/@talking_tomato",
                href: "https://velog.io/@talking_tomato",
              },
            ].map((item, i) => (
              <div
                key={item.key}
                className={`px-7 py-5 ${
                  i > 0 ? "border-t border-[#c4c0b8] sm:border-t-0" : ""
                } ${i % 2 === 1 ? "sm:border-l sm:border-[#c4c0b8]" : ""} ${
                  i > 1 ? "sm:border-t sm:border-[#c4c0b8] md:border-t-0" : ""
                } ${i > 0 ? "md:border-l md:border-[#c4c0b8]" : ""}`}
              >
                <p className="mb-1.5 text-[10px] uppercase tracking-[2px] text-[#5a6775]">
                  {item.key}
                </p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[15px] font-medium text-[#111418] hover:underline"
                >
                  {item.val}
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="max-w-[1080px] mx-auto px-6 sm:px-10">
        <div className="border-t border-[#c4c0b8] py-8 text-center">
          <div className="flex justify-center gap-8 mb-4">
            {[
              { label: "Email", href: "mailto:woojin2296@gmail.com" },
              { label: "GitHub", href: "https://github.com/woojin2296" },
              { label: "Blog", href: "https://velog.io/@talking_tomato" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] uppercase tracking-[2px] text-[#5a6775] hover:text-[#111418] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-[11px] text-[#c4c0b8]">
            &copy; 2026 임우진 (Woojin Lim) &mdash; All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
