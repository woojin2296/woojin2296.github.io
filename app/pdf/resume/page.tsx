import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  BodyText,
  BulletList,
  ChipList,
  PDFAwardList,
  PDFContact,
  PDFExperienceRow,
  PDFProfile,
  PDFSkillStack,
  PdfDocument,
  PdfPage,
  PDFSectionTitle,
  PdfSection,
} from "../_components/pdf-elements";
import {
  contact,
  education,
  experience,
  language,
  military,
  publication,
  awards,
  skills,
} from "@/content/data";
import {
  projectSummary as dobonglifeProject,
  resumeProjectSummary as dobonglifeResumeProject,
} from "@/content/dobonglife";
import {
  projectSummary as schMiniProjectProject,
  resumeProjectSummary as schMiniProjectResumeProject,
} from "@/content/sch-miniproject";

const resumeProjects = [
  {
    title: dobonglifeResumeProject.title,
    meta: `${dobonglifeResumeProject.affiliation} | ${dobonglifeResumeProject.position} | ${dobonglifeResumeProject.period}`,
    description: dobonglifeResumeProject.description,
    bullets: dobonglifeResumeProject.summary,
    techStack: dobonglifeProject.techStack.map((skill) => skill.name),
  },
  {
    title: "판옵티콘(Panopticon) - 데이터 수집 관제 시스템",
    meta: "순천향대학교 UBICOMP LAB | 학부연구생 | 2024.07-2026.02",
    description:
      "연구실 실험 데이터 수집 파이프라인 관제 및 이상 알림 시스템 개발",
    bullets: [
      "팀 리드로서 요구사항 정리, 기능 범위 정의, 전체 시스템 아키텍처 설계",
      "데이터 수집·조회·장애 상태 흐름을 고려한 DB 스키마 설계 및 Spring Boot API 구현",
      "장치 상태, 최근 수집 시각, 센서 데이터를 한 화면에서 확인하는 관제 UI 설계 및 Next.js 프론트엔드 구현",
      "self-hosted runner 기반 CI/CD 파이프라인 구축 및 Docker 기반 배포 환경 구성",
      "TCP Socket과 WebSocket을 사용한 상태 이벤트 전달 구조 구현",
    ],
    techStack: [
      "Next.js",
      "Spring Boot",
      "MySQL",
      "Docker Compose",
      "GitHub Actions",
      "Self-hosted Runner",
    ],
  },
  {
    title: schMiniProjectResumeProject.title,
    meta: `${schMiniProjectResumeProject.affiliation} | ${schMiniProjectResumeProject.position} | ${schMiniProjectResumeProject.period}`,
    description: schMiniProjectResumeProject.description,
    bullets: schMiniProjectResumeProject.summary,
    techStack: schMiniProjectProject.techStack.map((skill) => skill.name),
  },
];

