import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  BodyText,
  PDFAwardList,
  PDFContact,
  PdfDocument,
  PDFExperienceRow,
  PdfPage,
  PDFProfile,
  PdfSection,
  PDFSectionTitle,
  PDFSkillStack,
} from "../_components/pdf-elements";
import {
  about,
  awards,
  contact,
  education,
  experience,
  language,
  military,
  profile,
  publication,
  skills,
} from "@/content/data";
import {
  hero as dobonglifeHero,
  overviewSection as dobonglifeOverviewSection,
  roleSection as dobonglifeRoleSection,
  sections as dobonglifeSections,
  skillsSection as dobonglifeSkillsSection,
} from "@/content/dobonglife";
import { otherProjects } from "@/content/other-projects";
import { panopticon } from "@/content/panopticon";
import {
  hero as schMiniProjectHero,
  overviewSection as schMiniProjectOverviewSection,
  roleSection as schMiniProjectRoleSection,
  sections as schMiniProjectSections,
  skillsSection as schMiniProjectSkillsSection,
} from "@/content/sch-miniproject";

export const metadata: Metadata = {
  title: "Woojin Lim Portfolio PDF",
  description: "PDF 변환용 임우진 포트폴리오",
};

const [
  dobonglifeLegacyUpgrade,
  dobonglifeTerraformGitops,
  dobonglifeSecretVariables,
  dobonglifeAvailabilityScaling,
  dobonglifeMonitoring,
  dobonglifeTlsTroubleshooting,
  dobonglifeRetrospective,
] = dobonglifeSections;
const [
  dobonglifeLegacyInfrastructure,
  dobonglifeRoleInfrastructure,
  dobonglifeCicdPipeline,
  dobonglifeEksPlatform,
  dobonglifeEksCicd,
] = dobonglifeLegacyUpgrade.subsections;
const [
  dobonglifeTlsIncident,
  dobonglifeTlsCause,
  dobonglifeTlsRecovery,
] = dobonglifeTlsTroubleshooting.subsections;

const {
  hero: panopticonHero,
  overviewSection: panopticonOverviewSection,
  roleSection: panopticonRoleSection,
  sections: panopticonSections,
  skillsSection: panopticonSkillsSection,
} = panopticon;

const [
  panopticonMonitoringSystem,
  panopticonMonitoringArchitecture,
  panopticonRealtimeDelivery,
  panopticonDeploymentAutomation,
  panopticonRetrospective,
] = panopticonSections;

const [
  schMiniProjectWorkflow,
  schMiniProjectDataModel,
  schMiniProjectAuthAuthorization,
  schMiniProjectSecurityValidation,
  schMiniProjectAuditLogging,
  schMiniProjectDeploymentEnvironment,
  schMiniProjectRetrospective,
] = schMiniProjectSections;
const [
  schMiniProjectFrontendValidation,
  schMiniProjectServerValidation,
  schMiniProjectDownloadSecurity,
] = schMiniProjectSecurityValidation.subsections;
const [
  schMiniProjectDeploymentIncident,
  schMiniProjectDeploymentCause,
  schMiniProjectDeploymentRecovery,
] = schMiniProjectDeploymentEnvironment.subsections;

const portfolioProfile = {
  education,
  language,
  military,
  publication,
} as const;
const portfolioContact = contact.find((item) => item.type === "portfolio");

