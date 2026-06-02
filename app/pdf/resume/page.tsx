import type { Metadata } from "next";
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
  aboutSummary,
  contact,
  education,
  experience,
  language,
  military,
  profile,
  publication,
  awards,
  skills,
} from "@/content/data";
import {
  projectSummary as dobonglifeProject,
  resumeProjectSummary as dobonglifeResumeProject,
} from "@/content/dobonglife";
import {
  projectSummary as panopticonProject,
  resumeProjectSummary as panopticonResumeProject,
} from "@/content/panopticon";
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
    title: panopticonResumeProject.title,
    meta: `${panopticonResumeProject.affiliation} | ${panopticonResumeProject.position} | ${panopticonResumeProject.period}`,
    description: panopticonResumeProject.description,
    bullets: panopticonResumeProject.summary,
    techStack: panopticonProject.techStack.map((skill) => skill.name),
  },
  {
    title: schMiniProjectResumeProject.title,
    meta: `${schMiniProjectResumeProject.affiliation} | ${schMiniProjectResumeProject.position} | ${schMiniProjectResumeProject.period}`,
    description: schMiniProjectResumeProject.description,
    bullets: schMiniProjectResumeProject.summary,
    techStack: schMiniProjectProject.techStack.map((skill) => skill.name),
  },
];

export const metadata: Metadata = {
  title: "Woojin Lim Resume PDF",
  description: "PDF 변환용 임우진 이력서",
};

export default function ResumePdfPage() {
  return (
    <PdfDocument>
      <PdfPage dense>
        <header>
          <div className="flex items-end gap-4">
            <h1 className="text-[34px] font-semibold leading-none tracking-normal text-black">
              {profile.name} ({profile.englishName})
            </h1>
            <p className="pb-1 text-[15px] font-medium leading-none text-[#737373]">
              {profile.birth.date} ({profile.birth.ageText})
            </p>
          </div>
        </header>

        <PdfSection className="mt-16">
          <PDFSectionTitle>{aboutSummary.title}</PDFSectionTitle>
          <BodyText>{aboutSummary.body}</BodyText>
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
          <PDFProfile
            education={education}
            language={language}
            military={military}
            publication={publication}
          />
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
                title={item.title}
                role={item.role}
                period={item.period}
                description={item.description}
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
                title={item.title}
                role={item.role}
                period={item.period}
                description={item.description}
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
                <div className="mt-3">
                  <BulletList items={project.bullets.slice(0, 4)} />
                </div>
                <div className="mt-3">
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

        <PdfSection>
          <PDFSectionTitle>
            네트워크를 좋아하는 소프트웨어 엔지니어 임우진 입니다.
          </PDFSectionTitle>
          <div className="mt-4 grid gap-3 text-[13px] leading-relaxed text-[#525252]">
            <p>
              고등학교 2학년 때 처음 파이썬을 배우며 숫자야구 게임과 지뢰찾기를
              구현했고, 이 경험을 통해 개발에 흥미를 느꼈습니다. 이후 개발자라는
              진로를 정하고 사물인터넷학과에 진학했습니다.
            </p>
            <p>
              처음으로 개발자로써의 정체성이 만들어진 것은 마인크래프트
              플러그인을 개발해 약 100명의 동시 접속자가 이용하는 서버에
              서비스를 제공한 경험이었습니다. 사용자가 제가 만든 시스템을 실제로
              사용하고 즐기는 모습을 보며 처음으로 제가 만든 결과물이 누군가의
              경험에 영향을 줄 수 있다는 사실을 체감했습니다. 이를 계기로 Java와
              객체지향 개념을 집중적으로 학습했습니다.
            </p>
            <p>
              군 복무 중에는 MW 통신 직별을 수행하며 국방망과 전화망을 구축하고
              운영했습니다. 이 과정에서 네트워크와 인프라에 대한 관심이 생겼고,
              인프라 위에서 서비스가 안정적으로 운영되는 과정 자체에 흥미를
              느끼게 되었습니다.
            </p>
            <p>
              이후 연구실에서 학부연구생으로 활동하며 연구실 및 학과 서버를
              관리하고 여러 프로젝트를 개발·운영했습니다. 개발자가 개발에 집중할
              수 있도록 안정적인 환경을 제공하고, 시스템을 지속적으로
              운영·개선하는 역할에 매력을 느꼈습니다.
            </p>
            <p>
              저는 지식을 학습할 때 단순 암기보다 개념 간의 연결을 이해하는 것을
              중요하게 생각합니다. 새로운 기술을 접하면 전체 흐름을 먼저
              파악하고, 핵심 개념을 기준으로 어느 수준까지 이해해야 하는지
              판단하며 학습합니다. 또한 이해한 내용을 타인에게 설명할 수 있어야
              진정으로 이해했다고 생각해, 동료들과 기술 스터디를 진행하며 지식을
              구조적으로 정리해왔습니다.
            </p>
            <p>
              이전 회사에서는 소규모 조직 특성상 사수 없이 업무를 수행해야 했고,
              IT 팀이 인턴 중심으로 구성되어 있어 팀장을 맡아 업무를
              진행했습니다. 제한된 환경에서도 팀원들과 협업하며 서비스를
              운영하고 문제를 해결한 경험을 통해 책임감과 실행력을 기를 수
              있었습니다. 그러나 앞으로는 보다 체계적인 환경에서 경험 많은
              개발자들과 협업하며 성장하고 싶습니다.
            </p>
          </div>
        </PdfSection>
      </PdfPage>
    </PdfDocument>
  );
}
