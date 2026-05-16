import { BackToProjectsLink } from "@/app/_components/back-to-projects-link";
import { ExpandableImage } from "@/app/_components/expandable-image";
import { ProjectBottomNavigation } from "@/app/_components/project-bottom-navigation";
import { ProjectSectionNavigation } from "@/app/_components/project-section-navigation";
import { SectionHeading } from "@/app/_components/section-heading";
import { SkillIcon } from "@/app/_components/skill-icon";
import { Check } from "lucide-react";

export const metadata = {
  title: "판옵티콘(Panopticon) - AI 데이터 수집 관제 및 이상 감지 시스템",
  description: "판옵티콘(Panopticon) 프로젝트 소개 페이지",
};

export const projectInfo = {
  link: "/projects/panopticon/",
  title: "판옵티콘(Panopticon) - AI 데이터 수집 관제 및 이상 감지 시스템",
  titleProject: "판옵티콘 AI 데이터 수집 관제 시스템",
  affiliation: "순천향대학교 UBICOMP LAB",
  position: "학부연구생",
  period: "2024.07 ~ 2026.02",
  description:
    "연구실 AI 훈련용 실험 데이터 수집 파이프라인의 실시간 관제 및 이상 알림 시스템",
  summary: [
    "수집 상태, 장애 여부, 데이터 품질을 한 화면에서 추적하는 관제 구조 설계",
    "10초 polling과 1분 수집 주기를 기준으로 서버/API/데이터 수집 상태 감지",
    "Watchdog 감지 결과를 WebSocket과 Slack notifier로 전달하는 실시간 관제 흐름 구현",
    "checker/notifier 분리로 감시 대상과 알림 채널 확장 가능하게 설계",
  ],
  techStack: [
    { name: "Next.js", primary: true, summary: true },
    { name: "Spring Boot", primary: true, summary: true },
    { name: "MySQL", primary: true, summary: true },
    { name: "Docker Compose", primary: false, summary: true },
    { name: "GitHub Actions", primary: false, summary: true },
    { name: "Self-hosted Runner", primary: false, summary: true },
  ],
};

const projectSectionLinks = [
  { id: "overview", label: "프로젝트 개요" },
  { id: "role", label: "역할" },
  { id: "skills", label: "기술 스택" },
  { id: "monitoring-architecture", label: "아키텍처 설계" },
  { id: "realtime-delivery", label: "실시간 감지/전달" },
  { id: "dashboard-experience", label: "관제 화면" },
  { id: "report-automation", label: "리포트 자동화" },
  { id: "deployment-automation", label: "배포 자동화" },
  { id: "retrospective", label: "회고" },
];

