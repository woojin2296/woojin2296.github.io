import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { ExpandableImage } from "@/app/_components/expandable-image";
import { SectionNavigation } from "@/app/_components/section-navigation";

import { projectInfo as DobonglifeInfo } from "@/app/projects/dobonglife/page";
import { projectInfo as PanopticonInfo } from "@/app/projects/panopticon/page";
import { projectInfo as SchMiniProjectInfo } from "@/app/projects/sch-miniproject/page";

export default function Home() {
  const architecturalDiagrams = [
    {
      src: "/projects/dobonglife/Architecture - DobongLife AWS Infra - V1.jpg",
      alt: "도봉라이프 V1 AWS 인프라 아키텍처 다이어그램",
      caption: "도봉라이프 인프라 아키텍처 - V1",
    },
    {
      src: "/projects/dobonglife/Architecture - DobongLife CICD - V1.jpg",
      alt: "도봉라이프 V1 CI/CD 아키텍처 다이어그램",
      caption: "GitHub Actions 기반 CI/CD 흐름 - V1",
    },
    {
      src: "/projects/dobonglife/Architecture - DobongLife AWS Infra - V2.jpg",
      alt: "도봉라이프 V2 AWS 인프라 아키텍처 다이어그램",
      caption: "도봉라이프 인프라 아키텍처 - V2",
    },
    {
      src: "/projects/dobonglife/Architecture - DobongLife CICD - V2.jpg",
      alt: "도봉라이프 V2 CI/CD 아키텍처 다이어그램",
      caption: "GitHub Actions + SSM OIDC 기반 CI/CD 흐름 - V2",
    },
    {
      src: "/projects/panopticon/panopticon-arch.webp",
      alt: "판옵티콘 아키텍처 다이어그램",
      caption: "판옵티콘 아키텍처",
    },
  ];

  const keyProjects = [
    DobonglifeInfo,
    PanopticonInfo,
    SchMiniProjectInfo,
  ];

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <SectionNavigation />

      <main className="mx-auto max-w-[720px] px-6 pt-[88px] sm:px-8">
        <header className="flex flex-col gap-3 pb-[88px]">
          <p className="text-sm font-medium leading-[1.43] text-[#737373]">
            Portfolio &mdash; 2026
          </p>
          <h1 className="text-[36px] font-medium leading-[1.11] tracking-normal text-[#000000]">
            임우진 · Lim Woojin
          </h1>
          <p className="text-base font-normal leading-[1.5] text-[#737373]">
            DevOps Engineer
          </p>
        </header>

        <section id="about" className="flex flex-col gap-[88px]">
          <section className="flex flex-col gap-4">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-[#000000]">
              네트워크를 좋아하는 DevOps Engineer 임우진 입니다.
            </h2>
            <p className="text-base font-normal leading-[1.5] text-[#737373]">
              사용자의 요청이 네트워크와 서버를 지나 데이터베이스까지 처리되는
              전체 흐름을 이해하고 설계하는 것을 좋아합니다. <br />
              계층별로 나누어진 시스템의 흐름을 따라가며, 서비스가 end-to-end로
              연결되는 구조를 이해하는 것을 중요하게 생각합니다. <br />
              이를 위해 프로젝트에서 아키텍처를 정립하고 인터페이스와 데이터
              흐름을 고려하는 것을 우선시합니다. <br />
            </p>
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto overflow-y-hidden pr-20 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
                {architecturalDiagrams.map((diagram, index) => (
                  <figure key={index} className="shrink-0">
                    <ExpandableImage
                      src={diagram.src}
                      alt={diagram.alt}
                      width={2163}
                      height={1266}
                      unoptimized
                      wrapperClassName="block h-40"
                      className="h-full w-auto max-w-none object-contain object-top"
                    />
                    <figcaption className="mt-2 text-xs font-normal leading-[1.33] text-[#737373]">
                      {diagram.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 top-0 w-20 bg-gradient-to-l from-[#fafaf8] via-[#fafaf8]/90 to-transparent"
              />
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-[#000000]">
              다양한 기술 계층을 이해하고 연결하는 개발자를 지향합니다.
            </h2>
            <p className="text-base font-normal leading-[1.5] text-[#737373]">
              프론트엔드, 백엔드, 인프라, 네트워크, 보안, 임베디드, AI, 운영체제
              등 다양한 분야를 공부하고 프로젝트를 진행해왔습니다. <br />
              하나의 기술만 사용하는 개발자가 아니라, 전체 구조를 이해하고
              적재적소에 사용할 수 있는 개발자를 지향합니다. <br />
              다양한 계층의 흐름을 이해하고 있기 때문에, 장애 발생 시 원인을
              빠르게 추적하고 해결하는 과정에도 강점을 가지고 있습니다.
            </p>
            <div className="mt-5 grid grid-cols-2 border-y border-[#c4c0b8] md:grid-cols-6">
              <div className="border-r border-[#c4c0b8] px-4 py-4 first:pl-0">
                <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                  Cloud / Infra
                </p>
                <p className="mt-2 flex items-baseline gap-1 text-[#000000]">
                  <span className="text-[24px] font-semibold leading-[1.33]">
                    1
                  </span>
                  <span className="text-xs font-normal leading-[1.33] text-[#737373]">
                    project
                  </span>
                </p>
              </div>
              <div className="border-[#c4c0b8] px-4 py-4 md:border-r">
                <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                  CI/CD
                </p>
                <p className="mt-2 flex items-baseline gap-1 text-[#000000]">
                  <span className="text-[24px] font-semibold leading-[1.33]">
                    3
                  </span>
                  <span className="text-xs font-normal leading-[1.33] text-[#737373]">
                    pipelines
                  </span>
                </p>
              </div>
              <div className="border-r border-t border-[#c4c0b8] px-4 py-4 md:border-t-0">
                <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                  Full-stack
                </p>
                <p className="mt-2 flex items-baseline gap-1 text-[#000000]">
                  <span className="text-[24px] font-semibold leading-[1.33]">
                    2
                  </span>
                  <span className="text-xs font-normal leading-[1.33] text-[#737373]">
                    services
                  </span>
                </p>
              </div>
              <div className="border-t border-[#c4c0b8] px-4 py-4 md:border-r md:border-t-0">
                <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                  Data / IoT
                </p>
                <p className="mt-2 flex items-baseline gap-1 text-[#000000]">
                  <span className="text-[24px] font-semibold leading-[1.33]">
                    1
                  </span>
                  <span className="text-xs font-normal leading-[1.33] text-[#737373]">
                    pipeline
                  </span>
                </p>
              </div>
              <div className="border-r border-t border-[#c4c0b8] px-4 py-4 md:border-t-0">
                <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                  Embedded
                </p>
                <p className="mt-2 flex items-baseline gap-1 text-[#000000]">
                  <span className="text-[24px] font-semibold leading-[1.33]">
                    1
                  </span>
                  <span className="text-xs font-normal leading-[1.33] text-[#737373]">
                    project
                  </span>
                </p>
              </div>
              <div className="border-t border-[#c4c0b8] px-4 py-4 pr-0 md:border-t-0">
                <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                  AI / Hackathon
                </p>
                <p className="mt-2 flex items-baseline gap-1 text-[#000000]">
                  <span className="text-[24px] font-semibold leading-[1.33]">
                    3
                  </span>
                  <span className="text-xs font-normal leading-[1.33] text-[#737373]">
                    builds
                  </span>
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-[#000000]">
              불편함을 해결하고 자동화하기 위해 개발합니다.
            </h2>
            <p className="text-base font-normal leading-[1.5] text-[#737373]">
              업무나 일상 속의 다양한 불편함을 개발로 풀어나가려 합니다. <br />
              직접 만들고 개선하며, 복잡한 워크플로우를 단순화하려 노력합니다.
            </p>
          </section>
        </section>

        <section id="projects" className="py-[88px]">
          <div className="border-b-[2px] border-[#0c0c0c] pb-4">
            <h3 className="text-[20px] font-medium leading-[1.4] tracking-normal text-[#000000]">
              Key Projects
            </h3>
          </div>
          <div className="flex flex-col">
            {keyProjects.map((project, index) => (
              <Link
                key={index}
                href={project.link}
                aria-label={`${project.title} 프로젝트 상세 보기`}
                className="group block cursor-pointer border-b-[1px] border-b-[#c4c0b8] py-6 transition-colors hover:bg-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0c0c0c]"
              >
                <div>
                  <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-[18px] font-medium leading-[1.56] text-[#000000] underline-offset-4 group-hover:underline">
                      {project.title}
                    </h3>
                    <div className="flex shrink-0 items-center">
                      <span className="inline-flex items-center gap-1 border-b border-[#0c0c0c] pb-0.5 text-sm font-medium leading-none text-[#000000]">
                        상세 보기
                        <ArrowUpRight
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                  <p className="mb-3 text-sm font-normal leading-[1.43] text-[#737373]">
                    {project.affiliation} | {project.position} |{" "}
                    {project.period}
                  </p>
                  <p className="mb-3 text-base font-normal leading-[1.5] text-[#737373]">
                    {project.description}
                  </p>
                  {project.summary.map((text, index) => (
                    <p
                      key={index}
                      className="mb-1 text-sm font-normal leading-[1.43] text-[#525252]"
                    >
                      - {text}
                    </p>
                  ))}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack
                      .filter((skill) => skill.summary)
                      .map((skill, index) => (
                        <span
                          key={index}
                          className={`border px-3 py-1.5 text-sm font-medium leading-none ${skill.primary ? "border-[#000000] bg-[#000000] text-white" : "border-[#d4d4d4] text-[#525252]"}`}
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="experience" className="py-[88px]">
          <div className="border-b-[2px] border-[#0c0c0c] pb-4">
            <h3 className="text-[20px] font-medium leading-[1.4] tracking-normal text-[#000000]">
              Experience
            </h3>
          </div>

          <div className="border-b border-[#c4c0b8]">
            <div className="grid gap-5 py-6 md:grid-cols-[180px_1fr] md:gap-8">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <p className="text-sm font-medium leading-[1.43] text-[#737373]">
                  2025.09 — 2026.02
                </p>
                <p className="text-xs font-normal leading-[1.33] text-[#a3a3a3]">
                  (6m)
                </p>
              </div>
              <div className="md:border-l md:border-[#c4c0b8] md:pl-7">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h4 className="text-[18px] font-medium leading-[1.56] text-[#000000]">
                    (주)유머스트알엔디
                  </h4>
                  <p className="text-sm font-normal leading-[1.43] text-[#737373]">
                    인턴 사원
                  </p>
                </div>
                <p className="mt-3 text-sm font-normal leading-[1.43] text-[#737373]">
                  도봉라이프 AWS 인프라 구축 및 운영 · 회사 ERP 시스템 벡엔드
                  개발 및 운영 · X-ray 치료기기 GUI 개발
                </p>
              </div>
            </div>

            <div className="grid gap-5 border-t border-[#c4c0b8] py-6 md:grid-cols-[180px_1fr] md:gap-8">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <p className="text-sm font-medium leading-[1.43] text-[#737373]">
                  2024.01 — 2026.02
                </p>
                <p className="text-xs font-normal leading-[1.33] text-[#a3a3a3]">
                  (2y)
                </p>
              </div>
              <div className="md:border-l md:border-[#c4c0b8] md:pl-7">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h4 className="text-[18px] font-medium leading-[1.56] text-[#000000]">
                    UBICOMP LAB
                  </h4>
                  <p className="text-sm font-normal leading-[1.43] text-[#737373]">
                    학부연구생
                  </p>
                </div>
                <p className="mt-3 text-sm font-normal leading-[1.43] text-[#737373]">
                  판옵티콘 개발 · ROS 기반 PCD 수집 · KCC2025 논문 게재
                </p>
              </div>
            </div>

            <details className="group border-t border-[#c4c0b8]">
              <summary className="flex cursor-pointer list-none items-center justify-center gap-2 py-5 text-sm font-medium leading-none text-[#737373] transition-colors hover:text-[#000000] [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">그 외 경험 더보기</span>
                <span className="hidden group-open:inline">접기</span>
                <ChevronDown className="h-4 w-4 text-[#737373] transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-[#c4c0b8]">
                <div className="grid gap-5 py-6 md:grid-cols-[180px_1fr] md:gap-8">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <p className="text-sm font-medium leading-[1.43] text-[#737373]">
                      2024.01 — 2025.12
                    </p>
                  </div>
                  <div className="md:border-l md:border-[#c4c0b8] md:pl-7">
                    <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                      <h4 className="text-[18px] font-medium leading-[1.56] text-[#000000]">
                        수업 조교 6회
                      </h4>
                      <p className="text-sm font-normal leading-[1.43] text-[#737373]">
                        순천향대학교
                      </p>
                    </div>
                    <p className="mt-3 text-sm font-normal leading-[1.43] text-[#737373]">
                      IoT 플랫폼 (24-1, 25-1) · 임베디드 시스템 (24-2, 25-2) ·
                      나만의 게임만들기 (24-1) · 웹페이지 제작의 실제 (24-2)
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 border-t border-[#c4c0b8] py-6 md:grid-cols-[180px_1fr] md:gap-8">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <p className="text-sm font-medium leading-[1.43] text-[#737373]">
                      2024.01 — 2025.12
                    </p>
                  </div>
                  <div className="md:border-l md:border-[#c4c0b8] md:pl-7">
                    <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                      <h4 className="text-[18px] font-medium leading-[1.56] text-[#000000]">
                        해커톤 참여 3회
                      </h4>
                      <p className="text-sm font-normal leading-[1.43] text-[#737373]">
                        기획 · 개발 · 발표
                      </p>
                    </div>
                    <p className="mt-3 text-sm font-normal leading-[1.43] text-[#737373]">
                      2024 캡스톤디자인 및 AI 해커톤 · 2025 캡스톤디자인 및 AI
                      해커톤 · 2025 대한민국 해커톤
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 border-t border-[#c4c0b8] py-6 md:grid-cols-[180px_1fr] md:gap-8">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <p className="text-sm font-medium leading-[1.43] text-[#737373]">
                      2024.01 — 2025.12
                    </p>
                  </div>
                  <div className="md:border-l md:border-[#c4c0b8] md:pl-7">
                    <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                      <h4 className="text-[18px] font-medium leading-[1.56] text-[#000000]">
                        멘토링 프로그램 2회
                      </h4>
                      <p className="text-sm font-normal leading-[1.43] text-[#737373]">
                        멘토
                      </p>
                    </div>
                    <p className="mt-3 text-sm font-normal leading-[1.43] text-[#737373]">
                      2024 순천향 AI·SW 창의한마당 · 2025 SW
                      학습멘토링(머신러닝)
                    </p>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </section>

        <section id="awards" className="py-[88px]">
          <div className="border-b-[2px] border-[#0c0c0c] pb-4">
            <h3 className="text-[20px] font-medium leading-[1.4] tracking-normal text-[#000000]">
              Awards
            </h3>
          </div>

          <div className="border-b border-[#c4c0b8]">
            <div className="grid gap-2 py-5 md:grid-cols-[82px_72px_minmax(220px,0.95fr)_minmax(240px,1.05fr)] md:items-baseline md:gap-6">
              <div className="flex items-baseline justify-center gap-4 text-center md:block md:-translate-x-1.5">
                <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                  2024.11
                </p>
                <p className="text-sm font-medium leading-[1.43] text-[#b7791f] md:hidden">
                  최우수상
                </p>
              </div>
              <p className="hidden text-center text-sm font-medium leading-[1.43] text-[#b7791f] md:block md:-translate-x-1.5">
                최우수상
              </p>
              <h4 className="text-base font-medium leading-[1.5] text-[#000000]">
                SW융합대학 학술제 (E-Sports 개발)
              </h4>
              <p className="text-sm font-normal leading-[1.43] text-[#737373]">
                캐주얼 리듬게임 - 탭 스페이스 (Tab Space)
              </p>
            </div>

            <div className="grid gap-2 border-t border-[#c4c0b8] py-5 md:grid-cols-[82px_72px_minmax(220px,0.95fr)_minmax(240px,1.05fr)] md:items-baseline md:gap-6">
              <div className="flex items-baseline justify-center gap-4 text-center md:block md:-translate-x-1.5">
                <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                  2025.11
                </p>
                <p className="text-sm font-medium leading-[1.43] text-[#000000] md:hidden">
                  장려상
                </p>
              </div>
              <p className="hidden text-center text-sm font-medium leading-[1.43] text-[#000000] md:block md:-translate-x-1.5">
                장려상
              </p>
              <h4 className="text-base font-medium leading-[1.5] text-[#000000]">
                2025 SCHU AI SW Festival
              </h4>
              <p className="text-sm font-normal leading-[1.43] text-[#737373]">
                AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)
              </p>
            </div>

            <div className="grid gap-2 border-t border-[#c4c0b8] py-5 md:grid-cols-[82px_72px_minmax(220px,0.95fr)_minmax(240px,1.05fr)] md:items-baseline md:gap-6">
              <div className="flex items-baseline justify-center gap-4 text-center md:block md:-translate-x-1.5">
                <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                  2025.11
                </p>
                <p className="text-sm font-medium leading-[1.43] text-[#000000] md:hidden">
                  장려상
                </p>
              </div>
              <p className="hidden text-center text-sm font-medium leading-[1.43] text-[#000000] md:block md:-translate-x-1.5">
                장려상
              </p>
              <h4 className="text-base font-medium leading-[1.5] text-[#000000]">
                2025 캡스톤 디자인 및 AI 해커톤
              </h4>
              <p className="text-sm font-normal leading-[1.43] text-[#737373]">
                장소에 맞는 음악 생성 서비스 - 카라멜 (Caramel)
              </p>
            </div>

            <div className="grid gap-2 border-t border-[#c4c0b8] py-5 md:grid-cols-[82px_72px_minmax(220px,0.95fr)_minmax(240px,1.05fr)] md:items-baseline md:gap-6">
              <div className="flex items-baseline justify-center gap-4 text-center md:block md:-translate-x-1.5">
                <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                  2025.08
                </p>
                <p className="text-sm font-medium leading-[1.43] text-[#000000] md:hidden">
                  장려상
                </p>
              </div>
              <p className="hidden text-center text-sm font-medium leading-[1.43] text-[#000000] md:block md:-translate-x-1.5">
                장려상
              </p>
              <h4 className="text-base font-medium leading-[1.5] text-[#000000]">
                2025 글로벌 캡스톤디자인 경진대회
              </h4>
              <p className="text-sm font-normal leading-[1.43] text-[#737373]">
                AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)
              </p>
            </div>

            <div className="grid gap-2 border-t border-[#c4c0b8] py-5 md:grid-cols-[82px_72px_minmax(220px,0.95fr)_minmax(240px,1.05fr)] md:items-baseline md:gap-6">
              <div className="flex items-baseline justify-center gap-4 text-center md:block md:-translate-x-1.5">
                <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                  2024.10
                </p>
                <p className="text-sm font-medium leading-[1.43] text-[#000000] md:hidden">
                  장려상
                </p>
              </div>
              <p className="hidden text-center text-sm font-medium leading-[1.43] text-[#000000] md:block md:-translate-x-1.5">
                장려상
              </p>
              <h4 className="text-base font-medium leading-[1.5] text-[#000000]">
                2024 캡스톤디자인 및 AI 해커톤
              </h4>
              <p className="text-sm font-normal leading-[1.43] text-[#737373]">
                입법 현황 실시간 분석 시스템 - 라다온 (LawDaon)
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="py-[88px]">
          <div className="border-b-[2px] border-[#0c0c0c] pb-4">
            <h3 className="text-[20px] font-medium leading-[1.4] tracking-normal text-[#000000]">
              Skills &amp; Tools
            </h3>
          </div>

          <div className="border-b border-[#c4c0b8]">
            <div className="grid gap-3 py-5 md:grid-cols-[170px_1fr] md:items-baseline md:gap-8">
              <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                Cloud / Infra
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="flex items-center gap-x-3 text-base font-medium leading-[1.5] text-[#000000]">
                  AWS
                </span>
                <span className="flex items-center gap-x-3 text-base font-medium leading-[1.5] text-[#000000]">
                  <span className="text-[#c4c0b8]">/</span>
                  Terraform
                </span>
                <span className="flex items-center gap-x-3 text-base font-medium leading-[1.5] text-[#000000]">
                  <span className="text-[#c4c0b8]">/</span>
                  Docker
                </span>
                <span className="flex items-center gap-x-3 text-base font-medium leading-[1.5] text-[#000000]">
                  <span className="text-[#c4c0b8]">/</span>
                  Linux
                </span>
              </div>
            </div>

            <div className="grid gap-3 border-t border-[#c4c0b8] py-5 md:grid-cols-[170px_1fr] md:items-baseline md:gap-8">
              <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                Delivery
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="flex items-center gap-x-3 text-base font-medium leading-[1.5] text-[#000000]">
                  Git
                </span>
                <span className="flex items-center gap-x-3 text-base font-medium leading-[1.5] text-[#000000]">
                  <span className="text-[#c4c0b8]">/</span>
                  GitHub Actions
                </span>
              </div>
            </div>

            <div className="grid gap-3 border-t border-[#c4c0b8] py-5 md:grid-cols-[170px_1fr] md:items-baseline md:gap-8">
              <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                Backend
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="flex items-center gap-x-3 text-base font-medium leading-[1.5] text-[#000000]">
                  Spring Boot
                </span>
                <span className="flex items-center gap-x-3 text-base font-medium leading-[1.5] text-[#000000]">
                  <span className="text-[#c4c0b8]">/</span>
                  Java
                </span>
                <span className="flex items-center gap-x-3 text-base font-medium leading-[1.5] text-[#000000]">
                  <span className="text-[#c4c0b8]">/</span>
                  MySQL
                </span>
              </div>
            </div>

            <div className="grid gap-3 border-t border-[#c4c0b8] py-5 md:grid-cols-[170px_1fr] md:items-baseline md:gap-8">
              <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                Frontend
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="flex items-center gap-x-3 text-base font-medium leading-[1.5] text-[#000000]">
                  Next.js
                </span>
                <span className="flex items-center gap-x-3 text-base font-medium leading-[1.5] text-[#000000]">
                  <span className="text-[#c4c0b8]">/</span>
                  TypeScript
                </span>
              </div>
            </div>

            <div className="grid gap-3 border-t border-[#c4c0b8] py-5 md:grid-cols-[170px_1fr] md:items-baseline md:gap-8">
              <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                Scripting
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="flex items-center gap-x-3 text-base font-medium leading-[1.5] text-[#000000]">
                  Python
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="profile" className="py-[88px]">
          <div className="border-b-[2px] border-[#0c0c0c] pb-4">
            <h3 className="text-[20px] font-medium leading-[1.4] tracking-normal text-[#000000]">
              Profile
            </h3>
          </div>

          <div className="border-b border-[#c4c0b8]">
            <div className="grid gap-2 py-5 md:grid-cols-[160px_1fr] md:items-baseline">
              <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                Education
              </p>
              <div>
                <p className="text-base font-medium leading-[1.5] text-[#000000]">
                  순천향대학교 사물인터넷학과
                </p>
                <p className="mt-1 text-xs font-normal leading-[1.33] text-[#737373]">
                  졸업예정 · 2020.03 — 2026.08 · 평점 4.22 / 4.5
                </p>
              </div>
            </div>

            <div className="grid gap-2 border-t border-[#c4c0b8] py-5 md:grid-cols-[160px_1fr] md:items-baseline">
              <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                Publication
              </p>
              <div>
                <p className="text-base font-medium leading-[1.5] text-[#000000]">
                  KCC2025 학부생 논문 게재
                </p>
                <p className="mt-1 text-xs font-normal leading-[1.33] text-[#737373]">
                  한국컴퓨터종합학술대회
                </p>
              </div>
            </div>

            <div className="grid gap-2 border-t border-[#c4c0b8] py-5 md:grid-cols-[160px_1fr] md:items-baseline">
              <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                Language
              </p>
              <div>
                <p className="text-base font-medium leading-[1.5] text-[#000000]">
                  TOEIC 810
                </p>
                <p className="mt-1 text-xs font-normal leading-[1.33] text-[#737373]">
                  2025.11 취득
                </p>
              </div>
            </div>

            <div className="grid gap-2 border-t border-[#c4c0b8] py-5 md:grid-cols-[160px_1fr] md:items-baseline">
              <p className="text-xs font-normal leading-[1.33] text-[#737373]">
                Military
              </p>
              <div>
                <p className="text-base font-medium leading-[1.5] text-[#000000]">
                  육군 병장 만기 전역
                </p>
                <p className="mt-1 text-xs font-normal leading-[1.33] text-[#737373]">
                  MW 통신병 · 2022.05 — 2023.11
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-[88px]">
          <div className="border-b-[2px] border-[#0c0c0c] pb-4">
            <h3 className="text-[20px] font-medium leading-[1.4] tracking-normal text-[#000000]">
              Contact
            </h3>
          </div>

          <div className="grid grid-cols-1 border-b border-[#c4c0b8] sm:grid-cols-2">
            <div className="py-5">
              <p className="mb-1.5 text-xs font-normal leading-[1.33] text-[#737373]">
                Phone
              </p>
              <a
                href="tel:010-2296-1280"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium leading-[1.43] text-[#000000] hover:underline"
              >
                010-2296-1280
              </a>
            </div>

            <div className="border-t border-[#c4c0b8] py-5 sm:border-l sm:border-t-0 sm:border-[#c4c0b8] sm:pl-5 md:border-l md:border-[#c4c0b8]">
              <p className="mb-1.5 text-xs font-normal leading-[1.33] text-[#737373]">
                Email
              </p>
              <a
                href="mailto:woojin2296@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium leading-[1.43] text-[#000000] hover:underline"
              >
                woojin2296@gmail.com
              </a>
            </div>

            <div className="border-t border-[#c4c0b8] py-5">
              <p className="mb-1.5 text-xs font-normal leading-[1.33] text-[#737373]">
                GitHub
              </p>
              <a
                href="https://github.com/woojin2296"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium leading-[1.43] text-[#000000] hover:underline"
              >
                github.com/woojin2296
              </a>
            </div>

            <div className="border-t border-[#c4c0b8] py-5 sm:border-l sm:border-[#c4c0b8] sm:pl-5">
              <p className="mb-1.5 text-xs font-normal leading-[1.33] text-[#737373]">
                Tech Blog
              </p>
              <a
                href="https://velog.io/@talking_tomato"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium leading-[1.43] text-[#000000] hover:underline"
              >
                velog.io/@talking_tomato
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-[720px] px-6 sm:px-8">
        <div className="py-8 text-center">
          <div className="mb-4 flex justify-center gap-8">
            <a
              href="mailto:woojin2296@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-normal leading-[1.33] text-[#737373] transition-colors hover:text-[#000000]"
            >
              Email
            </a>
            <a
              href="https://github.com/woojin2296"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-normal leading-[1.33] text-[#737373] transition-colors hover:text-[#000000]"
            >
              GitHub
            </a>
            <a
              href="https://velog.io/@talking_tomato"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-normal leading-[1.33] text-[#737373] transition-colors hover:text-[#000000]"
            >
              Blog
            </a>
          </div>
          <p className="text-xs font-normal leading-[1.33] text-[#a3a3a3]">
            &copy; 2026 임우진 (Woojin Lim) &mdash; All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