export default function PortfolioPdfPage() {
  return (
    <PdfDocument>
      <PdfPage>
        <header>
          <p className="text-[13px] uppercase tracking-[0.22em] text-[#737373]">
            Portfolio 2026
          </p>
          <h1 className="mt-3 text-[36px] font-semibold leading-none tracking-normal text-black">
            {profile.displayName}
          </h1>
          {portfolioContact ? (
            <div className="mt-12 flex items-center justify-between gap-6 border-l border-[#d4d4d4] pl-4">
              <p className="text-[12.5px] leading-relaxed text-[#737373]">
                웹 포트폴리오에서 좀 더 편하게 확인하실 수 있습니다.
              </p>
              <a
                href={portfolioContact.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 shrink-0 items-center rounded-full border border-[#d4d4d4] px-3 text-[11px] font-medium leading-none text-[#525252] no-underline"
              >
                웹 포트폴리오 보기
                <span aria-hidden="true"> ↗</span>
              </a>
            </div>
          ) : null}
        </header>

        <PdfSection className="grid gap-8">
          {about.map((section) => (
            <article key={section.title}>
              <PDFSectionTitle>{section.title}</PDFSectionTitle>
              <BodyText>{section.body}</BodyText>
            </article>
          ))}
        </PdfSection>

        <PdfSection>
          <PDFSectionTitle>연락처</PDFSectionTitle>
          <PDFContact
            items={contact.filter((item) =>
              ["phone", "email", "blog", "github"].includes(item.type),
            )}
          />
        </PdfSection>

        <PdfSection>
          <PDFSectionTitle>기술 스택</PDFSectionTitle>
          <PDFSkillStack items={skills} />
        </PdfSection>
      </PdfPage>

      <PdfPage>
        <ProjectTitle hero={dobonglifeHero} />
        <DetailSection title={dobonglifeOverviewSection.title}>
          <DetailParagraphs paragraphs={dobonglifeOverviewSection.paragraphs} />
        </DetailSection>
        <DetailSection title={dobonglifeRoleSection.title}>
          <DetailBullets items={dobonglifeRoleSection.bullets} />
        </DetailSection>
        <DetailSection title={dobonglifeSkillsSection.title}>
          <PillGroup section={dobonglifeSkillsSection} />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title={dobonglifeHero.title} />
        <DetailSection
          title={dobonglifeLegacyUpgrade.title}
          className="mt-4"
        >
          <SubHeading>{dobonglifeLegacyInfrastructure.title}</SubHeading>
          <DetailParagraphs
            paragraphs={dobonglifeLegacyInfrastructure.paragraphs}
          />
          <DetailImageGrid
            columns={1}
            figures={dobonglifeLegacyInfrastructure.figures}
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title={dobonglifeHero.title} />
        <DetailSection
          title={dobonglifeRoleInfrastructure.title}
          className="mt-4"
          headingLevel="h3"
        >
          <DetailParagraphs
            paragraphs={dobonglifeRoleInfrastructure.paragraphs}
          />
          <DetailImage
            figure={dobonglifeRoleInfrastructure.figures[0]}
            narrow
          />
        </DetailSection>
        <DetailSection
          title={dobonglifeCicdPipeline.title}
          className="mt-4"
          headingLevel="h3"
        >
          <DetailParagraphs paragraphs={dobonglifeCicdPipeline.paragraphs} />
          <DetailImage
            figure={dobonglifeCicdPipeline.figures[0]}
            narrow
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title={dobonglifeHero.title} />
        <DetailSection
          title={dobonglifeEksPlatform.title}
          className="mt-4"
          headingLevel="h3"
        >
          <DetailParagraphs paragraphs={dobonglifeEksPlatform.paragraphs} />
          <DetailImage
            figure={dobonglifeEksPlatform.figures[0]}
            narrow
          />
        </DetailSection>
        <DetailSection
          title={dobonglifeEksCicd.title}
          className="mt-4"
          headingLevel="h3"
        >
          <DetailParagraphs paragraphs={dobonglifeEksCicd.paragraphs} />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title={dobonglifeHero.title} />
        <section className="mt-4">
          <DetailImage
            figure={dobonglifeEksCicd.figures[0]}
            narrow
          />
        </section>
        <DetailSection
          title={dobonglifeTerraformGitops.title}
          className="mt-12"
        >
          <DetailParagraphs paragraphs={dobonglifeTerraformGitops.paragraphs} />
          <DetailImage
            figure={dobonglifeTerraformGitops.figures[0]}
            narrow
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title={dobonglifeHero.title} />
        <DetailSection
          title={dobonglifeSecretVariables.title}
          className="mt-4"
        >
          <DetailParagraphs paragraphs={dobonglifeSecretVariables.paragraphs} />
        </DetailSection>
        <DetailSection
          title={dobonglifeAvailabilityScaling.title}
          className="mt-12"
        >
          <DetailParagraphs
            paragraphs={dobonglifeAvailabilityScaling.paragraphs}
          />
        </DetailSection>
        <DetailSection title={dobonglifeMonitoring.title} className="mt-12">
          <DetailParagraphs paragraphs={dobonglifeMonitoring.paragraphs} />
          <DetailImageGrid
            figures={dobonglifeMonitoring.figures}
          />
        </DetailSection>
        <DetailSection
          title={dobonglifeTlsTroubleshooting.title}
          className="mt-12"
        >
          <SubHeading>{dobonglifeTlsIncident.title}</SubHeading>
          <DetailParagraphs paragraphs={dobonglifeTlsIncident.paragraphs} />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title={dobonglifeHero.title} />
        <section className="mt-4 grid gap-4">
          <SubHeading>{dobonglifeTlsCause.title}</SubHeading>
          <DetailParagraphs paragraphs={dobonglifeTlsCause.paragraphs} />
          <SubHeading>{dobonglifeTlsRecovery.title}</SubHeading>
          <DetailParagraphs paragraphs={dobonglifeTlsRecovery.paragraphs} />
        </section>
        <DetailSection title={dobonglifeRetrospective.title} className="mt-12">
          <DetailParagraphs paragraphs={dobonglifeRetrospective.paragraphs} />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectTitle hero={panopticonHero} />
        <DetailSection title={panopticonOverviewSection.title}>
          <DetailParagraphs paragraphs={panopticonOverviewSection.paragraphs} />
        </DetailSection>
        <DetailSection title={panopticonRoleSection.title}>
          <DetailBullets items={panopticonRoleSection.bullets} />
        </DetailSection>
        <DetailSection title={panopticonSkillsSection.title}>
          <PillGroup section={panopticonSkillsSection} />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title={panopticonHero.title} />
        <DetailSection
          title={panopticonMonitoringSystem.title}
          className="mt-4"
        >
          <DetailParagraphs paragraphs={panopticonMonitoringSystem.paragraphs} />
          <DetailImageGrid
            figures={panopticonMonitoringSystem.figures}
          />
        </DetailSection>
        <DetailSection
          title={panopticonMonitoringArchitecture.title}
          className="mt-12"
        >
          <DetailParagraphs
            paragraphs={panopticonMonitoringArchitecture.paragraphs}
          />
          <DetailImage
            figure={panopticonMonitoringArchitecture.figures[0]}
            narrow
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title={panopticonHero.title} />
        <DetailSection
          title={panopticonRealtimeDelivery.title}
          className="mt-4"
        >
          <DetailParagraphs paragraphs={panopticonRealtimeDelivery.paragraphs} />
          <DetailImage
            figure={panopticonRealtimeDelivery.figures[0]}
            narrow
          />
        </DetailSection>
        <DetailSection
          title={panopticonDeploymentAutomation.title}
          className="mt-12"
        >
          <DetailParagraphs
            paragraphs={panopticonDeploymentAutomation.paragraphs}
          />
          <DetailImage
            figure={panopticonDeploymentAutomation.figures[0]}
            narrow
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title={panopticonHero.title} />
        <DetailSection title={panopticonRetrospective.title} className="mt-4">
          <DetailParagraphs paragraphs={panopticonRetrospective.paragraphs} />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectTitle hero={schMiniProjectHero} />
        <DetailSection title={schMiniProjectOverviewSection.title}>
          <DetailParagraphs
            paragraphs={schMiniProjectOverviewSection.paragraphs}
          />
        </DetailSection>
        <DetailSection title={schMiniProjectRoleSection.title}>
          <DetailBullets items={schMiniProjectRoleSection.bullets} />
        </DetailSection>
        <DetailSection title={schMiniProjectSkillsSection.title}>
          <PillGroup section={schMiniProjectSkillsSection} />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title={schMiniProjectHero.title} />
        <DetailSection title={schMiniProjectWorkflow.title} className="mt-4">
          <DetailParagraphs paragraphs={schMiniProjectWorkflow.paragraphs} />
          <DetailImageGrid
            figures={schMiniProjectWorkflow.figures}
          />
        </DetailSection>
        <DetailSection title={schMiniProjectDataModel.title} className="mt-12">
          <DetailParagraphs paragraphs={schMiniProjectDataModel.paragraphs} />
          <DetailImageGrid
            columns={1}
            figures={schMiniProjectDataModel.figures.map((figure) => ({
              ...figure,
              imageWidth: "75",
              captionWidth: "75",
            }))}
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title={schMiniProjectHero.title} />
        <DetailSection
          title={schMiniProjectAuthAuthorization.title}
          className="mt-4"
        >
          <DetailParagraphs
            paragraphs={schMiniProjectAuthAuthorization.paragraphs}
          />
        </DetailSection>
        <DetailImageGrid
          columns={1}
          figures={schMiniProjectAuthAuthorization.figures}
        />
        <DetailSection
          title={schMiniProjectSecurityValidation.title}
          className="mt-12"
        >
          <DetailParagraphs
            paragraphs={schMiniProjectSecurityValidation.paragraphs}
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title={schMiniProjectHero.title} />
        <section className="mt-4 grid gap-4">
          <SubHeading>{schMiniProjectFrontendValidation.title}</SubHeading>
          <DetailParagraphs
            paragraphs={schMiniProjectFrontendValidation.paragraphs}
          />
          <SubHeading>{schMiniProjectServerValidation.title}</SubHeading>
          <DetailParagraphs
            paragraphs={schMiniProjectServerValidation.paragraphs}
          />
          <SubHeading>{schMiniProjectDownloadSecurity.title}</SubHeading>
          <DetailParagraphs
            paragraphs={schMiniProjectDownloadSecurity.paragraphs}
          />
        </section>
        <DetailSection
          title={schMiniProjectAuditLogging.title}
          className="mt-12"
        >
          <DetailParagraphs paragraphs={schMiniProjectAuditLogging.paragraphs} />
          <DetailImage
            figure={schMiniProjectAuditLogging.figures[0]}
            narrow
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title={schMiniProjectHero.title} />
        <DetailSection
          title={schMiniProjectDeploymentEnvironment.title}
          className="mt-4"
        >
          <SubHeading>{schMiniProjectDeploymentIncident.title}</SubHeading>
          <DetailParagraphs
            paragraphs={schMiniProjectDeploymentIncident.paragraphs}
          />
          <SubHeading>{schMiniProjectDeploymentCause.title}</SubHeading>
          <DetailParagraphs
            paragraphs={schMiniProjectDeploymentCause.paragraphs}
          />
          <SubHeading>{schMiniProjectDeploymentRecovery.title}</SubHeading>
          <DetailParagraphs
            paragraphs={schMiniProjectDeploymentRecovery.paragraphs}
          />
        </DetailSection>
        <DetailSection title={schMiniProjectRetrospective.title} className="mt-12">
          <DetailParagraphs paragraphs={schMiniProjectRetrospective.paragraphs} />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <PdfSection className="mt-0">
          <PDFSectionTitle>경험</PDFSectionTitle>
          <div className="mt-4 grid gap-4">
            {experience.primary.map((item) => (
              <PDFExperienceRow
                key={`${item.title}-${item.role}-${item.period}`}
                item={item}
              />
            ))}
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
          <PDFSectionTitle>수상 내역</PDFSectionTitle>
          <PDFAwardList items={awards} />
        </PdfSection>

        <PdfSection>
          <PDFSectionTitle>프로필</PDFSectionTitle>
          <PDFProfile data={portfolioProfile} />
        </PdfSection>
      </PdfPage>

      <PdfPage>
        <SectionHeading>Other Projects</SectionHeading>
        <div className="mt-4 grid gap-7">
          {otherProjects.slice(0, 3).map((project) => (
            <OtherProjectItem key={project.title} project={project} />
          ))}
        </div>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="Other Projects" />
        <div className="mt-4 grid gap-7">
          {otherProjects.slice(3, 6).map((project) => (
            <OtherProjectItem key={project.title} project={project} />
          ))}
        </div>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="Other Projects" />
        <div className="mt-4 grid gap-7">
          {otherProjects.slice(6).map((project) => (
            <OtherProjectItem key={project.title} project={project} />
          ))}
        </div>
      </PdfPage>
    </PdfDocument>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-[18px] font-semibold leading-tight tracking-normal text-black">
      {children}
    </h2>
  );
}

type ProjectHeroData = {
  period: string;
  periodDetail?: string;
  affiliation: string;
  position: string;
  role: string | readonly string[];
};

type ProjectMetaItem = {
  label: string;
  value: string;
};

type ProjectSkillData = {
  emphasized: readonly string[];
  items: readonly string[];
};

type DetailFigureData = {
  src: string;
  alt: string;
  caption: string;
};

type DetailFigureViewData = DetailFigureData & {
  imageWidth?: "75" | "80" | "90";
  captionWidth?: "75" | "90";
};

function projectMeta(project: ProjectHeroData) {
  const period = project.periodDetail
    ? `${project.period} ${project.periodDetail}`
    : project.period;
  const role =
    typeof project.role === "string"
      ? project.role
      : project.role.join(" / ");

  return [
    { label: "Period", value: period },
    { label: "Position", value: `${project.affiliation} / ${project.position}` },
    { label: "Role", value: role },
  ] satisfies ProjectMetaItem[];
}

function DetailParagraphs({
  paragraphs,
}: {
  paragraphs: readonly string[];
}) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <DetailText key={paragraph}>{paragraph}</DetailText>
      ))}
    </>
  );
}