function DiagramFigure({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
}: {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="grid gap-3">
      <ExpandableImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        wrapperClassName="block w-full"
        className="h-auto w-full object-contain"
      />
      <figcaption className="text-sm font-normal leading-relaxed tracking-normal text-[#737373]">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function PanopticonPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-[760px] px-5 pt-10 pb-28 sm:px-6">
        <BackToProjectsLink />
        <ProjectSectionNavigation links={projectSectionLinks} />

        <header className="flex flex-col gap-8 mt-16 pt-10 text-center">
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.22em] text-[#737373]">
              Project No.2
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.12] text-balance">
              판옵티콘(Panopticon)
            </h1>
            <p className="text-base leading-relaxed text-[#737373]">
              연구실 실험 데이터 수집 파이프라인의 실시간 관제 및
              이상 알림 시스템 개발 및 운영
            </p>
          </div>

          <section className="mt-8 grid grid-cols-3 items-stretch">
            <div className="grid grid-rows-[auto_1fr]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                Period
              </p>
              <p className="mt-3 flex min-h-10 items-center justify-center text-sm font-medium text-black">
                2024.07 ~ 2026.02 <br /> (1년 8개월)
              </p>
            </div>
            <div className="relative grid grid-rows-[auto_1fr]">
              <span
                className="absolute bottom-4 left-0 top-4 w-px bg-[#e5e5e5]"
                aria-hidden="true"
              />
              <span
                className="absolute bottom-4 right-0 top-4 w-px bg-[#e5e5e5]"
                aria-hidden="true"
              />
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                Position
              </p>
              <p className="mt-3 flex min-h-10 items-center justify-center text-sm font-medium text-black">
                순천향대학교 UBICOMP LAB <br /> 학부연구생
              </p>
            </div>
            <div className="grid grid-rows-[auto_1fr]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                Role
              </p>
              <p className="mt-3 flex min-h-10 items-center justify-center text-sm font-medium text-black">
                Team Lead <br /> Full Stack Developer
              </p>
            </div>
          </section>
        </header>

        <section id="overview" className="scroll-mt-12 pt-32">
          <SectionHeading>프로젝트 개요</SectionHeading>
          <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
            순천향대학교 UBICOMP LAB의 AI 데이터 수집 환경에서는 수집이
            멈추거나 데이터 품질에 문제가 생겨도 직접 데이터를 열람하기 전까지
            이상 여부를 확인하기 어려웠고, 실제로{" "}
            <strong className="font-medium text-black">
              데이터 수집 중단을 3일간 인지하지 못한 사례
            </strong>
            가{" "}
            있었습니다. 이 문제를 해결하기 위해 수집 상태, 서버 응답, 데이터
            품질 확인, 장애 알림을{" "}
            <strong className="font-medium text-black">
              하나의 관제 흐름으로 연결
            </strong>
            했고, 운영자가 수집 지연과 중단 상황을 더 빠르게 인지하고 대응할 수
            있도록 개선했습니다. 개발 이후{" "}
            <strong className="font-medium text-black">
              약 1년 8개월간 연구 과제 환경에서 실제 운영
            </strong>
            되었습니다.
          </p>
        </section>

        <section id="role" className="scroll-mt-12 pt-24">
          <SectionHeading>역할</SectionHeading>
          <ul className="mt-6 grid gap-3">
            <li className="flex gap-3 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <Check
                className="mt-1 h-4 w-4 shrink-0 text-black"
                aria-hidden="true"
              />
              <span>
                <strong className="font-medium text-black">팀 리드</strong>로서
                요구사항 정리, 기능 범위 정의, 전체 아키텍처 설계 주도
              </span>
            </li>
            <li className="flex gap-3 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <Check
                className="mt-1 h-4 w-4 shrink-0 text-black"
                aria-hidden="true"
              />
              <span>
                데이터 수집, 조회, 장애 감지 흐름을 고려한{" "}
                <strong className="font-medium text-black">DB 스키마 설계</strong>
                및 백엔드 API 개발
              </span>
            </li>
            <li className="flex gap-3 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <Check
                className="mt-1 h-4 w-4 shrink-0 text-black"
                aria-hidden="true"
              />
              <span>
                운영자가 장치 상태와 데이터 품질을 빠르게 파악할 수 있는{" "}
                <strong className="font-medium text-black">관제 UI 설계</strong>
                및 프론트엔드 구현
              </span>
            </li>
            <li className="flex gap-3 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <Check
                className="mt-1 h-4 w-4 shrink-0 text-black"
                aria-hidden="true"
              />
              <span>
                Docker 기반 배포 환경 구성 및{" "}
                <strong className="font-medium text-black">
                  CI/CD 파이프라인 구축
                </strong>
                으로 운영 배포 자동화
              </span>
            </li>
          </ul>
        </section>

        <section id="skills" className="scroll-mt-12 pt-24">
          <SectionHeading>기술 스택</SectionHeading>
          <div className="flex flex-wrap gap-2.5">
            <SkillIcon emphasized>Next.js</SkillIcon>
            <SkillIcon emphasized>Spring Boot</SkillIcon>
            <SkillIcon emphasized>MySQL</SkillIcon>
            <SkillIcon>Docker Compose</SkillIcon>
            <SkillIcon>GitHub Actions</SkillIcon>
            <SkillIcon>Self-hosted Runner</SkillIcon>
          </div>
        </section>

        <section id="monitoring-architecture" className="scroll-mt-12 pt-24">
          <SectionHeading>
            감시 대상과 알림 채널을 확장할 수 있는 구조로 분리
          </SectionHeading>
          <div className="grid gap-5">
            <div className="grid gap-3">
              <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
                기존 수집 파이프라인은 데이터 적재까지는 자동화되어 있었지만,
                이상 상태 확인은 운영자가 직접 데이터를 열람하는 방식에
                가까웠습니다. 실제로 수집이 멈춘 뒤 3일이 지나서야 문제를
                인지한 경험이 있었고, 이를 계기로 수집 상태, 서버 응답, DB/API
                상태, 데이터 품질, 알림을 하나의 관제 흐름으로 다시 묶었습니다.
              </p>
              <ul className="grid gap-2 pl-4 text-sm font-normal leading-relaxed tracking-normal text-[#737373] marker:text-[#a3a3a3]">
                <li>
                  Spring Boot API와 MySQL 스키마는{" "}
                  <strong className="font-medium text-black">
                    장치, 수집 이력, 장애 상태, 품질 지표
                  </strong>
                  를 분리해 조회 기능과 장애 판단 로직이 섞이지 않도록
                  설계했습니다.
                </li>
                <li>
                  감시 대상은{" "}
                  <strong className="font-medium text-black">
                    checker
                  </strong>
                  로, Slack 같은 알림 채널은{" "}
                  <strong className="font-medium text-black">notifier</strong>
                  로 분리해 역할을 명확히 나눴습니다.
                </li>
                <li>
                  다른 서버나 수집 장치를 추가로 감시해야 할 때는 checker 모듈을
                  추가하고, Discord 같은 다른 알림 채널이 필요할 때는 notifier
                  모듈만 추가할 수 있도록 확장 지점을 열어두었습니다. 감시
                  대상과 알림 방식이 늘어나도 기존 흐름을 크게 바꾸지 않는
                  구조를 목표로 했습니다.
                </li>
                <li>
                  Watchdog은 여러 checker의 결과를 모아 장애 후보를 판단하고,
                  감지 결과를 WebSocket, Slack 알림, 리포트 자동화 흐름으로
                  전달하는 중심 역할을 맡도록 구성했습니다.
                </li>
              </ul>
            </div>
            <DiagramFigure
              src="/projects/panopticon/panopticon-arch.webp"
              alt="판옵티콘 전체 아키텍처"
              width={2306}
              height={1734}
              caption="감시 대상, 장애 판단, 실시간 전달, 알림, 리포트 자동화 흐름을 분리해 확장할 수 있도록 설계한 전체 아키텍처입니다."
            />
          </div>
        </section>

        <section id="realtime-delivery" className="scroll-mt-12 pt-24">
          <SectionHeading>
            Polling으로 감지하고 WebSocket으로 즉시 전달
          </SectionHeading>
          <div className="grid gap-5">
            <div className="grid gap-3">
              <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
                아키텍처를 나눈 뒤에는 어떤 상태를 어떤 주기로 확인할지와 감지
                결과를 어떻게 운영자에게 전달할지가 핵심이었습니다. 외부
                이벤트를 직접 받을 수 있는 구조가 아니었기 때문에 polling으로
                상태를 확인하고, 상태 변화는 WebSocket과 알림 채널로 전달하도록
                구성했습니다.
              </p>
              <ul className="grid gap-2 pl-4 text-sm font-normal leading-relaxed tracking-normal text-[#737373] marker:text-[#a3a3a3]">
                <li>
                  장치별 마지막 수집 시각을 기준으로{" "}
                  <strong className="font-medium text-black">
                    1분 수집 주기 준수 여부
                  </strong>
                  를 판단해 수집 지연과 중단을 감지했습니다.
                </li>
                <li>
                  서버 생존 여부는{" "}
                  <strong className="font-medium text-black">
                    10초마다 ping 명령
                  </strong>
                  으로 확인하고, 응답 실패를 장애 후보로 분류했습니다.
                </li>
                <li>
                  데이터베이스 상태는 DB 조회를 수행하는 health-check endpoint에{" "}
                  <strong className="font-medium text-black">
                    10초마다 GET 요청
                  </strong>
                  을 보내 확인했습니다.
                </li>
                <li>
                  단일 응답 실패만으로 장애를 확정하지 않고, 서버 응답 상태,
                  DB 조회 결과, 마지막 수집 시각을 함께 보고 실제 수집 중단과
                  일시적 지연을 구분했습니다.
                </li>
                <li>
                  Watchdog에서 감지한 상태 변화는 Spring Boot의 상태 이벤트로
                  정리한 뒤 WebSocket으로 전달해, 프론트엔드가{" "}
                  <strong className="font-medium text-black">
                    새로고침 없이
                  </strong>{" "}
                  현재 상태를 갱신할 수 있게 했습니다.
                </li>
                <li>
                  Slack 알림은 WebSocket 전달과 별도의 notifier 흐름으로 두어,
                  실시간 화면 반영과 외부 알림이 서로 영향을 주지 않도록
                  분리했습니다.
                </li>
              </ul>
            </div>
            <DiagramFigure
              src="/projects/panopticon/panopticon-monitoring-flow.svg"
              alt="판옵티콘 polling 기반 감지 및 WebSocket 실시간 전달 흐름"
              caption="Watchdog에서 감지한 상태 변화를 WebSocket과 알림 채널로 전달하는 흐름입니다."
            />
          </div>
        </section>

        <section id="dashboard-experience" className="scroll-mt-12 pt-24">
          <SectionHeading>
            운영자가 한 화면에서 상태를 확인하는 관제 화면 구성
          </SectionHeading>
          <div className="grid gap-5">
            <div className="grid gap-3">
              <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
                장치 상태와 서버 로그, 데이터 조회 화면이 흩어져 있으면 이상
                원인을 찾는 시간이 길어졌습니다. 그래서 운영자가 한 화면에서
                수집 상태, 장애 여부, 데이터 품질을 함께 확인할 수 있도록
                대시보드와 API 구조를 잡았습니다.
              </p>
              <ul className="grid gap-2 pl-4 text-sm font-normal leading-relaxed tracking-normal text-[#737373] marker:text-[#a3a3a3]">
                <li>
                  Next.js 화면에서 장치 상태, 최근 수집 시각, 센서별 수집 데이터,
                  기간별 조회 결과를 같은 맥락으로 볼 수 있도록 구성했습니다.
                </li>
                <li>
                  기간 지정 조회와 CSV 내보내기 흐름을 대시보드 안에 포함해,
                  운영자가 이상 패턴을 확인한 뒤 데이터를 바로 활용할 수 있도록
                  했습니다.
                </li>
                <li>
                  최근 1주일 데이터와 기간별 데이터를 조회할 수 있게 해, 수집
                  중단뿐 아니라 데이터 추세와 이상 패턴도 화면에서 확인할 수
                  있도록 했습니다.
                </li>
                <li>
                  장애 감지 결과와 수집 데이터를 같은 화면 흐름에 배치해,
                  상태 확인 후 원인 데이터까지 이어서 확인할 수 있도록 했습니다.
                </li>
              </ul>
            </div>
            <DiagramFigure
              src="/projects/panopticon/panopticon-summary.webp"
              alt="판옵티콘 대시보드 및 데이터 조회 화면"
              width={1920}
              height={1080}
              caption="수집 상태 대시보드와 기간별 데이터 조회 화면입니다. 장애 감지 결과와 수집 데이터를 운영자가 같은 흐름에서 확인할 수 있도록 구성했습니다."
            />
          </div>
        </section>

        <section id="report-automation" className="scroll-mt-12 pt-24">
          <SectionHeading>
            반복 품질 점검을 줄이기 위한 리포트 자동화
          </SectionHeading>
          <div className="grid gap-5">
            <div className="grid gap-3">
              <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
                운영 중에는 데이터가 들어오는지뿐 아니라 품질이 괜찮은지도 계속
                봐야 했습니다. 결측치, 분산, 수집량을 기준으로 리포트를 만들고,
                반복 확인을 운영 기록으로 남기도록 했습니다. 이를 통해 매번
                데이터를 직접 열람해 품질을 확인하던 작업을 정기 리포트 흐름으로
                옮겼습니다.
              </p>
              <ul className="grid gap-2 pl-4 text-sm font-normal leading-relaxed tracking-normal text-[#737373] marker:text-[#a3a3a3]">
                <li>
                  결측치, 데이터 분산, 기간별 수집량을 품질 지표로 정의하고,
                  기준 범위를 벗어나는 데이터를 이상 후보로 분류했습니다.
                </li>
                <li>
                  일간/주간 리포트 생성 및 발송 흐름을 자동화해{" "}
                  <strong className="font-medium text-black">
                    수집 상태와 품질 변화를 누적 기록
                  </strong>
                  으로 확인할 수 있게 했습니다.
                </li>
              </ul>
            </div>
            <DiagramFigure
              src="/projects/panopticon/panopticon-report-flow.svg"
              alt="판옵티콘 데이터 품질 리포트 생성 흐름"
              caption="품질 지표를 이상 판별과 정기 리포트로 연결해 반복 점검의 부담을 줄였습니다."
            />
          </div>
        </section>

        <section id="deployment-automation" className="scroll-mt-12 pt-24">
          <SectionHeading>
            내부망 제약을 고려한 배포 자동화 구성
          </SectionHeading>
          <div className="grid gap-5">
            <div className="grid gap-3">
              <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
                서버가 내부망에 있어 외부에서 SSH로 접근하는 방식이 맞지
                않았습니다. GitHub Actions와 self-hosted runner를 연결해 내부
                서버가 직접 빌드와 배포를 수행하도록 구성하고, 애플리케이션은
                Docker Compose 기반으로 실행 환경을 통일했습니다.
              </p>
              <ul className="grid gap-2 pl-4 text-sm font-normal leading-relaxed tracking-normal text-[#737373] marker:text-[#a3a3a3]">
                <li>
                  GitHub Actions의 배포 작업을 내부망 서버에 설치한{" "}
                  <strong className="font-medium text-black">
                    self-hosted runner
                  </strong>
                  에서 실행하도록 구성했습니다.
                </li>
                <li>
                  애플리케이션은 Docker Compose로 실행해 서버 환경 차이에 따른
                  배포 문제를 줄이고, 컨테이너 단위로 재시작할 수 있게 했습니다.
                </li>
                <li>
                  빌드와 컨테이너 배포 과정을 자동화해 수동 배포를 줄이고,
                  제한된 내부망 환경에서도 반복 가능한 배포 흐름을 만들었습니다.
                </li>
              </ul>
            </div>
            <DiagramFigure
              src="/projects/panopticon/panopticon-deploy-flow.svg"
              alt="판옵티콘 내부망 self-hosted runner 배포 흐름"
              caption="외부에서 서버로 밀어 넣는 방식 대신, 내부 서버가 runner를 통해 배포를 실행하는 흐름입니다."
            />
          </div>
        </section>

        <section id="retrospective" className="scroll-mt-12 pt-24">
          <SectionHeading>회고 및 개선 방향</SectionHeading>
          <div className="mt-6 grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              이 프로젝트를 진행하면서 단순히 화면을 만드는 것보다, 운영자가
              놓치면 안 되는 상태를 먼저 정의하는 일이 중요하다는 것을 배웠습니다.
              수집 중단을 늦게 발견한 경험을 기준으로 감시 지표를 정리하고,
              감지와 전달, 알림을 하나의 운영 흐름으로 연결했습니다.
            </p>
            <ul className="grid gap-2 pl-4 text-sm font-normal leading-relaxed tracking-normal text-[#737373] marker:text-[#a3a3a3]">
              <li>
                감시 대상이 많아질 경우 polling 주기와 요청 부하를 더 세밀하게
                조정할 필요가 있습니다.
              </li>
              <li>
                장애 심각도 분류, 중복 알림 방지, 장애 이력 분석 기능을 추가하면
                운영 효율을 더 높일 수 있습니다.
              </li>
              <li>
                현재는 상태 감지와 알림에 초점이 맞춰져 있어, 이후에는 장애 원인
                분석과 복구 가이드까지 연결하는 방향으로 확장할 수 있습니다.
              </li>
            </ul>
          </div>
        </section>

        <ProjectBottomNavigation />
      </main>
    </div>
  );
}
