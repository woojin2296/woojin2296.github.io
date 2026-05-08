import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { ExpandableImage } from "@/app/_components/expandable-image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <nav className="flex justify-center gap-6 sm:gap-10 py-4 px-6 sm:px-10 border-b border-b-[#c4c0b8] border-t-[3px] border-t-[#0c0c0c] flex-wrap">
        <a
          href="#about"
          className="border-b-[1.5px] border-transparent text-[11px] uppercase tracking-[3px] text-[#0c0c0c] font-semibold hover:border-[#0c0c0c]"
        >
          About
        </a>
        <a
          href="#projects"
          className="border-b-[1.5px] border-transparent text-[11px] uppercase tracking-[3px] text-[#0c0c0c] font-semibold hover:border-[#0c0c0c]"
        >
          Projects
        </a>
        <a
          href="#experience"
          className="border-b-[1.5px] border-transparent text-[11px] uppercase tracking-[3px] text-[#0c0c0c] font-semibold hover:border-[#0c0c0c]"
        >
          Experience
        </a>
        <a
          href="#awards"
          className="border-b-[1.5px] border-transparent text-[11px] uppercase tracking-[3px] text-[#0c0c0c] font-semibold hover:border-[#0c0c0c]"
        >
          Awards
        </a>
        <a
          href="#skills"
          className="border-b-[1.5px] border-transparent text-[11px] uppercase tracking-[3px] text-[#0c0c0c] font-semibold hover:border-[#0c0c0c]"
        >
          Skills
        </a>
        <a
          href="#profile"
          className="border-b-[1.5px] border-transparent text-[11px] uppercase tracking-[3px] text-[#0c0c0c] font-semibold hover:border-[#0c0c0c]"
        >
          Profile
        </a>
        <a
          href="#contact"
          className="border-b-[1.5px] border-transparent text-[11px] uppercase tracking-[3px] text-[#0c0c0c] font-semibold hover:border-[#0c0c0c]"
        >
          Contact
        </a>
      </nav>

      <main className="max-w-[1080px] mx-auto pt-20 px-6 sm:px-10">
        <header className="flex flex-col gap-4 py-20 items-left px-6 sm:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#5a6775]">
            Portfolio &mdash; 2026
          </p>
          <h1 className="text-6xl font-bold leading-tight tracking-tight text-[#0c0c0c]">
            임우진 · Lim Woojin
          </h1>
          <p className="text-xl uppercase tracking-[0.35em] text-[#5a6775]">
            DevOps Engineer
          </p>
        </header>

        <section id="about" className="flex flex-col items-left px-6 sm:px-10">
          <section className="flex flex-col py-20 gap-4">
            <h2 className="text-3xl font-black tracking-tight text-[#0c0c0c]">
              네트워크를 좋아하는 DevOps Engineer 임우진 입니다.
            </h2>
            <p className="text-lg text-[#5a6775] leading-relaxed">
              사용자의 요청이 네트워크와 서버를 지나 데이터베이스까지 처리되는
              전체 흐름을 이해하고 설계하는 것을 좋아합니다. <br />
              계층별로 나누어진 시스템의 흐름을 따라가며, 서비스가 end-to-end로
              연결되는 구조를 이해하는 것을 중요하게 생각합니다. <br />
              이를 위해 프로젝트에서 아키텍처를 정립하고 인터페이스와 데이터
              흐름을 고려하는 것을 우선시합니다. <br />
            </p>
            <div className="relative mt-10 border-y border-[#c4c0b8] py-4">
              <div className="flex h-72 gap-4 overflow-x-auto overflow-y-hidden pr-20 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
                <ExpandableImage
                  src="/dobonglife-aws-infra-v2.webp"
                  alt="도봉라이프 AWS 인프라 아키텍처 다이어그램"
                  width={3258}
                  height={1746}
                  unoptimized
                  wrapperClassName="block h-full shrink-0"
                  className="h-full w-auto max-w-none object-contain object-top"
                />
                <ExpandableImage
                  src="/panopticon-arch.webp"
                  alt="판옵티콘 아키텍처 다이어그램"
                  width={1153}
                  height={867}
                  unoptimized
                  wrapperClassName="block h-full shrink-0"
                  className="h-full w-auto max-w-none object-contain object-top"
                />
                <ExpandableImage
                  src="/dobonglife-arch-v1.webp"
                  alt="도봉라이프 V1 아키텍처 다이어그램"
                  width={962}
                  height={1062}
                  unoptimized
                  wrapperClassName="block h-full shrink-0"
                  className="h-full w-auto max-w-none object-contain object-top"
                />
                <ExpandableImage
                  src="/dobonglife-cicd-arch-v1.webp"
                  alt="도봉라이프 V1 CI/CD 아키텍처 다이어그램"
                  width={2163}
                  height={1266}
                  unoptimized
                  wrapperClassName="block h-full shrink-0"
                  className="h-full w-auto max-w-none object-contain object-top"
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 right-0 top-4 w-20 bg-gradient-to-l from-[#f5f5f5] via-[#f5f5f5]/90 to-transparent"
              />
            </div>
          </section>

          <h2 className="text-3xl font-black leading-[1.5] tracking-tight my-8 text-[#0c0c0c]">
            개발의 전체 흐름을 보고 설계하는 것을 좋아합니다.
          </h2>
          <p className="text-lg text-[#5a6775] leading-relaxed">
            프론트엔드, 백엔드, 인프라, 네트워크, 보안, 임베디드, AI, 운영체제
            등 다양한 분야를 공부하고 프로젝트를 진행해왔습니다. <br />
            하나의 기술만 사용하는 개발자가 아니라, 전체 구조를 이해하고
            적재적소에 사용할 수 있는 개발자를 지향합니다. <br />
            다양한 계층의 흐름을 이해하고 있기 때문에, 장애 발생 시 원인을
            빠르게 추적하고 해결하는 과정에도 강점을 가지고 있습니다.
          </p>

          <h2 className="text-3xl font-black leading-[1.5] tracking-tight my-8 text-[#0c0c0c]">
            불편함을 해결하고 자동화하기 위해 개발합니다.
          </h2>
          <p className="text-lg text-[#5a6775] leading-relaxed">
            업무나 일상 속의 다양한 불편함을 개발로 풀어나가려 합니다. <br />
            직접 만들고 개선하며, 복잡한 워크플로우를 단순화하려 노력합니다.{" "}
            <br />
          </p>
        </section>

        <section id="projects" className="py-16">
          <div className="mt-8 border-b-[2px] border-[#0c0c0c] pb-4">
            <h3 className="text-lg uppercase tracking-[2.5px] text-[#0c0c0c] font-bold leading-none">
              Key Projects
            </h3>
          </div>

          <div className="flex flex-col border-b-[1px] border-b-[#c4c0b8]">
            <div className="flex flex-col">
              <Link
                href="/projects/dobonglife/"
                aria-label="도봉라이프 프로젝트 상세 보기"
                className="group grid cursor-pointer gap-6 p-7 transition-colors hover:bg-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0c0c0c] md:grid-cols-[minmax(220px,0.38fr)_1fr] md:items-start"
              >
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
                <div>
                  <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold underline-offset-4 group-hover:underline">
                      도봉라이프 (Dobong Life)
                    </h3>
                    <div className="flex shrink-0 items-center">
                      <span className="inline-flex items-center gap-1 border-b border-[#0c0c0c] pb-0.5 text-xs font-semibold text-[#0c0c0c]">
                        상세 보기
                        <ArrowUpRight
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
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
                className="group grid cursor-pointer gap-6 border-y-[1px] border-y-[#c4c0b8] p-7 transition-colors hover:bg-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0c0c0c] md:grid-cols-[minmax(220px,0.38fr)_1fr] md:items-start"
              >
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
                <div>
                  <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold underline-offset-4 group-hover:underline">
                      판옵티콘 (Panopticon)
                    </h3>
                    <div className="flex shrink-0 items-center">
                      <span className="inline-flex items-center gap-1 border-b border-[#0c0c0c] pb-0.5 text-xs font-semibold text-[#0c0c0c]">
                        상세 보기
                        <ArrowUpRight
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
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
                className="group grid cursor-pointer gap-6 p-7 transition-colors hover:bg-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0c0c0c] md:grid-cols-[minmax(220px,0.38fr)_1fr] md:items-start"
              >
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
                <div>
                  <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold underline-offset-4 group-hover:underline">
                      SCH MiniProject Submission System
                    </h3>
                    <div className="flex shrink-0 items-center">
                      <span className="inline-flex items-center gap-1 border-b border-[#0c0c0c] pb-0.5 text-xs font-semibold text-[#0c0c0c]">
                        상세 보기
                        <ArrowUpRight
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
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
          <div className="border-b-[2px] border-[#0c0c0c] pb-4">
            <h3 className="text-lg uppercase tracking-[2.5px] text-[#0c0c0c] font-bold leading-none">
              Experience
            </h3>
          </div>

          <div className="border-b border-[#c4c0b8]">
            <div className="grid gap-5 px-7 py-6 md:grid-cols-[200px_1fr] md:gap-8">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <p className="text-[15px] font-semibold leading-tight text-[#5a6775]">
                  2025.09 — 2026.02
                </p>
                <p className="text-[13px] leading-tight text-[#7a8490]">(6m)</p>
              </div>
              <div className="md:border-l md:border-[#c4c0b8] md:pl-7">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h4 className="text-[17px] font-semibold text-[#0c0c0c]">
                    (주)유머스트알엔디
                  </h4>
                  <p className="text-sm font-medium text-[#5a6775]">
                    인턴 사원
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#5a6775]">
                  도봉라이프 AWS 인프라 구축 및 운영 · X-ray 치료기기 GUI 개발
                </p>
              </div>
            </div>

            <div className="grid gap-5 border-t border-[#c4c0b8] px-7 py-6 md:grid-cols-[200px_1fr] md:gap-8">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <p className="text-[15px] font-semibold leading-tight text-[#5a6775]">
                  2024.01 — 2026.02
                </p>
                <p className="text-[13px] leading-tight text-[#7a8490]">(2y)</p>
              </div>
              <div className="md:border-l md:border-[#c4c0b8] md:pl-7">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h4 className="text-[17px] font-semibold text-[#0c0c0c]">
                    UBICOMP LAB
                  </h4>
                  <p className="text-sm font-medium text-[#5a6775]">
                    학부연구생
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#5a6775]">
                  판옵티콘 개발 · ROS 기반 PCD 수집 · KCC2025 논문 게재
                </p>
              </div>
            </div>

            <details className="group border-t border-[#c4c0b8]">
              <summary className="flex cursor-pointer list-none items-center justify-center gap-2 px-7 py-5 text-xs font-medium text-[#7a8490] transition-colors hover:text-[#5a6775] [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">그 외 경험 더보기</span>
                <span className="hidden group-open:inline">접기</span>
                <ChevronDown className="h-4 w-4 text-[#7a8490] transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-[#c4c0b8]">
                <div className="grid gap-5 px-7 py-6 md:grid-cols-[200px_1fr] md:gap-8">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <p className="text-[15px] font-semibold leading-tight text-[#5a6775]">
                      2024.01 — 2025.12
                    </p>
                  </div>
                  <div className="md:border-l md:border-[#c4c0b8] md:pl-7">
                    <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                      <h4 className="text-[17px] font-semibold text-[#0c0c0c]">
                        수업 조교 6회
                      </h4>
                      <p className="text-sm font-medium text-[#5a6775]">
                        순천향대학교
                      </p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#5a6775]">
                      IoT 플랫폼 (24-1, 25-1) · 임베디드 시스템 (24-2, 25-2) ·
                      나만의 게임만들기 (24-1) · 웹페이지 제작의 실제 (24-2)
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 border-t border-[#c4c0b8] px-7 py-6 md:grid-cols-[200px_1fr] md:gap-8">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <p className="text-[15px] font-semibold leading-tight text-[#5a6775]">
                      2024.01 — 2025.12
                    </p>
                  </div>
                  <div className="md:border-l md:border-[#c4c0b8] md:pl-7">
                    <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                      <h4 className="text-[17px] font-semibold text-[#0c0c0c]">
                        해커톤 참여 3회
                      </h4>
                      <p className="text-sm font-medium text-[#5a6775]">
                        기획 · 개발 · 발표
                      </p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#5a6775]">
                      2024 캡스톤디자인 및 AI 해커톤 · 2025 캡스톤디자인 및 AI
                      해커톤 · 2025 대한민국 해커톤
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 border-t border-[#c4c0b8] px-7 py-6 md:grid-cols-[200px_1fr] md:gap-8">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <p className="text-[15px] font-semibold leading-tight text-[#5a6775]">
                      2024.01 — 2025.12
                    </p>
                  </div>
                  <div className="md:border-l md:border-[#c4c0b8] md:pl-7">
                    <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                      <h4 className="text-[17px] font-semibold text-[#0c0c0c]">
                        멘토링 프로그램 2회
                      </h4>
                      <p className="text-sm font-medium text-[#5a6775]">멘토</p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#5a6775]">
                      2024 순천향 AI·SW 창의한마당 · 2025 SW
                      학습멘토링(머신러닝)
                    </p>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </section>

        <section id="awards" className="py-16">
          <div className="border-b-[2px] border-[#0c0c0c] pb-4">
            <h3 className="text-lg uppercase tracking-[2.5px] text-[#0c0c0c] font-bold leading-none">
              Awards
            </h3>
          </div>

          <div className="border-b border-[#c4c0b8]">
            <div className="grid gap-2 px-7 py-5 md:grid-cols-[82px_72px_minmax(220px,0.95fr)_minmax(240px,1.05fr)] md:items-baseline md:gap-6">
              <div className="flex items-baseline justify-center gap-4 text-center md:block md:-translate-x-1.5">
                <p className="text-xs text-[#5a6775]">2024.11</p>
                <p className="text-[13px] font-medium text-[#b7791f] md:hidden">
                  최우수상
                </p>
              </div>
              <p className="hidden text-center text-[13px] font-medium text-[#b7791f] md:block md:-translate-x-1.5">
                최우수상
              </p>
              <h4 className="text-[15px] font-medium leading-snug text-[#0c0c0c]">
                SW융합대학 학술제 (E-Sports 개발)
              </h4>
              <p className="text-sm leading-relaxed text-[#5a6775]">
                캐주얼 리듬게임 - 탭 스페이스 (Tab Space)
              </p>
            </div>

            <div className="grid gap-2 border-t border-[#c4c0b8] px-7 py-5 md:grid-cols-[82px_72px_minmax(220px,0.95fr)_minmax(240px,1.05fr)] md:items-baseline md:gap-6">
              <div className="flex items-baseline justify-center gap-4 text-center md:block md:-translate-x-1.5">
                <p className="text-xs text-[#5a6775]">2025.11</p>
                <p className="text-[13px] font-medium text-[#0c0c0c] md:hidden">
                  장려상
                </p>
              </div>
              <p className="hidden text-center text-[13px] font-medium text-[#0c0c0c] md:block md:-translate-x-1.5">
                장려상
              </p>
              <h4 className="text-[15px] font-medium leading-snug text-[#0c0c0c]">
                2025 SCHU AI SW Festival
              </h4>
              <p className="text-sm leading-relaxed text-[#5a6775]">
                AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)
              </p>
            </div>

            <div className="grid gap-2 border-t border-[#c4c0b8] px-7 py-5 md:grid-cols-[82px_72px_minmax(220px,0.95fr)_minmax(240px,1.05fr)] md:items-baseline md:gap-6">
              <div className="flex items-baseline justify-center gap-4 text-center md:block md:-translate-x-1.5">
                <p className="text-xs text-[#5a6775]">2025.11</p>
                <p className="text-[13px] font-medium text-[#0c0c0c] md:hidden">
                  장려상
                </p>
              </div>
              <p className="hidden text-center text-[13px] font-medium text-[#0c0c0c] md:block md:-translate-x-1.5">
                장려상
              </p>
              <h4 className="text-[15px] font-medium leading-snug text-[#0c0c0c]">
                2025 캡스톤 디자인 및 AI 해커톤
              </h4>
              <p className="text-sm leading-relaxed text-[#5a6775]">
                장소에 맞는 음악 생성 서비스 - 카라멜 (Caramel)
              </p>
            </div>

            <div className="grid gap-2 border-t border-[#c4c0b8] px-7 py-5 md:grid-cols-[82px_72px_minmax(220px,0.95fr)_minmax(240px,1.05fr)] md:items-baseline md:gap-6">
              <div className="flex items-baseline justify-center gap-4 text-center md:block md:-translate-x-1.5">
                <p className="text-xs text-[#5a6775]">2025.08</p>
                <p className="text-[13px] font-medium text-[#0c0c0c] md:hidden">
                  장려상
                </p>
              </div>
              <p className="hidden text-center text-[13px] font-medium text-[#0c0c0c] md:block md:-translate-x-1.5">
                장려상
              </p>
              <h4 className="text-[15px] font-medium leading-snug text-[#0c0c0c]">
                2025 글로벌 캡스톤디자인 경진대회
              </h4>
              <p className="text-sm leading-relaxed text-[#5a6775]">
                AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)
              </p>
            </div>

            <div className="grid gap-2 border-t border-[#c4c0b8] px-7 py-5 md:grid-cols-[82px_72px_minmax(220px,0.95fr)_minmax(240px,1.05fr)] md:items-baseline md:gap-6">
              <div className="flex items-baseline justify-center gap-4 text-center md:block md:-translate-x-1.5">
                <p className="text-xs text-[#5a6775]">2024.10</p>
                <p className="text-[13px] font-medium text-[#0c0c0c] md:hidden">
                  장려상
                </p>
              </div>
              <p className="hidden text-center text-[13px] font-medium text-[#0c0c0c] md:block md:-translate-x-1.5">
                장려상
              </p>
              <h4 className="text-[15px] font-medium leading-snug text-[#0c0c0c]">
                2024 캡스톤디자인 및 AI 해커톤
              </h4>
              <p className="text-sm leading-relaxed text-[#5a6775]">
                입법 현황 실시간 분석 시스템 - 라다온 (LawDaon)
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="py-16">
          <div className="border-b-[2px] border-[#0c0c0c] pb-4">
            <h3 className="text-lg uppercase tracking-[2.5px] text-[#0c0c0c] font-bold leading-none">
              Skills &amp; Tools
            </h3>
          </div>

          <div className="border-b border-[#c4c0b8]">
            <div className="grid gap-3 px-7 py-5 md:grid-cols-[170px_1fr] md:items-baseline md:gap-8">
              <p className="text-[11px] uppercase tracking-[2.5px] text-[#5a6775] font-semibold">
                Cloud / Infra
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="flex items-center gap-x-3 text-[15px] font-medium text-[#0c0c0c]">
                  AWS
                </span>
                <span className="flex items-center gap-x-3 text-[15px] font-medium text-[#0c0c0c]">
                  <span className="text-[#c4c0b8]">/</span>
                  Terraform
                </span>
                <span className="flex items-center gap-x-3 text-[15px] font-medium text-[#0c0c0c]">
                  <span className="text-[#c4c0b8]">/</span>
                  Docker
                </span>
                <span className="flex items-center gap-x-3 text-[15px] font-medium text-[#0c0c0c]">
                  <span className="text-[#c4c0b8]">/</span>
                  Linux
                </span>
              </div>
            </div>

            <div className="grid gap-3 border-t border-[#c4c0b8] px-7 py-5 md:grid-cols-[170px_1fr] md:items-baseline md:gap-8">
              <p className="text-[11px] uppercase tracking-[2.5px] text-[#5a6775] font-semibold">
                Delivery
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="flex items-center gap-x-3 text-[15px] font-medium text-[#0c0c0c]">
                  Git
                </span>
                <span className="flex items-center gap-x-3 text-[15px] font-medium text-[#0c0c0c]">
                  <span className="text-[#c4c0b8]">/</span>
                  GitHub Actions
                </span>
              </div>
            </div>

            <div className="grid gap-3 border-t border-[#c4c0b8] px-7 py-5 md:grid-cols-[170px_1fr] md:items-baseline md:gap-8">
              <p className="text-[11px] uppercase tracking-[2.5px] text-[#5a6775] font-semibold">
                Backend
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="flex items-center gap-x-3 text-[15px] font-medium text-[#0c0c0c]">
                  Spring Boot
                </span>
                <span className="flex items-center gap-x-3 text-[15px] font-medium text-[#0c0c0c]">
                  <span className="text-[#c4c0b8]">/</span>
                  Java
                </span>
                <span className="flex items-center gap-x-3 text-[15px] font-medium text-[#0c0c0c]">
                  <span className="text-[#c4c0b8]">/</span>
                  MySQL
                </span>
              </div>
            </div>

            <div className="grid gap-3 border-t border-[#c4c0b8] px-7 py-5 md:grid-cols-[170px_1fr] md:items-baseline md:gap-8">
              <p className="text-[11px] uppercase tracking-[2.5px] text-[#5a6775] font-semibold">
                Frontend
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="flex items-center gap-x-3 text-[15px] font-medium text-[#0c0c0c]">
                  Next.js
                </span>
                <span className="flex items-center gap-x-3 text-[15px] font-medium text-[#0c0c0c]">
                  <span className="text-[#c4c0b8]">/</span>
                  TypeScript
                </span>
              </div>
            </div>

            <div className="grid gap-3 border-t border-[#c4c0b8] px-7 py-5 md:grid-cols-[170px_1fr] md:items-baseline md:gap-8">
              <p className="text-[11px] uppercase tracking-[2.5px] text-[#5a6775] font-semibold">
                Scripting
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="flex items-center gap-x-3 text-[15px] font-medium text-[#0c0c0c]">
                  Python
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="profile" className="py-16">
          <div className="border-b-[2px] border-[#0c0c0c] pb-4">
            <h3 className="text-lg uppercase tracking-[2.5px] text-[#0c0c0c] font-bold leading-none">
              Profile
            </h3>
          </div>

          <div className="border-b border-[#c4c0b8]">
            <div className="grid gap-2 px-7 py-5 md:grid-cols-[160px_1fr] md:items-baseline">
              <p className="text-[10px] uppercase tracking-[2px] text-[#5a6775] font-semibold">
                Education
              </p>
              <div>
                <p className="text-[15px] font-medium text-[#0c0c0c]">
                  순천향대학교 사물인터넷학과
                </p>
                <p className="mt-1 text-xs text-[#5a6775]">
                  졸업예정 · 2020.03 — 2026.08 · 평점 4.22 / 4.5
                </p>
              </div>
            </div>

            <div className="grid gap-2 border-t border-[#c4c0b8] px-7 py-5 md:grid-cols-[160px_1fr] md:items-baseline">
              <p className="text-[10px] uppercase tracking-[2px] text-[#5a6775] font-semibold">
                Publication
              </p>
              <div>
                <p className="text-[15px] font-medium text-[#0c0c0c]">
                  KCC2025 학부생 논문 게재
                </p>
                <p className="mt-1 text-xs text-[#5a6775]">
                  한국컴퓨터종합학술대회
                </p>
              </div>
            </div>

            <div className="grid gap-2 border-t border-[#c4c0b8] px-7 py-5 md:grid-cols-[160px_1fr] md:items-baseline">
              <p className="text-[10px] uppercase tracking-[2px] text-[#5a6775] font-semibold">
                Language
              </p>
              <div>
                <p className="text-[15px] font-medium text-[#0c0c0c]">
                  TOEIC 810
                </p>
                <p className="mt-1 text-xs text-[#5a6775]">2025.11 취득</p>
              </div>
            </div>

            <div className="grid gap-2 border-t border-[#c4c0b8] px-7 py-5 md:grid-cols-[160px_1fr] md:items-baseline">
              <p className="text-[10px] uppercase tracking-[2px] text-[#5a6775] font-semibold">
                Military
              </p>
              <div>
                <p className="text-[15px] font-medium text-[#0c0c0c]">
                  육군 병장 만기 전역
                </p>
                <p className="mt-1 text-xs text-[#5a6775]">
                  MW 통신병 · 2022.05 — 2023.11
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="border-b-[2px] border-[#0c0c0c] pb-4">
            <h3 className="text-lg uppercase tracking-[2.5px] text-[#0c0c0c] font-bold leading-none">
              Contact
            </h3>
          </div>

          <div className="grid grid-cols-1 border-b border-[#c4c0b8] sm:grid-cols-2 md:grid-cols-4">
            <div className="px-7 py-5">
              <p className="mb-1.5 text-[10px] uppercase tracking-[2px] text-[#5a6775]">
                Phone
              </p>
              <a
                href="tel:010-2296-1280"
                target="_blank"
                rel="noreferrer"
                className="text-[15px] font-medium text-[#0c0c0c] hover:underline"
              >
                010-2296-1280
              </a>
            </div>

            <div className="border-t border-[#c4c0b8] px-7 py-5 sm:border-l sm:border-t-0 sm:border-[#c4c0b8] md:border-l md:border-[#c4c0b8]">
              <p className="mb-1.5 text-[10px] uppercase tracking-[2px] text-[#5a6775]">
                Email
              </p>
              <a
                href="mailto:woojin2296@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="text-[15px] font-medium text-[#0c0c0c] hover:underline"
              >
                woojin2296@gmail.com
              </a>
            </div>

            <div className="border-t border-[#c4c0b8] px-7 py-5 sm:border-t sm:border-[#c4c0b8] md:border-l md:border-t-0 md:border-[#c4c0b8]">
              <p className="mb-1.5 text-[10px] uppercase tracking-[2px] text-[#5a6775]">
                GitHub
              </p>
              <a
                href="https://github.com/woojin2296"
                target="_blank"
                rel="noreferrer"
                className="text-[15px] font-medium text-[#0c0c0c] hover:underline"
              >
                github.com/woojin2296
              </a>
            </div>

            <div className="border-t border-[#c4c0b8] px-7 py-5 sm:border-l sm:border-t sm:border-[#c4c0b8] md:border-l md:border-t-0 md:border-[#c4c0b8]">
              <p className="mb-1.5 text-[10px] uppercase tracking-[2px] text-[#5a6775]">
                Tech Blog
              </p>
              <a
                href="https://velog.io/@talking_tomato"
                target="_blank"
                rel="noreferrer"
                className="text-[15px] font-medium text-[#0c0c0c] hover:underline"
              >
                velog.io/@talking_tomato
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-[1080px] mx-auto px-6 sm:px-10">
        <div className="border-t border-[#c4c0b8] py-8 text-center">
          <div className="flex justify-center gap-8 mb-4">
            <a
              href="mailto:woojin2296@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] uppercase tracking-[2px] text-[#5a6775] hover:text-[#0c0c0c] transition-colors"
            >
              Email
            </a>
            <a
              href="https://github.com/woojin2296"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] uppercase tracking-[2px] text-[#5a6775] hover:text-[#0c0c0c] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://velog.io/@talking_tomato"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] uppercase tracking-[2px] text-[#5a6775] hover:text-[#0c0c0c] transition-colors"
            >
              Blog
            </a>
          </div>
          <p className="text-[11px] text-[#c4c0b8]">
            &copy; 2026 임우진 (Woojin Lim) &mdash; All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
