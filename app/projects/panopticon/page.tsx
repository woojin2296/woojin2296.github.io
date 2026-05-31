import { ProjectFigure as DiagramFigure } from "@/app/_components/project/project-figure";
import { ProjectHero } from "@/app/_components/project/project-hero";
import { ProjectPageLayout } from "@/app/_components/project/project-page-layout";
import { SectionHeading } from "@/app/_components/common/section-heading";
import { SkillIcon } from "@/app/_components/common/skill-icon";

export const metadata = {
  title: "판옵티콘(Panopticon) - 연구실 실험 데이터 수집 관제 및 이상 알림 시스템",
  description: "판옵티콘(Panopticon) 프로젝트 소개 페이지",
};

const projectSectionLinks = [
  { id: "overview", label: "프로젝트 개요" },
  { id: "role", label: "역할" },
  { id: "skills", label: "기술 스택" },
  { id: "monitoring-system", label: "데이터 수집 파이프라인 관제 시스템 개발" },
  { id: "monitoring-architecture", label: "확장성을 고려한 모듈 아키텍처 설계" },
  { id: "realtime-delivery", label: "TCP Socket과 WebSocket을 사용한 상태 이벤트 전달 구조 구현" },
  { id: "deployment-automation", label: "Self-hosted Runner 기반 내부망 배포 자동화 구축" },
  { id: "retrospective", label: "회고 및 개선 방향" },
];