const resumeProfile = {
  education,
  language,
  military,
  publication,
} as const;
const coverLetterParagraphs = [
  "고등학교 2학년 때 처음 파이썬을 배우며 숫자야구 게임과 지뢰찾기를 구현했습니다. 직접 만든 프로그램이 의도대로 동작하는 과정이 재미있었고, 이를 계기로 개발자를 진로로 정해 사물인터넷학과에 진학했습니다.",
  "개발자로서의 방향이 처음 정해진 계기는 마인크래프트 서버 운영 경험이었습니다. Java 기반 플러그인을 개발하며 유저 콘텐츠와 관리자 기능을 구현했고, 약 100명의 동시 접속자가 이용하는 서버를 운영했습니다. 사용자가 제가 만든 기능을 실제로 사용하고 즐기는 모습을 보며 개발은 단순히 코드를 작성하는 일이 아니라 사람들의 경험을 만드는 일이라는 것을 처음 실감했습니다.",
  "서버를 운영하면서는 사용자는 개발자가 의도한 방향으로 움직여주지 않는다는 것을 알게 되었습니다. 예상하지 못한 방식으로 시스템을 이용하거나 기능의 허점을 발견하는 경우가 반복적으로 발생했고, 이를 해결하는 과정에서 예외 상황과 악용 가능성을 고려하는 것이 중요하다는 것을 느꼈습니다.",
  "실제로 서버 장애가 발생해 밤을 새워가며 복구 작업을 진행한 경험도 있습니다. 작업을 진행하며 장애를 복구하는 능력도 중요하지만, 그보다 중요한 것은 문제가 발생하더라도 전체 시스템이 함께 멈추지 않도록 설계하는 것이라는 점을 배웠습니다. 결국 중요한 것은 문제가 발생하지 않는 시스템이 아니라, 문제가 발생하더라도 안정적으로 동작하고 빠르게 복구할 수 있는 시스템이라고 생각합니다.",
  "군 복무 중에는 MW 통신병으로 국방망과 전화망을 구축·운영했습니다. 근무 중 네트워크 장애가 발생하면 통신 경로를 따라 각 구간을 점검하며 원인을 분석해야 했습니다. 이를 통해 문제를 구간별로 분리하여 접근하는 사고방식을 익혔고, 원인을 체계적으로 추적하는 방법을 배울 수 있었습니다.",
  "이후 연구실에서 학부연구생과 랩장으로 활동하며 다양한 분야의 프로젝트를 개발했습니다. 프로젝트마다 요구되는 기술과 도메인이 달랐기 때문에 익숙하지 않은 분야를 맡는 경우도 많았지만, 이를 통해 익숙하지 않은 분야라도 빠르게 학습하고 실제 문제 해결에 적용하는 능력을 키울 수 있었습니다.",
  "연구실 및 학과 서버를 운영하며 반복적으로 발생하는 문제를 해결하기 위해 모니터링과 자동화 시스템을 구축했습니다. 대표적으로 실험 데이터 수집 파이프라인의 상태를 실시간으로 모니터링하고 이상 상황 발생 시 알림을 제공하는 관제 시스템을 개발했습니다.",
  "이전 회사에서는 인턴 중심으로 구성된 IT팀의 팀장을 맡아 프로젝트와 운영 업무를 진행했습니다. AWS 기반 환경에서 서비스를 운영하며 Terraform을 활용한 IaC를 적용했고, EKS 기반 Kubernetes 환경을 구축하고 운영했습니다. 또한 Argo CD 기반 GitOps CI/CD 환경과 모니터링 체계를 구축하며 서비스 운영 자동화와 배포 효율화를 수행했습니다.",
  "소규모 조직 환경에서 사수 없이 업무를 수행해야 했고, 신입이지만 의사결정을 내려야 하는 위치에 있었습니다. 이 경험을 통해 기술적으로 옳은 선택과 서비스에 적합한 선택이 항상 같지는 않다는 것을 배웠고, 기능 자체보다 운영과 사용자 관점에서 판단하는 습관을 갖게 되었습니다.",
  "저는 지금까지 서비스를 개발하고 운영하며 완벽한 시스템은 없다는 사실을 배웠습니다. 사용자는 예상한 방식으로만 행동하지 않으며, 장애와 예외 상황은 언제든 발생할 수 있습니다. 반복적으로 발생하는 문제를 시스템과 자동화로 해결하고, 복잡한 운영 과정을 더 단순하고 효율적으로 만드는 것이 중요하다고 생각합니다.",
  "앞으로도 서비스 전체를 이해하고 설계할 수 있는 엔지니어로 성장하며, 더 많은 사용자와 더 큰 규모의 시스템을 안정적으로 운영하는 데 기여하고 싶습니다.",
] as const;

