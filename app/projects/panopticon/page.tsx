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
    "10초 폴링과 1분 수집 주기를 기준으로 서버/데이터베이스/데이터 수집 상태 감지",
    "Watchdog 감지 결과를 백엔드, 프론트엔드, Slackbot 알림으로 연결하는 관제 흐름 설계",
    "checker/notifier 분리로 감시 대상과 알림 채널을 확장할 수 있는 구조 설계",
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
  { id: "monitoring-architecture", label: "Pluggable Architecture 설계" },
  { id: "realtime-delivery", label: "Event-driven 상태 전파 구조 설계 및 연동" },
  {
    id: "dashboard-experience",
    label: "실시간 및 기간별 데이터 조회 기능 구현",
  },
  {
    id: "deployment-automation",
    label: "Self-hosted Runner 기반 내부망 배포 자동화",
  },
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
            품질, 장애 알림을{" "}
            <strong className="font-medium text-black">
              하나의 관제 흐름으로 연결
            </strong>
            했고, 운영자가 수집 지연과 중단 상황을 더 빠르게 인지하고 대응할 수
            있도록 개선했습니다. 개발 이후{" "}
            <strong className="font-medium text-black">
              약 1년 8개월간 연구 과제 환경에서 실제 운영
            </strong>
            하였습니다.
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
                요구사항 정리, 기능 범위 정의, 전체 시스템 아키텍처 설계 주도
              </span>
            </li>
            <li className="flex gap-3 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <Check
                className="mt-1 h-4 w-4 shrink-0 text-black"
                aria-hidden="true"
              />
              <span>
                데이터 수집, 조회, 장애 상태 흐름을 고려한{" "}
                <strong className="font-medium text-black">DB 스키마 설계</strong>{" "}
                및 Spring Boot 백엔드 API 구현
              </span>
            </li>
            <li className="flex gap-3 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <Check
                className="mt-1 h-4 w-4 shrink-0 text-black"
                aria-hidden="true"
              />
              <span>
                운영자가 장치 상태와 데이터 품질을 빠르게 파악할 수 있는{" "}
                <strong className="font-medium text-black">관제 UI 설계</strong>{" "}
                및 Next.js 프론트엔드 구현
              </span>
            </li>
            <li className="flex gap-3 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <Check
                className="mt-1 h-4 w-4 shrink-0 text-black"
                aria-hidden="true"
              />
              <span>
                <strong className="font-medium text-black">
                  self-hosted runner 기반 CI/CD 파이프라인
                </strong>{" "}
                구축 및 Docker 기반 배포 환경 구성
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
            Pluggable Architecture 설계
          </SectionHeading>
          <div className="grid gap-4">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <strong className="font-medium text-black">운영 확장성</strong>을
              고려하여{" "}
              <strong className="font-medium text-black">
                Pluggable Architecture
              </strong>{" "}
              구성으로 아키텍처를 설계했습니다.{" "}
              관제 시스템은 운영 과정에서 관제해야 하는 장치가 늘어나거나 알림
              채널이 추가될 수 있다고 판단했습니다. 이에 유연하게 대응하기 위해{" "}
              <strong className="font-medium text-black">
                감지 로직과 알림 전달 로직을 모듈 단위로 분리
              </strong>
              하고, 새로운 서버나 알림 채널이 추가될 때{" "}
              <strong className="font-medium text-black">
                필요한 모듈만 교체하거나 추가할 수 있는 구조
              </strong>
              로 구성했습니다. 전체 시스템은 백엔드, 프론트엔드, 알림 서비스,
              Watchdog 서비스의 네 영역으로 나누어{" "}
              <strong className="font-medium text-black">
                각 모듈의 책임을 명확히 분리
              </strong>
              했습니다. 새로운 감시 대상이나 알림 채널이 필요해질 때 기존 구조를
              다시 작성하지 않고, 해당 역할을 담당하는{" "}
              <strong className="font-medium text-black">
                모듈만 추가하는 방식
              </strong>
              으로 확장할 수 있도록 설계했습니다.
            </p>
            <DiagramFigure
              src="/projects/panopticon/Architecture - Panopticon Architecture.jpg"
              alt="판옵티콘 전체 아키텍처"
              width={4879}
              height={3279}
              caption="역할별 모듈로 분리한 판옵티콘 전체 아키텍처"
            />
          </div>
        </section>

        <section id="realtime-delivery" className="scroll-mt-12 pt-24">
          <SectionHeading>
            Event-driven 상태 전파 구조 설계 및 연동
          </SectionHeading>
          <div className="grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              Watchdog은 각 감지 대상에 맞는 checker 전략을 실행하여 이상
              상태를 판단하도록 구성했습니다. 이상 상태가 확인되면 Watchdog은
              감지 결과를{" "}
              <strong className="font-medium text-black">TCP socket</strong>으로
              Spring Boot 백엔드에 전달합니다. 백엔드는 이 결과를 상태
              이벤트로 정리한 뒤{" "}
              <strong className="font-medium text-black">WebSocket</strong>{" "}
              기반 이벤트로 변환해 Next.js 프론트엔드에 전달합니다. 이때 백엔드,
              프론트엔드, Slackbot이 같은 상태 이벤트를 기준으로 동작할 수 있도록
              연동 흐름을 설계하고, Spring Boot 백엔드와 Next.js 프론트엔드에서
              상태 조회와 화면 갱신 흐름을 구현했습니다.
            </p>
            <DiagramFigure
              src="/projects/panopticon/Architecture - Panopticon Event Architecture.jpg"
              alt="판옵티콘 Event-driven 상태 전파 아키텍처"
              width={7339}
              height={2179}
              caption="Watchdog 상태 이벤트 전파 구조"
            />
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <strong className="font-medium text-black">감지 정책</strong>은
              대상별 장애 신호에 맞춰 다르게 정의했습니다. 서버 생존 여부는{" "}
              <strong className="font-medium text-black">
                10초마다 ping 명령
              </strong>
              으로 확인하고, 데이터베이스 상태는 헬스체크 엔드포인트에{" "}
              <strong className="font-medium text-black">
                10초마다 GET 요청
              </strong>
              을 보내 확인했습니다. 데이터 수집 파이프라인은 장치별 마지막 수집
              시각을 기준으로{" "}
              <strong className="font-medium text-black">
                1분 수집 주기 준수 여부
              </strong>
              를 판단해 수집 지연과 중단을 감지했습니다. 단일 응답 실패만으로
              장애를 확정하지 않고, 서버 응답 상태, 헬스체크 응답 결과, 마지막
              수집 시각을 함께 보고 실제 수집 중단과 일시적 지연을 구분했습니다.
            </p>
          </div>
        </section>

        <section id="dashboard-experience" className="scroll-mt-12 pt-24">
          <SectionHeading>
            실시간 및 기간별 데이터 조회 기능 구현
          </SectionHeading>
          <div className="grid gap-5">
            <div className="grid gap-3">
              <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
                기존에는 운영자가 이상 여부를 확인하거나 데이터를 분석하려면
                직접{" "}
                <strong className="font-medium text-black">
                  데이터에 접근
                </strong>
                해야 했고, 실시간 상태 확인, 기간별 조회, CSV 출력 흐름이
                한 화면에 정리되어 있지 않았습니다. 이를 해결하기 위해 수집 상태
                확인,{" "}
                <strong className="font-medium text-black">
                  실시간 데이터 조회
                </strong>
                ,{" "}
                <strong className="font-medium text-black">기간별 조회</strong>,{" "}
                <strong className="font-medium text-black">CSV 출력</strong>
                까지 이어지는 데이터 조회 기능을 구성해 운영자가{" "}
                <strong className="font-medium text-black">
                  직접 데이터를 열람하던 불편
                </strong>
                을 줄였습니다.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <DiagramFigure
                src="/projects/panopticon/Panopticon Page 1.png"
                alt="판옵티콘 실시간 관제 대시보드 화면"
                width={3810}
                height={1998}
                caption="실시간 데이터 수집 상태를 확인하는 관제 대시보드 화면"
              />
              <DiagramFigure
                src="/projects/panopticon/Panopticon Page 2.png"
                alt="판옵티콘 기간별 데이터 조회 화면"
                width={3812}
                height={1998}
                caption="기간별 데이터 조회와 CSV 출력을 위한 상세 화면"
              />
            </div>
          </div>
        </section>

        <section id="deployment-automation" className="scroll-mt-12 pt-24">
          <SectionHeading>
            Self-hosted Runner 기반 내부망 배포 자동화
          </SectionHeading>
          <div className="grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              서버가 <strong className="font-medium text-black">학교 내부망</strong>에
              위치해{" "}
              <strong className="font-medium text-black">
                외부 SSH 기반 CI/CD 파이프라인
              </strong>
              을 활용하기 어려웠습니다. 이를 해결하기 위해 내부망 서버에{" "}
              <strong className="font-medium text-black">
                self-hosted runner
              </strong>
              를 설치하고, GitHub Actions의 배포 작업을 해당 runner에서
              실행하도록 구성했습니다. runner가{" "}
              <strong className="font-medium text-black">
                빌드, 이미지 갱신, 컨테이너 재시작 과정
              </strong>
              을 수행하게 하여 수동 배포를 줄였고, 애플리케이션 실행 환경은{" "}
              <strong className="font-medium text-black">
                Docker Compose 기반
              </strong>
              으로 통일해 제한된 내부망 환경에서도{" "}
              <strong className="font-medium text-black">
                반복 가능한 배포 흐름
              </strong>
              을 만들었습니다.
            </p>
            <DiagramFigure
              src="/projects/panopticon/Architecture - Panopticon CICD.jpg"
              alt="판옵티콘 내부망 self-hosted runner 배포 흐름"
              width={4765}
              height={3357}
              caption="self-hosted runner를 사용한 CI/CD 시퀀스 다이어그램"
            />
          </div>
        </section>

        <section id="retrospective" className="scroll-mt-12 pt-24">
          <SectionHeading>회고 및 개선 방향</SectionHeading>
          <div className="mt-6 grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              이 프로젝트를 통해 관제 시스템에서는{" "}
              <strong className="font-medium text-black">
                설계와 모듈화
              </strong>
              가 중요하다는 것을 느꼈습니다. 감시 대상, 상태 전달, 알림 흐름을
              역할별로 분리해두면 운영 중 새로운 서버나 알림 채널이 추가되어도
              구조를 크게 바꾸지 않고 확장할 수 있기 때문입니다. 다만 실제 구현
              과정에서는 아쉬운 점도 있었습니다. Watchdog과 백엔드 사이의{" "}
              <strong className="font-medium text-black">TCP socket</strong>{" "}
              방식이나 프론트엔드 갱신을 위한{" "}
              <strong className="font-medium text-black">WebSocket</strong>{" "}
              방식이 모든 상황에 가장 적합한 선택은 아니었다고 생각합니다.
              프론트엔드에 단방향 상태 갱신만 필요하다면{" "}
              <strong className="font-medium text-black">SSE</strong>가 더 단순한
              선택이 될 수 있고, Watchdog에서 백엔드로 감지 결과를 전달하는
              흐름은{" "}
              <strong className="font-medium text-black">Webhook</strong>으로
              분리하는 편이 더 명확했을 것 같습니다.
            </p>
          </div>
        </section>

        <ProjectBottomNavigation />
      </main>
    </div>
  );
}