function ProjectTitle({
  hero,
}: {
  hero: ProjectHeroData & {
    eyebrow: string;
    title: string;
    description: string;
  };
}) {
  const meta = projectMeta(hero);

  return (
    <header>
      <p className="text-[11px] uppercase tracking-[0.22em] text-[#737373]">
        {hero.eyebrow}
      </p>
      <h1 className="mt-4 font-display text-[34px] font-semibold leading-[1.08] tracking-normal text-black">
        {hero.title}
      </h1>
      <p className="mt-3 text-[14px] leading-relaxed text-[#737373]">
        {hero.description}
      </p>
      <section className="mt-8 grid grid-cols-3 gap-6 border-y border-[#e5e5e5] py-5">
        {meta.map((item) => (
          <p
            key={item.label}
            className="text-[11px] leading-relaxed text-[#737373]"
          >
            <span className="block font-medium uppercase tracking-[0.16em]">
              {item.label}
            </span>
            <span className="mt-2 block">{item.value}</span>
          </p>
        ))}
      </section>
    </header>
  );
}

function ProjectContinuation({ title }: { title: string }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#737373]">
      {title}
    </p>
  );
}

function DetailSection({
  title,
  children,
  className = "mt-16",
  headingLevel = "h2",
}: {
  title: string;
  children: ReactNode;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const headingClassName =
    headingLevel === "h3"
      ? "pt-1 text-[15px] font-semibold leading-relaxed tracking-normal text-black"
      : "font-heading text-[21px] font-medium leading-[1.33] tracking-normal text-black";

  return (
    <section className={`${className} grid gap-4`}>
      <Heading className={headingClassName}>
        {title}
      </Heading>
      {children}
    </section>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="pt-1 text-[15px] font-semibold leading-relaxed tracking-normal text-black">
      {children}
    </h3>
  );
}

function DetailText({ children }: { children: string }) {
  return (
    <p className="text-[13px] font-normal leading-relaxed tracking-normal text-[#737373]">
      {renderEmphasisSegments(children)}
    </p>
  );
}

function DetailBullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-2 text-[13px] font-normal leading-relaxed tracking-normal text-[#737373]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-black"
            aria-hidden="true"
          />
          <span>{renderEmphasisSegments(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function renderEmphasisSegments(text: string): ReactNode {
  const segments: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*/g;
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;

    if (index > cursor) {
      segments.push(text.slice(cursor, index));
    }

    segments.push(
      <strong key={`${match[1]}-${index}`} className="font-medium text-black">
        {match[1]}
      </strong>,
    );
    cursor = index + match[0].length;
  }

  if (segments.length === 0) {
    return text;
  }

  if (cursor < text.length) {
    segments.push(text.slice(cursor));
  }

  return segments;
}

function DetailImage({
  figure,
  compact = false,
  narrow = false,
}: {
  figure: DetailFigureData;
  compact?: boolean;
  narrow?: boolean;
}) {
  return (
    <figure className="grid gap-2">
      <div
        className={`flex ${
          narrow ? "" : compact ? "h-[50mm]" : "h-[58mm]"
        } items-center justify-center overflow-hidden ${narrow ? "" : "px-6"}`}
      >
        <img
          src={figure.src}
          alt={figure.alt}
          className={`max-h-full object-contain ${narrow ? "w-[90%]" : "w-full"}`}
        />
      </div>
      <figcaption
        className={`text-[10px] leading-relaxed text-[#737373] ${
          narrow ? "mx-auto w-[90%]" : ""
        }`}
      >
        {figure.caption}
      </figcaption>
    </figure>
  );
}

function DetailImageGrid({
  figures,
  columns = 2,
  wide = false,
}: {
  figures: readonly DetailFigureViewData[];
  columns?: 1 | 2;
  wide?: boolean;
}) {
  const isSingleColumn = columns === 1;

  return (
    <div
      className={`grid ${isSingleColumn ? "grid-cols-1" : "grid-cols-2"} ${
        wide ? "-mx-4 gap-4" : "gap-5"
      }`}
    >
      {figures.map((figure) => (
        <figure key={figure.src} className="grid gap-2">
          <div
            className={`flex ${
              isSingleColumn ? "" : "h-[42mm]"
            } items-center justify-center overflow-hidden`}
          >
            <img
              src={figure.src}
              alt={figure.alt}
              className={`${
                isSingleColumn
                  ? figure.imageWidth === "75"
                    ? "w-[75%]"
                    : figure.imageWidth === "80"
                    ? "w-[80%]"
                    : "w-[90%]"
                  : "w-full"
              } object-contain ${
                isSingleColumn ? "h-auto" : "max-h-full"
              }`}
            />
          </div>
          <figcaption
            className={`text-[10px] leading-relaxed text-[#737373] ${
              isSingleColumn
                ? figure.captionWidth === "75"
                  ? "mx-auto w-[75%]"
                  : "mx-auto w-[90%]"
                : ""
            }`}
          >
            {figure.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function PillGroup({ section }: { section: ProjectSkillData }) {
  const items = [...section.emphasized, ...section.items];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <Pill key={item} strong={index < section.emphasized.length}>
          {item}
        </Pill>
      ))}
    </div>
  );
}

function OtherProjectItem({
  project,
}: {
  project: (typeof otherProjects)[number];
}) {
  return (
    <article className="border-t border-[#e5e5e5] pt-5">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="font-heading text-[18px] font-semibold leading-[1.35] tracking-normal text-black">
            {project.title} - {project.subtitle}
          </h3>
          <p className="mt-2 text-[12px] font-normal leading-relaxed tracking-normal text-[#737373]">
            {project.affiliation} · {project.period}
          </p>
        </div>
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 shrink-0 items-center rounded-full border border-[#d4d4d4] px-3 text-[11px] font-medium leading-none text-[#525252]"
          >
            GitHub ↗
          </a>
        ) : null}
      </div>
      <p className="mt-4 text-[13px] font-normal leading-relaxed tracking-normal text-[#525252]">
        {project.summary}
      </p>
      <ul className="mt-3 grid gap-1.5 text-[12px] font-normal leading-relaxed tracking-normal text-[#737373]">
        {project.highlights.map((text) => (
          <li key={text} className="flex gap-3">
            <span
              className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-black"
              aria-hidden="true"
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((skill) => (
          <Pill key={skill}>{skill}</Pill>
        ))}
      </div>
    </article>
  );
}

function Pill({
  children,
  strong = false,
}: {
  children: string;
  strong?: boolean;
}) {
  return (
    <span
      className={`inline-flex h-8 items-center rounded-full px-3 text-[12px] leading-none tracking-normal ${
        strong
          ? "bg-[#eeeeee] font-medium text-black"
          : "bg-[#fafafa] font-normal text-[#737373]"
      }`}
    >
      {children}
    </span>
  );
}