function Underline({ children }: { children: ReactNode }) {
  return (
    <u className="relative inline-block no-underline">
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-x-[-3px] bottom-[0px] z-0 h-[0.55em] rounded-full bg-[#ffe1d2]"
      />
    </u>
  );
}

export const metadata: Metadata = {
  title: "Woojin Lim Resume PDF",
  description: "PDF 변환용 임우진 이력서",
};

export default function ResumePdfPage() {
  const projectBulletHighlights = [
    "EKS 기반 MSA 플랫폼(V3)",
    "Terraform 기반 IaC",
    "self-hosted runner",
    "TLS 인증서 갱신 실패 운영 장애 대응",
    "모니터링 시스템",
    "Secret 관리 및 주입 체계 구축",
    "내부망 DNS 설정 유실 문제 해결",
  ] as const;

  const renderProjectBullet = (bullet: string) => {
    const highlights = projectBulletHighlights
      .map((highlight) => ({
        highlight,
        index: bullet.indexOf(highlight),
      }))
      .filter(({ index }) => index >= 0)
      .sort((a, b) => a.index - b.index);

    if (highlights.length === 0) {
      return bullet;
    }

    const nodes: ReactNode[] = [];
    let cursor = 0;

    for (const { highlight, index } of highlights) {
      if (index < cursor) continue;
      if (index > cursor) nodes.push(bullet.slice(cursor, index));
      nodes.push(
        <span key={`${highlight}-${index}`} className="font-medium text-black">
          {highlight}
        </span>,
      );
      cursor = index + highlight.length;
    }

    if (cursor < bullet.length) nodes.push(bullet.slice(cursor));

    return <>{nodes}</>;
  };

  return (
    <PdfDocument>
      <PdfPage dense>
        <header>
          <div className="flex items-end gap-4">
            <h1 className="text-[34px] font-semibold leading-none tracking-normal text-black">
              임우진 (Woojin Lim)
            </h1>
            <p className="pb-1 text-[15px] font-medium leading-none text-[#737373]">
              2001.02.26 (만 25세)
            </p>
          </div>
        </header>

        <PdfSection className="mt-16">
          <PDFSectionTitle>
            <Underline>네트워크</Underline>와 <Underline>서비스 흐름</Underline>을 이해하는{" "}
            <span className="text-[#1d4ed8]">
              클라우드/DevOps 엔지니어 임우진
            </span>
            입니다.
          </PDFSectionTitle>
          <BodyText>
            사용자의 요청이 네트워크와 서버를 지나 데이터베이스까지 처리되는
            전체 흐름을 이해하고 설계하는 것을 좋아합니다. 프론트엔드, 백엔드,
            인프라, 네트워크, 보안, 임베디드, AI 등 다양한 분야를 공부하며
            프로젝트를 진행해왔고, 서비스의 여러 계층을 함께 이해해 장애 원인을
            추적하고 해결합니다.{" "}
            <span className="font-medium text-black">
              개발을 통해 다른 사람의 경험에 긍정적인 영향을 주는 개발자
            </span>
            로 성장하려 합니다.
          </BodyText>
        </PdfSection>

        <PdfSection>
          <PDFSectionTitle>연락처</PDFSectionTitle>
          <PDFContact
            items={contact.filter((item) =>
              ["phone", "email", "portfolio", "github"].includes(item.type),
            )}
          />
        </PdfSection>

        <PdfSection>
          <PDFSectionTitle>프로필</PDFSectionTitle>
          <PDFProfile data={resumeProfile} />
        </PdfSection>

        <PdfSection>
          <PDFSectionTitle>기술 스택</PDFSectionTitle>
          <PDFSkillStack items={skills} />
        </PdfSection>

        <PdfSection>
          <PDFSectionTitle>경험</PDFSectionTitle>
          <div className="mt-4 grid gap-4">
            {experience.primary.map((item) => (
              <PDFExperienceRow
                key={`${item.title}-${item.role}-${item.period}`}
                item={item}
              />
            ))}
          </div>
        </PdfSection>
      </PdfPage>

      <PdfPage dense>
        <PdfSection className="mt-0">
          <div className="grid gap-4">
            {experience.additional.map((item) => (
              <PDFExperienceRow
                key={`${item.title}-${item.role}-${item.period}`}
                item={item}
                emphasized={false}
              />
            ))}
          </div>
        </PdfSection>

        <PdfSection>
          <div className="flex items-center justify-between">
            <PDFSectionTitle>대표 프로젝트</PDFSectionTitle>
            <a
              href="https://woojin2296.github.io"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#cfcfcf] bg-white px-3.5 text-[11.5px] font-medium leading-none text-black"
            >
              포트폴리오에서 확인하기
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="mt-4 grid gap-8">
            {resumeProjects.map((project) => (
              <article key={project.title}>
                <PDFSectionTitle>{project.title}</PDFSectionTitle>
                <p className="mt-1 text-[12px] leading-relaxed text-[#737373]">
                  {project.meta}
                </p>
                <BodyText>{project.description}</BodyText>
                <div className="mt-2">
                  <BulletList
                    items={project.bullets.map(renderProjectBullet)}
                  />
                </div>
                <div className="mt-2">
                  <ChipList items={project.techStack.slice()} />
                </div>
              </article>
            ))}
          </div>
        </PdfSection>
      </PdfPage>

      <PdfPage dense>
        <PdfSection className="mt-0">
          <PDFSectionTitle>수상 내역</PDFSectionTitle>
          <PDFAwardList items={awards} />
        </PdfSection>
      </PdfPage>

      <PdfPage dense>
        <PdfSection className="mt-0">
          <PDFSectionTitle>
            안녕하세요. 네트워크를 좋아하는 클라우드·DevOps 엔지니어
            임우진입니다.
          </PDFSectionTitle>
          <div className="mt-4 grid gap-2.5 text-[12px] leading-[1.55] text-[#525252]">
            {coverLetterParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </PdfSection>
      </PdfPage>
    </PdfDocument>
  );
}
