import { BackToProjectsLink } from "@/app/_components/back-to-projects-link";
import { ExpandableImage } from "@/app/_components/expandable-image";
import { ProjectBottomNavigation } from "@/app/_components/project-bottom-navigation";
import { ProjectSectionNavigation } from "@/app/_components/project-section-navigation";
import { SectionHeading } from "@/app/_components/section-heading";
import { SkillIcon } from "@/app/_components/skill-icon";
import { Check } from "lucide-react";

export const metadata = {
  title: "SCH MiniProject PMS | Lim Woojin Portfolio",
  description:
    "순천향대학교 사물인터넷학과 ML/DL 강의에서 사용하는 프로젝트 과제 관리 시스템",
};

export const projectInfo = {
  link: "/projects/sch-miniproject/",
  title: "SCH MiniProject PMS",
  titleProject: "SCH MiniProject PMS",
  affiliation: "순천향대학교 ML/DL 강의",
  position: "개인 프로젝트",
  period: "2025.06 ~ 2026.02",
  role: "Solo Full-stack Developer",
  description:
    "순천향대학교 사물인터넷학과 ML/DL 강의에서 사용하는 프로젝트 과제 관리 시스템",
  summary: [
    "교수님 요청을 바탕으로 실제 강의 운영에 필요한 제출 및 랭킹 시스템 개발",
    "익명 점수 랭킹으로 학생들이 프로젝트 결과를 비교할 수 있는 구조 설계",
    "실제 성적에 반영되는 점수 데이터를 서버 중심으로 처리하고 검증",
    "세션 인증과 권한 분리로 학생/관리자 접근 범위 통제",
  ],
  techStack: [
    { name: "Next.js", primary: true, summary: true },
    { name: "SQLite", primary: true, summary: true },
    { name: "Docker Compose", primary: false, summary: true },
  ],
};