export default function PanopticonPage() {
  return (
    <ProjectPageLayout sectionLinks={projectSectionLinks}>
        <ProjectHero
          eyebrow="Project No.2"
          title="판옵티콘(Panopticon)"
          description="연구실 실험 데이터 수집 파이프라인 관제 및 이상 알림 시스템 개발"
          meta={[
            {
              label: "Period",
              value: (
                <>
                  2024.07 ~ 2026.02 <br />
                  (1년 8개월 - 개발 및 운영)
                </>
              ),
            },
            {
              label: "Position",
              value: (
                <>
                  순천향대학교 UBICOMP LAB <br />
                  학부연구생
                </>
              ),
            },
            {
              label: "Role",
              value: (
                <>
                  Team Lead <br />
                  Full Stack Developer
                </>
              ),
            },
          ]}
        />

        <section id="overview" className="scroll-mt-12 pt-32">
          <SectionHeading>프로젝트 개요</SectionHeading>
          <div className="grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"순천향대학교 UBICOMP LAB의 연구실 실험 데이터 수집 파이프라인을 위한 "}
              <strong className="font-medium text-black">
                {"실시간 관제 및 이상 알림 시스템"}
              </strong>
              {"입니다. 기존 환경에서는 수집이 멈추거나 데이터 품질에 문제가 생겨도 직접 데이터를 열람하기 전까지 이상 여부를 확인하기 어려웠고, 실제로 "}
              <strong className="font-medium text-black">
                {"데이터 수집 중단을 3일간 인지하지 못한 사례"}
              </strong>
              {"가 있었습니다. 이 문제를 해결하기 위해 서버 응답 상태, 마지막 수집 시각, 데이터 품질을 기준으로 "}
              <strong className="font-medium text-black">
                {"장애 여부를 자동 감지"}
              </strong>
              {"하도록 했습니다. 감지된 상태는 통합 대시보드와 실시간 알림을 통해 확인할 수 있도록 구성했습니다. 개발 이후 졸업 전까지 "}
              <strong className="font-medium text-black">
                {"약 1년 8개월간 연구 과제 환경에서 실제 운영"}
              </strong>
              {"했으며, "}
              <strong className="font-medium text-black">
                {"현재도 연구실 실험 데이터 수집 환경에서 계속 운영"}
              </strong>
              {"되고 있습니다."}
            </p>
          </div>
        </section>

        <section id="role" className="scroll-mt-12 pt-24">
          <SectionHeading>역할</SectionHeading>
          <div className="grid gap-5">
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                <strong className="font-medium text-black">
                  {"팀 리드"}
                </strong>
                {"로서 요구사항 정리, 기능 범위 정의, 전체 시스템 아키텍처 설계"}
              </li>
              <li>
                {"데이터 수집·조회·장애 상태 흐름을 고려한 "}
                <strong className="font-medium text-black">
                  {"DB 스키마 설계"}
                </strong>
                {" 및 "}
                <strong className="font-medium text-black">
                  {"Spring Boot API 구현"}
                </strong>
              </li>
              <li>
                {"장치 상태, 최근 수집 시각, 센서 데이터를 한 화면에서 확인하는 "}
                <strong className="font-medium text-black">
                  {"관제 UI 설계"}
                </strong>
                {" 및 "}
                <strong className="font-medium text-black">
                  {"Next.js 프론트엔드 구현"}
                </strong>
              </li>
              <li>
                <strong className="font-medium text-black">
                  {"self-hosted runner 기반 CI/CD 파이프라인"}
                </strong>
                {" 구축 및 Docker 기반 배포 환경 구성"}
              </li>
            </ul>
          </div>
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

        <section id="monitoring-system" className="scroll-mt-12 pt-24">
          <SectionHeading>데이터 수집 파이프라인 관제 시스템 개발</SectionHeading>
          <div className="grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"서버와 데이터베이스의 응답 상태, 센서 데이터 수집 상태, 장애 이력을 "}
              <strong className="font-medium text-black">
                {"대시보드에서 통합적으로 확인"}
              </strong>
              {"할 수 있도록 구성했습니다. 데이터 확인 과정도 "}
              <strong className="font-medium text-black">
                {"DB 직접 접근"}
              </strong>
              {"에 의존하지 않도록 바꿨습니다. 운영자는 화면에서 실시간 데이터를 확인하고, 필요한 기간을 선택해 데이터를 조회한 뒤 CSV로 출력할 수 있습니다. 감지된 이상 상태는 Spring Boot 백엔드에 저장하고, 대시보드에 반영하는 동시에 "}
              <strong className="font-medium text-black">
                {"이상 발생 시 Slack으로 알림"}
              </strong>
              {"을 전송하도록 연결했습니다."}
            </p>
            {/* TODO: Hide the carousel fade once the user scrolls to the end. */}
            <div
              className="-mx-5 overflow-x-auto overflow-y-hidden px-5 pb-1 [scrollbar-width:none] [-webkit-mask-image:linear-gradient(to_right,black_calc(100%_-_56px),transparent)] [-webkit-overflow-scrolling:touch] [mask-image:linear-gradient(to_right,black_calc(100%_-_56px),transparent)] sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
              aria-label="판옵티콘 주요 화면"
            >
              <div className="flex snap-x snap-mandatory gap-5">
                <div className="w-[82vw] max-w-[381px] flex-none snap-start sm:w-[74vw] md:w-[381px]">
                  <DiagramFigure
                    src="/projects/panopticon/panopticon-dashboard-overview.png"
                    alt="리소스 상태와 장애 이력을 확인하는 대시보드 화면"
                    width={1920}
                    height={1080}
                    caption="리소스 상태와 장애 이력을 확인하는 대시보드 화면"
                  />
                </div>
                <div className="w-[82vw] max-w-[381px] flex-none snap-start sm:w-[74vw] md:w-[381px]">
                  <DiagramFigure
                    src="/projects/panopticon/panopticon-realtime-monitoring.png"
                    alt="실시간 데이터 수집 상태를 확인하는 관제 대시보드 화면"
                    width={1920}
                    height={1080}
                    caption="실시간 데이터 수집 상태를 확인하는 관제 대시보드 화면"
                  />
                </div>
                <div className="w-[82vw] max-w-[381px] flex-none snap-start sm:w-[74vw] md:w-[381px]">
                  <DiagramFigure
                    src="/projects/panopticon/panopticon-period-data-export.png"
                    alt="기간별 데이터 조회와 CSV 출력을 위한 상세 화면"
                    width={1920}
                    height={1080}
                    caption="기간별 데이터 조회와 CSV 출력을 위한 상세 화면"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="monitoring-architecture" className="scroll-mt-12 pt-24">
          <SectionHeading>확장성을 고려한 모듈 아키텍처 설계</SectionHeading>
          <div className="grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"Watchdog의 "}
              <strong className="font-medium text-black">
                {"감지 로직"}
              </strong>
              {"과 Notification의 "}
              <strong className="font-medium text-black">
                {"알림 전송 로직"}
              </strong>
              {"을 분리했습니다. 감지 대상이 늘어나더라도 해당 대상의 "}
              <strong className="font-medium text-black">
                {"checker 모듈"}
              </strong>
              {"을 추가하는 방식으로 쉽게 확장할 수 있도록 구조를 잡았습니다. Slack 외의 알림 채널이 필요하면 "}
              <strong className="font-medium text-black">
                {"notifier 모듈"}
              </strong>
              {"을 추가하는 구조로 설계했습니다. 백엔드는 Watchdog이 보낸 감지 결과를 저장하고, 프론트엔드는 저장된 상태 이벤트를 조회하거나 WebSocket으로 전달받아 화면을 갱신합니다."}
            </p>
            <DiagramFigure
              src="/projects/panopticon/panopticon-system-architecture.jpg"
              alt="역할별 모듈로 분리한 판옵티콘 전체 아키텍처"
              width={4879}
              height={3279}
              figureClassName="px-8"
              caption="역할별 모듈로 분리한 판옵티콘 전체 아키텍처"
            />
          </div>
        </section>

        <section id="realtime-delivery" className="scroll-mt-12 pt-24">
          <SectionHeading>TCP Socket과 WebSocket을 사용한 상태 이벤트 전달 구조 구현</SectionHeading>
          <div className="grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"Watchdog은 각 감지 대상에 맞는 checker 전략을 실행하고 이상 상태를 판단합니다. 이상 상태가 확인되면 Watchdog은 감지 결과를 "}
              <strong className="font-medium text-black">
                {"TCP 기반 소켓 통신"}
              </strong>
              {"으로 Spring Boot 백엔드에 전달합니다. 백엔드는 감지 결과를 상태 이벤트로 저장한 뒤 "}
              <strong className="font-medium text-black">
                {"WebSocket"}
              </strong>
              {" 이벤트로 변환해 Next.js 프론트엔드에 전달합니다. Slack 알림도 같은 상태 이벤트를 기준으로 전송되도록 연동했습니다."}
            </p>
            <DiagramFigure
              src="/projects/panopticon/panopticon-event-architecture.jpg"
              alt="Watchdog 상태 이벤트 전파 구조"
              width={7339}
              height={2179}
              figureClassName="px-8"
              caption="Watchdog 상태 이벤트 전파 구조"
            />
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <strong className="font-medium text-black">
                {"감지 정책"}
              </strong>
              {"은 서버 응답 상태, 헬스체크 결과, 마지막 수집 시각을 조합해 판단하도록 구성했습니다. 서버 생존 여부는 "}
              <strong className="font-medium text-black">
                {"10초마다 ping 명령"}
              </strong>
              {"으로 확인했고, 데이터베이스 상태는 헬스체크 엔드포인트에 "}
              <strong className="font-medium text-black">
                {"10초마다 GET 요청"}
              </strong>
              {"을 보내 확인했습니다. 데이터 수집 파이프라인은 장치별 마지막 수집 시각을 확인하고, "}
              <strong className="font-medium text-black">
                {"1분 이상 새 데이터가 들어오지 않으면"}
              </strong>
              {" 수집 지연으로 판단했습니다. 이렇게 세 가지 정보를 함께 확인해 단일 응답 실패와 실제 장애를 구분하고, 같은 장애에 대해 중복 알림이 전송되지 않도록 구성했습니다."}
            </p>
          </div>
        </section>

        <section id="deployment-automation" className="scroll-mt-12 pt-24">
          <SectionHeading>Self-hosted Runner 기반 내부망 배포 자동화 구축</SectionHeading>
          <div className="grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"서버가 "}
              <strong className="font-medium text-black">
                {"학교 내부망"}
              </strong>
              {"에 있어 외부에서 SSH로 접속하는 배포 파이프라인을 사용할 수 없었습니다. 내부망 서버에 "}
              <strong className="font-medium text-black">
                {"self-hosted runner"}
              </strong>
              {"를 설치하고, GitHub Actions job이 해당 runner에서 실행되도록 구성했습니다. GitHub Actions는 내부망 runner에 job을 전달하고, runner가 서버 안에서 소스 갱신, "}
              <strong className="font-medium text-black">
                {"Docker 이미지 빌드"}
              </strong>
              {", "}
              <strong className="font-medium text-black">
                {"Docker Compose 기반 컨테이너 재배포"}
              </strong>
              {"를 순서대로 수행하도록 구성했습니다."}
            </p>
            <DiagramFigure
              src="/projects/panopticon/panopticon-ci-cd.jpg"
              alt="self-hosted runner를 사용한 CI/CD 시퀀스 다이어그램"
              width={4765}
              height={3357}
              figureClassName="px-8"
              caption="self-hosted runner를 사용한 CI/CD 시퀀스 다이어그램"
            />
          </div>
        </section>

        <section id="retrospective" className="scroll-mt-12 pt-24">
          <SectionHeading>회고 및 개선 방향</SectionHeading>
          <div className="grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"시스템 구축 이후 사용률이 높아 보람찼던 프로젝트였습니다. 특히 실시간 데이터 그래프와 알림 시스템이 연구실 운영 과정에서 유용하게 사용되었습니다. 운영하면서 감지 대상과 알림 채널을 분리해 둔 점도 유지보수에 도움이 됐습니다. 새 서버를 감시하거나 Slack 외의 알림 방식을 붙일 때 Watchdog 전체를 수정하지 않고 모듈을 추가하는 방식으로 대응할 수 있었습니다. 반대로 Watchdog과 백엔드 사이를 "}
              <strong className="font-medium text-black">
                {"TCP Socket"}
              </strong>
              {"으로 직접 연결한 구조는 네트워크 하위 계층을 직접 다루는 방식이라 신경 써야 할 부분이 많았습니다. 기존에 만들어진 코드가 있어 그대로 사용했지만, 다시 설계한다면 Watchdog의 감지 결과 전달은 "}
              <strong className="font-medium text-black">
                {"HTTP/Webhook"}
              </strong>
              {" 기반 방식을 사용하거나, 프론트엔드 단방향 상태 갱신도 WebSocket 대신 "}
              <strong className="font-medium text-black">
                {"SSE"}
              </strong>
              {" 등의 기술을 사용할 것 같습니다."}
            </p>
          </div>
        </section>

    </ProjectPageLayout>
  );
}
