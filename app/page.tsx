import Link from "next/link";
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

import { projectInfo as DobonglifeInfo } from "./projects/dobonglife/page";
import { projectInfo as PanopticonInfo } from "./projects/panopticon/page";
import { projectInfo as SchMiniProjectInfo } from "./projects/sch-miniproject/page";

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
      caption: "GitHub Actions 기반 CI/CD 흐름 - V1",
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
      caption: "GitHub Actions + SSM OIDC 기반 CI/CD 흐름 - V2",
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
      caption: "판옵티콘 self-hosted runner CI/CD 흐름",
      width: 4765,
      height: 3357,
    },
  ];

  const keyProjects = [
    DobonglifeInfo,
    PanopticonInfo,
    SchMiniProjectInfo,
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

  return (
    <div className="min-h-screen bg-white">
      <SectionNavigation />

      <main className="mx-auto max-w-[760px] px-5 pt-12 sm:px-6">
        <header className="flex flex-col gap-4 py-20">
          <p className="text-xs uppercase tracking-[0.22em] text-[#737373]">
            Portfolio 2026
          </p>
          <h1 className="font-display text-4xl font-medium leading-[1.12] tracking-normal text-black">
            임우진 · Lim Woojin
          </h1>
          <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
            DevOps Engineer
          </p>
        </header>

        <section id="about" className="flex flex-col gap-20 py-16">
          <section className="flex flex-col gap-4">
            <h2 className="font-heading text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              네트워크를 좋아하는 DevOps Engineer 임우진 입니다.
            </h2>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              사용자의 요청이 네트워크와 서버를 지나 데이터베이스까지 처리되는
              전체 흐름을 이해하고 설계하는 것을 좋아합니다.{" "}
              계층별로 나누어진 시스템의 흐름을 따라가며, 서비스가 end-to-end로
              연결되는 구조를 이해하는 것을 중요하게 생각합니다.{" "}
              이를 위해 프로젝트에서 아키텍처를 정립하고 인터페이스와 데이터
              흐름을 고려하는 것을 우선시합니다.
            </p>
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto overflow-y-hidden pr-8 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
                {architecturalDiagrams.map((diagram, index) => (
                  <figure key={index} className="shrink-0">
                    <ExpandableImage
                      src={diagram.src}
                      alt={diagram.alt}
                      width={diagram.width}
                      height={diagram.height}
                      unoptimized
                      wrapperClassName="block h-40"
                      className="h-full w-auto max-w-none object-contain object-top"
                    />
                    <figcaption className="mt-2 text-sm font-normal leading-relaxed tracking-normal text-[#737373]">
                      {diagram.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-heading text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              다양한 기술 계층을 이해하고 연결하는 개발자를 지향합니다.
            </h2>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              프론트엔드, 백엔드, 인프라, 네트워크, 보안, 임베디드, AI, 운영체제
              등 다양한 분야를 공부하고 프로젝트를 진행해왔습니다.{" "}
              하나의 기술만 사용하는 개발자가 아니라, 전체 구조를 이해하고
              적재적소에 사용할 수 있는 개발자를 지향합니다.{" "}
              다양한 계층의 흐름을 이해하고 있기 때문에, 장애 발생 시 원인을
              빠르게 추적하고 해결하는 과정에도 강점을 가지고 있습니다.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                  Cloud / Infra
                </p>
                <p className="mt-2 flex items-baseline gap-1 text-black">
                  <span className="text-[24px] font-medium leading-none">1</span>
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
                  <span className="text-[24px] font-medium leading-none">3</span>
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
                  <span className="text-[24px] font-medium leading-none">2</span>
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
                  <span className="text-[24px] font-medium leading-none">1</span>
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
                  <span className="text-[24px] font-medium leading-none">1</span>
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
                  <span className="text-[24px] font-medium leading-none">3</span>
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
              업무나 일상 속의 다양한 불편함을 개발로 풀어나가려 합니다.{" "}
              직접 만들고 개선하며, 복잡한 워크플로우를 단순화하려 노력합니다.
            </p>
          </section>
        </section>

        <section id="projects" className="py-16">
          <SectionHeading>Key Projects</SectionHeading>
          <div className="mt-6 border-b border-[#e5e5e5]">
            {keyProjects.map((project, index) => (
              <Link
                key={index}
                href={project.link}
                aria-label={`${project.title} 프로젝트 상세 보기`}
                className="group block cursor-pointer border-t border-[#e5e5e5] py-6 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                <div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-[18px] font-medium leading-relaxed tracking-normal text-black underline-offset-4 group-hover:underline">
                      {project.title}
                    </h3>
                    <div className="flex shrink-0 items-center">
                      <span className="inline-flex items-center gap-1 text-sm font-medium leading-relaxed text-black">
                        상세 보기
                        <ArrowUpRight
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-normal leading-relaxed tracking-normal text-[#737373]">
                    {project.affiliation} | {project.position} |{" "}
                    {project.period}
                  </p>
                  <p className="mt-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
                    {project.description}
                  </p>
                  <ul className="mt-3 grid gap-1 pl-4 text-sm font-normal leading-relaxed tracking-normal text-[#737373] marker:text-[#a3a3a3]">
                    {project.summary.map((text, index) => (
                      <li key={index}>{text}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack
                      .filter((skill) => skill.summary)
                      .map((skill, index) => (
                        <span
                          key={index}
                          className={`inline-flex h-8 items-center border px-3 text-sm leading-none tracking-normal ${skill.primary ? "border-[#171717] bg-[#171717] font-medium text-white" : "border-[#d4d4d4] bg-white font-normal text-black"}`}
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
              </Link>
            ))}
            <div className="flex items-center justify-center gap-2 border-t border-[#e5e5e5] py-4 text-sm font-medium text-[#737373]">
              <span>그 외 프로젝트 더보기</span>
              <ChevronDown className="h-4 w-4 text-current" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section id="experience" className="py-16">
          <SectionHeading>Experience</SectionHeading>

          <div className="mt-6 border-b border-[#e5e5e5]">
            <div className="border-t border-[#e5e5e5] py-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                2025.09 — 2026.02 · 6개월
              </p>
              <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                <h4 className="text-[17px] font-medium leading-relaxed text-black">
                  (주)유머스트알엔디
                </h4>
                <p className="text-sm font-medium text-[#737373]">
                  인턴 사원
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#737373]">
                도봉라이프 AWS 인프라 구축 및 운영 · 회사 ERP 시스템 벡엔드
                개발 및 운영 · X-ray 치료기기 GUI 개발
              </p>
            </div>

            <div className="border-t border-[#e5e5e5] py-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                2024.01 — 2026.02 · 2년
              </p>
              <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                <h4 className="text-[17px] font-medium leading-relaxed text-black">
                  UBICOMP LAB
                </h4>
                <p className="text-sm font-medium text-[#737373]">
                  학부연구생
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#737373]">
                판옵티콘 개발 · ROS 기반 PCD 수집 · KCC2025 학부생 논문 제출
              </p>
            </div>

            <details className="group border-t border-[#e5e5e5]">
              <summary className="flex cursor-pointer list-none items-center justify-center gap-2 py-4 text-sm font-medium text-[#737373] transition-colors hover:text-black focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-black [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">그 외 경험 더보기</span>
                <span className="hidden group-open:inline">그 외 경험 접기</span>
                <ChevronDown className="h-4 w-4 text-current transition-transform group-open:rotate-180" />
              </summary>
              <div>
                <div className="border-t border-[#e5e5e5] py-6">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                    2024.01 — 2025.12
                  </p>
                  <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                    <h4 className="text-[17px] font-medium leading-relaxed text-black">
                      수업 조교 6회
                    </h4>
                    <p className="text-sm font-medium text-[#737373]">
                      순천향대학교
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#737373]">
                    IoT 플랫폼 (24-1, 25-1) · 임베디드 시스템 (24-2, 25-2) ·
                    나만의 게임만들기 (24-1) · 웹페이지 제작의 실제 (24-2)
                  </p>
                </div>

                <div className="border-t border-[#e5e5e5] py-6">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                    2024.01 — 2025.12
                  </p>
                  <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                    <h4 className="text-[17px] font-medium leading-relaxed text-black">
                      해커톤 참여 3회
                    </h4>
                    <p className="text-sm font-medium text-[#737373]">
                      기획 · 개발 · 발표
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#737373]">
                    2024 캡스톤디자인 및 AI 해커톤 · 2025 캡스톤디자인 및 AI
                    해커톤 · 2025 대한민국 해커톤
                  </p>
                </div>

                <div className="border-t border-[#e5e5e5] py-6">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                    2024.01 — 2025.12
                  </p>
                  <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                    <h4 className="text-[17px] font-medium leading-relaxed text-black">
                      멘토링 프로그램 2회
                    </h4>
                    <p className="text-sm font-medium text-[#737373]">멘토</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#737373]">
                    2024 순천향 AI·SW 창의한마당 · 2025 SW
                    학습멘토링(머신러닝)
                  </p>
                </div>
              </div>
            </details>
          </div>
        </section>

        <section id="awards" className="py-16">
          <SectionHeading>Awards</SectionHeading>

          <div className="mt-6 grid gap-5">
            <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                2024.11 · 최우수상
              </p>
              <div>
                <p className="text-[15px] font-medium text-black">
                  SW융합대학 학술제 (E-Sports 개발)
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#737373]">
                  캐주얼 리듬게임 - 탭 스페이스 (Tab Space)
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                2025.11 · 장려상
              </p>
              <div>
                <p className="text-[15px] font-medium text-black">
                  2025 SCHU AI SW Festival
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#737373]">
                  AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                2025.11 · 장려상
              </p>
              <div>
                <p className="text-[15px] font-medium text-black">
                  2025 캡스톤 디자인 및 AI 해커톤
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#737373]">
                  장소에 맞는 음악 생성 서비스 - 카라멜 (Caramel)
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                2025.08 · 장려상
              </p>
              <div>
                <p className="text-[15px] font-medium text-black">
                  2025 글로벌 캡스톤디자인 경진대회
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#737373]">
                  AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                2024.10 · 장려상
              </p>
              <div>
                <p className="text-[15px] font-medium text-black">
                  2024 캡스톤디자인 및 AI 해커톤
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#737373]">
                  입법 현황 실시간 분석 시스템 - 라다온 (LawDaon)
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-16">
          <SectionHeading>Skills &amp; Tools</SectionHeading>

          <div className="mt-6 grid gap-5">
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

        <section id="profile" className="py-16">
          <SectionHeading>Profile</SectionHeading>

          <div className="mt-6 grid gap-5">
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
                <a
                  href="https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12318703"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="DBpia에서 한국컴퓨터종합학술대회 KCC2025 학부생 논문 보기"
                  className="inline-flex items-center gap-1 text-[15px] font-medium leading-relaxed text-black underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  한국컴퓨터종합학술대회(KCC2025) 학부생 논문 제출
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>
                <p className="mt-1 text-xs leading-relaxed text-[#737373]">
                  모바일 로봇 양방향 제어를 위한 Unity-기반 실시간 SLAM 시각화
                </p>
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

        <section id="contact" className="pt-16 pb-12">
          <SectionHeading>Contact</SectionHeading>

          <div className="mt-6 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-8">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-black" aria-hidden="true" />
              <a
                href="tel:010-2296-1280"
                aria-label="전화번호 010-2296-1280"
                className="text-[15px] font-medium text-black hover:underline"
              >
                010-2296-1280
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-black" aria-hidden="true" />
              <a
                href="mailto:woojin2296@gmail.com"
                aria-label="이메일 woojin2296@gmail.com"
                className="text-[15px] font-medium text-black hover:underline"
              >
                woojin2296@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <GitHubIcon
                className="h-4 w-4 shrink-0 text-black"
                aria-hidden="true"
              />
              <a
                href="https://github.com/woojin2296"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub 프로필 github.com/woojin2296"
                className="text-[15px] font-medium text-black hover:underline"
              >
                github.com/woojin2296
              </a>
            </div>

            <div className="flex items-center gap-3">
              <BookOpenText
                className="h-4 w-4 shrink-0 text-black"
                aria-hidden="true"
              />
              <a
                href="https://velog.io/@talking_tomato"
                target="_blank"
                rel="noreferrer"
                aria-label="기술 블로그 velog.io/@talking_tomato"
                className="text-[15px] font-medium text-black hover:underline"
              >
                velog.io/@talking_tomato
              </a>
            </div>
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

function GitHubIcon({
  className,
  "aria-hidden": ariaHidden,
}: {
  className?: string;
  "aria-hidden"?: "true";
}) {
  return (
    <svg
      className={className}
      aria-hidden={ariaHidden}
      viewBox="0 0 24 24"
      fill="currentColor"
      focusable="false"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.385.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.238 1.839 1.238 1.071 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.304-5.467-1.332-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.568 21.796 24 17.299 24 12c0-6.63-5.373-12-12-12z" />
    </svg>
  );
}