const projectSectionLinks = [
  { id: "overview", label: "프로젝트 개요" },
  { id: "role", label: "역할" },
  { id: "skills", label: "기술 스택" },
  {
    id: "ranking-structure",
    label: "점수만 비교할 수 있는 익명 랭킹 구조 설계",
  },
  {
    id: "score-validation",
    label: "실제 성적에 반영되는 점수를 서버에서 검증",
  },
  {
    id: "audit-logging",
    label: "요청 로그를 남겨 점수와 제출 이력을 추적",
  },
  {
    id: "upload-validation",
    label: "제출 파일과 결과 데이터의 비정상 입력 차단",
  },
  {
    id: "deployment-environment",
    label: "Docker Compose로 강의 운영 환경을 고정",
  },
  { id: "troubleshooting", label: "트러블슈팅" },
  { id: "improvements", label: "개선 결과" },
  { id: "tech-decisions", label: "기술 선택 이유" },
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

export default function SchMiniProjectPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-[760px] px-5 pt-10 pb-28 sm:px-6">
        <BackToProjectsLink />
        <ProjectSectionNavigation links={projectSectionLinks} />

        <header className="mt-16 flex flex-col gap-8 pt-10 text-center">
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.22em] text-[#737373]">
              Project No.3
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.12] text-balance">
              SCH MiniProject PMS
            </h1>
            <p className="text-base leading-relaxed text-[#737373]">
              순천향대학교 사물인터넷학과 ML/DL 강의에서 사용하는 프로젝트 과제
              관리 시스템
            </p>
          </div>

          <section className="mt-8 grid grid-cols-3 items-stretch">
            <div className="grid grid-rows-[auto_1fr]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                Period
              </p>
              <p className="mt-3 flex min-h-10 items-center justify-center text-sm font-medium text-black">
                2025.06 ~ 2026.02 <br /> 약 10개월 운영
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
                순천향대학교 ML/DL 강의 <br /> 개인 프로젝트
              </p>
            </div>
            <div className="grid grid-rows-[auto_1fr]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                Role
              </p>
              <p className="mt-3 flex min-h-10 items-center justify-center text-sm font-medium text-black">
                Full-stack Developer
              </p>
            </div>
          </section>
        </header>

        <section id="overview" className="scroll-mt-12 pt-32">
          <SectionHeading>프로젝트 개요</SectionHeading>
          <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
            순천향대학교 사물인터넷학과 머신러닝·딥러닝 강의에서 사용하는{" "}
            <strong className="font-medium text-black">
              익명 점수 기반 프로젝트 과제 관리 시스템
            </strong>
            입니다. 기존 과제 제출 방식에서는 학생들이 서로의 프로젝트 결과를
            비교할 수 없어 자신의 결과가 어느 정도 수준인지 확인하기
            어려웠습니다. 이를 해결하기 위해 학생이 프로젝트 코드와 결과 점수를
            제출한 뒤, 다른 학생들의 점수를{" "}
            <strong className="font-medium text-black">익명으로 비교</strong>
            하고 자신의 순위를 확인할 수 있는 구조를 설계했습니다. 또한 실제
            강의 성적에 반영되는 데이터를 다루기 때문에{" "}
            <strong className="font-medium text-black">
              점수 위변조 방지
            </strong>
            ,{" "}
            <strong className="font-medium text-black">
              세션 기반 사용자 관리
            </strong>
            , <strong className="font-medium text-black">감사 로그</strong>,{" "}
            <strong className="font-medium text-black">
              파일 업로드 검증 흐름
            </strong>
            을 함께 구현했습니다. 이 시스템은{" "}
            <strong className="font-medium text-black">
              약 10개월
            </strong>
            간 실제 강의 운영 환경에서 사용되었으며, 월 평균 약{" "}
            <strong className="font-medium text-black">40명</strong>의 학생이
            과제 제출과 랭킹 조회 기능을 이용했습니다.
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
                요구사항 정리, 기능 범위 정의, 전체 시스템 아키텍처 설계
              </span>
            </li>
            <li className="flex gap-3 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <Check
                className="mt-1 h-4 w-4 shrink-0 text-black"
                aria-hidden="true"
              />
              <span>
                학생용 제출/랭킹 화면과 관리자용 관리 화면의{" "}
                <strong className="font-medium text-black">
                  프론트엔드 UI/UX 설계 및 구현
                </strong>
              </span>
            </li>
            <li className="flex gap-3 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <Check
                className="mt-1 h-4 w-4 shrink-0 text-black"
                aria-hidden="true"
              />
              <span>
                세션 인증, 권한 분리, 점수 검증, 파일 업로드 검증, 감사 로그 등{" "}
                <strong className="font-medium text-black">
                  백엔드 기능 개발
                </strong>
              </span>
            </li>
            <li className="flex gap-3 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <Check
                className="mt-1 h-4 w-4 shrink-0 text-black"
                aria-hidden="true"
              />
              <span>
                Docker Compose 기반 실행 환경 구성과 강의 운영 기간 중 배포 및
                유지보수
              </span>
            </li>
          </ul>
        </section>

        <section id="skills" className="scroll-mt-12 pt-24">
          <SectionHeading>기술 스택</SectionHeading>
          <div className="flex flex-wrap gap-2.5">
            <SkillIcon emphasized>Next.js</SkillIcon>
            <SkillIcon emphasized>SQLite</SkillIcon>
            <SkillIcon>Docker Compose</SkillIcon>
          </div>
        </section>

        <section id="ranking-structure" className="scroll-mt-12 pt-24">
          <SectionHeading>
            점수만 비교할 수 있는 익명 랭킹 구조 설계
          </SectionHeading>
          <div className="mt-6 grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              교수님 요청의 핵심은 단순한 제출 사이트가 아니라, 학생들이
              서로의 프로젝트 결과 점수를 비교할 수 있는 환경을 만드는
              것이었습니다. 이름을 공개하지 않고 점수와 익명 식별자만 보여주어,
              특정 사람에게 비결을 묻는 구조가 아니라 점수 자체로 자극을 받고
              선의의 경쟁을 할 수 있도록 설계했습니다.
            </p>
            <ul className="grid gap-2 pl-4 text-sm font-normal leading-relaxed tracking-normal text-[#737373] marker:text-[#a3a3a3]">
              <li>
                학생이 자신의 프로젝트 결과를 제출하면 같은 화면 흐름 안에서
                점수, 순위, 다른 제출 결과와의 차이를 확인할 수 있게
                구성했습니다.
              </li>
              <li>
                실명 대신 익명 식별자와 점수 중심으로 랭킹을 표시해 비교 경험은
                제공하면서도 불필요한 개인 노출은 줄였습니다.
              </li>
            </ul>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              학생이 자신의 프로젝트 순위를 확인하는 익명 랭킹 화면과, 교수자가
              요청 로그를 확인하는 관리자 화면입니다. 학생에게는 비교에 필요한
              점수와 순위만 제공하고, 강의 운영자는 점수, 공지, 요청 이력을 한
              시스템에서 관리할 수 있도록 구성했습니다.
            </p>
            <DiagramFigure
              src="/projects/sch-iot-rankingboard/sch-submission-flow.svg"
              alt="SCH MiniProject 과제 제출 및 랭킹 관리 흐름"
              caption="제출 결과를 익명 점수 랭킹으로 연결해 학생이 자신의 위치를 바로 확인할 수 있도록 구성했습니다."
            />
          </div>
        </section>

        <section id="score-validation" className="scroll-mt-12 pt-24">
          <SectionHeading>
            실제 성적에 반영되는 점수를 서버에서 검증
          </SectionHeading>
          <div className="mt-6 grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              과제 점수는 실제 수업 성적에 반영되기 때문에 단순한 랭킹
              서비스처럼 만들 수 없었습니다. 클라이언트가 보낸 값을 그대로
              신뢰하지 않고, 세션, 권한, 제출 대상, 점수 처리 흐름을 서버에서
              여러 단계로 확인하도록 구성했습니다.
            </p>
            <ul className="grid gap-2 pl-4 text-sm font-normal leading-relaxed tracking-normal text-[#737373] marker:text-[#a3a3a3]">
              <li>
                서버 세션과 HttpOnly 쿠키를 사용해 인증 상태를 서버에서 관리하고,
                사용자를 엄격하게 식별하도록 했습니다.
              </li>
              <li>
                사용자 페이지, 관리자 페이지, 점수 관리 API에 역할 기반 접근
                검사를 적용해 학생이 관리자 기능에 접근할 수 없도록 분리했습니다.
              </li>
              <li>
                SSR과 서버 측 검증을 통해 랭킹, 점수, 관리자 데이터처럼 민감한
                정보를 가능한 한 서버에서 처리하도록 설계했습니다.
              </li>
            </ul>
            <DiagramFigure
              src="/projects/sch-iot-rankingboard/sch-auth-flow.svg"
              alt="SCH MiniProject 세션 인증 및 권한 분리 흐름"
              caption="서버 세션, 권한 검사, 서버 측 점수 검증을 기준으로 실제 성적 데이터의 접근 범위를 제한했습니다."
            />
          </div>
        </section>

        <section id="audit-logging" className="scroll-mt-12 pt-24">
          <SectionHeading>
            요청 로그를 남겨 점수와 제출 이력을 추적
          </SectionHeading>
          <div className="mt-6 grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              성적에 반영되는 시스템에서는 “누가 언제 어떤 요청을 했는지”를
              나중에 확인할 수 있어야 했습니다. 제출 실패, 로그인 실패, 점수
              관리, 관리자 작업처럼 문제가 될 수 있는 주요 요청을 기록하고
              관리자 페이지에서 조회할 수 있게 했습니다.
            </p>
            <ul className="grid gap-2 pl-4 text-sm font-normal leading-relaxed tracking-normal text-[#737373] marker:text-[#a3a3a3]">
              <li>
                요청자, 경로, 메서드, 상태 코드, IP, 요청 메타데이터를 기록해
                점수 처리와 제출 과정에서 발생한 문제를 추적할 수 있게 했습니다.
              </li>
              <li>
                관리자 페이지에서 요청 로그를 조회할 수 있도록 구성해 강의 운영
                중 발생한 실패 요청을 확인할 수 있게 했습니다.
              </li>
            </ul>
            <DiagramFigure
              src="/projects/sch-iot-rankingboard/sch-audit-flow.svg"
              alt="SCH MiniProject 감사 로그 및 운영 추적 흐름"
              caption="주요 요청을 감사 로그로 남기고 관리자 페이지에서 조회할 수 있도록 구성했습니다."
            />
          </div>
        </section>

        <section id="upload-validation" className="scroll-mt-12 pt-24">
          <SectionHeading>
            제출 파일과 결과 데이터의 비정상 입력 차단
          </SectionHeading>
          <div className="mt-6 grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              학생이 직접 파일과 결과 데이터를 제출하는 구조라 업로드 보안도
              중요했습니다. 파일을 저장하기 전에 확장자, JSON 구조, null-byte,
              경로 정규화를 확인해 비정상 업로드와 Path Traversal 위험을 줄이고,
              의도하지 않은 점수 데이터 입력 가능성을 낮췄습니다.
            </p>
            <ul className="grid gap-2 pl-4 text-sm font-normal leading-relaxed tracking-normal text-[#737373] marker:text-[#a3a3a3]">
              <li>
                허용된 확장자와 JSON 구조를 먼저 확인해 과제 제출 형식이 맞지
                않거나 결과 데이터가 비정상적인 요청을 차단했습니다.
              </li>
              <li>
                null-byte 포함 여부와 경로 정규화 결과를 확인해 저장 경로를
                벗어나는 입력을 완화했습니다.
              </li>
            </ul>
            <DiagramFigure
              src="/projects/sch-iot-rankingboard/sch-upload-validation-flow.svg"
              alt="SCH MiniProject 파일 업로드 검증 흐름"
              caption="파일을 저장하기 전에 형식, 구조, 경로를 나눠 검증해 비정상 업로드 위험을 줄였습니다."
            />
          </div>
        </section>

        <section id="deployment-environment" className="scroll-mt-12 pt-24">
          <SectionHeading>
            Docker Compose로 강의 운영 환경을 고정
          </SectionHeading>
          <div className="mt-6 grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              강의 기간 동안 같은 환경에서 안정적으로 실행되는 것이 중요했기
              때문에 Docker Compose로 실행 환경을 고정했습니다. 복잡한
              인프라보다 재현 가능한 배포와 간단한 재시작 흐름을 우선했습니다.
            </p>
            <ul className="grid gap-2 pl-4 text-sm font-normal leading-relaxed tracking-normal text-[#737373] marker:text-[#a3a3a3]">
              <li>
                Next.js 애플리케이션과 데이터 저장 환경을 Docker Compose로
                실행해 개발/운영 환경 차이를 줄였습니다.
              </li>
              <li>
                on-premise 환경에서도 명령 기반으로 실행과 재시작을 관리할 수
                있도록 구성했습니다.
              </li>
            </ul>
            <DiagramFigure
              src="/projects/sch-iot-rankingboard/sch-deploy-flow.svg"
              alt="SCH MiniProject Docker Compose 배포 흐름"
              caption="소규모 강의 운영에 맞춰 복잡한 인프라보다 재현 가능한 실행 환경을 우선했습니다."
            />
          </div>
        </section>

        <section id="troubleshooting" className="scroll-mt-12 pt-24">
          <SectionHeading>트러블슈팅</SectionHeading>
          <div className="mt-8 grid gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#a3a3a3]">
              Deployment Network Issue
            </p>
            <h3 className="text-[20px] font-medium leading-[1.4] tracking-normal text-black">
              Docker pull 실패 원인을 DNS 설정에서 찾음
            </h3>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              학과 내부망 서버에 배포하는 과정에서 Docker image pull이 계속
              네트워크 에러로 실패했습니다. 먼저 서버의 네트워크 연결 상태를
              확인했고, IP 주소로는 ping이 나가지만 도메인 주소로는 ping이
              실패하는 것을 확인했습니다. 이를 통해 단순 네트워크 단절이 아니라
              DNS 해석 문제로 원인을 좁혔습니다.
            </p>
            <ul className="grid gap-2 pl-4 text-sm font-normal leading-relaxed tracking-normal text-[#737373] marker:text-[#a3a3a3]">
              <li>
                처음에는 1.1.1.1, 8.8.8.8 같은 외부 DNS 서버로 변경해
                해결을 시도했습니다.
              </li>
              <li>
                하지만 학과 서버가 내부망에 있었기 때문에 외부 DNS가 아니라 학교
                네트워크의 DNS 서버를 사용해야 한다는 점을 확인했습니다.
              </li>
              <li>
                유실되어 있던 학교 DNS 서버 IP를 확인해 복구했고, 이후 Docker
                pull이 정상적으로 동작하도록 해결했습니다.
              </li>
              <li>
                이 과정에서 Linux 환경에서 CLI로 IP, DNS, 네트워크 설정을 확인하고
                수정하는 방법을 익혔습니다.
              </li>
            </ul>
          </div>
        </section>

        <section id="improvements" className="scroll-mt-12 pt-24">
          <SectionHeading>개선 결과</SectionHeading>
          <ul className="mt-6 grid gap-3">
            <li className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              기존 과제 사이트에서 제공하지 못하던 점수 비교 경험을 익명 랭킹으로
              구현해, 학생들이 자신의 프로젝트 결과를 다른 결과와 비교하며
              선의의 경쟁을 할 수 있게 했습니다.
            </li>
            <li className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              약 10개월간 강의 운영에 실제 사용되었고, 월 평균 약 40명의 학생이
              과제 제출과 랭킹 조회 기능을 사용했습니다.
            </li>
            <li className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              실제 성적에 반영되는 점수 데이터를 다루기 위해 세션 인증, 권한
              분리, 서버 측 점수 검증, 감사 로그, 파일 업로드 검증을 함께
              적용했습니다.
            </li>
          </ul>
        </section>

        <section id="tech-decisions" className="scroll-mt-12 pt-24">
          <SectionHeading>기술 선택 이유</SectionHeading>
          <div className="mt-6 grid gap-6">
            <article className="grid gap-2">
              <h3 className="text-[18px] font-medium leading-relaxed tracking-normal text-black">
                Next.js
              </h3>
              <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
                학생 화면, 관리자 화면, API를 빠르게 함께 개발해야 했고, 랭킹과
                관리자 데이터처럼 민감한 정보를 서버에서 최대한 처리해야 했기
                때문에 Next.js를 사용했습니다. SSR을 활용해 사용자의 세션과
                권한을 확인한 뒤 필요한 데이터를 내려주는 구조로 구성했습니다.
              </p>
            </article>

            <article className="grid gap-2">
              <h3 className="text-[18px] font-medium leading-relaxed tracking-normal text-black">
                SQLite
              </h3>
              <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
                월 평균 약 40명의 학생이 사용하는 강의 운영 시스템이었기 때문에,
                별도 DB 서버를 운영하는 것보다 단순하고 관리 비용이 낮은 SQLite가
                적합했습니다. 사용자, 제출, 점수, 공지, 로그 데이터를 작은 단위로
                안정적으로 관리하는 데 집중했습니다.
              </p>
            </article>

            <article className="grid gap-2">
              <h3 className="text-[18px] font-medium leading-relaxed tracking-normal text-black">
                Server Session + HttpOnly Cookie
              </h3>
              <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
                실제 성적에 반영되는 점수와 관리자 기능을 다루기 때문에 사용자
                식별을 엄격하게 관리해야 했습니다. 서버 세션과 HttpOnly 쿠키를
                사용해 인증 상태를 서버 중심으로 관리하고, 클라이언트 측 토큰
                노출 가능성을 줄였습니다.
              </p>
            </article>

            <article className="grid gap-2">
              <h3 className="text-[18px] font-medium leading-relaxed tracking-normal text-black">
                Server-side Score Validation
              </h3>
              <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
                점수 위변조를 막기 위해 클라이언트가 보낸 값을 그대로 신뢰하지
                않고, 세션, 권한, 프로젝트, 제출 데이터 형식을 서버에서 단계별로
                확인하도록 설계했습니다. 랭킹에 노출되는 점수도 서버에서 관리되는
                값을 기준으로 계산했습니다.
              </p>
            </article>

            <article className="grid gap-2">
              <h3 className="text-[18px] font-medium leading-relaxed tracking-normal text-black">
                Docker Compose
              </h3>
              <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
                강의 기간 동안 같은 환경에서 실행되어야 했기 때문에 Docker
                Compose로 실행 방식을 고정했습니다. 복잡한 배포 자동화보다
                재현 가능한 실행 환경과 간단한 운영 절차를 우선했습니다.
              </p>
            </article>
          </div>
        </section>

        <section id="retrospective" className="scroll-mt-12 pt-24">
          <SectionHeading>회고 및 개선 방향</SectionHeading>
          <div className="mt-6 grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              이 프로젝트를 진행하면서 실제 강의 운영에 쓰이는 시스템은 기능을
              많이 만드는 것보다, 점수 데이터가 잘못 처리되지 않도록 흐름을
              단순하고 추적 가능하게 만드는 것이 중요하다는 점을 배웠습니다.
              익명 랭킹은 학생들에게 비교와 동기부여를 제공하는 기능이었지만,
              실제 성적에 연결되는 순간 인증, 권한, 로그, 업로드 검증까지 함께
              설계해야 하는 운영 시스템이 되었습니다.
            </p>
            <ul className="grid gap-2 pl-4 text-sm font-normal leading-relaxed tracking-normal text-[#737373] marker:text-[#a3a3a3]">
              <li>
                사용자가 늘어나거나 여러 강의에서 동시에 사용한다면 SQLite에서
                별도 DB 서버로 분리하는 개선이 필요합니다.
              </li>
              <li>
                제출 파일 검증 외에도 저장소 격리, 파일 크기 제한, 악성 파일 탐지
                같은 보안 검증을 더 강화할 수 있습니다.
              </li>
              <li>
                관리자 페이지에서 통계, 제출 추이, 프로젝트별 평가 현황을 더
                자세히 볼 수 있도록 분석 기능을 확장할 수 있습니다.
              </li>
            </ul>
          </div>
        </section>

        <ProjectBottomNavigation />
      </main>
    </div>
  );
}
