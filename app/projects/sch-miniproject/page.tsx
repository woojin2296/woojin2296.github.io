import { ArrowUpRight } from "lucide-react";
import { ProjectFigure as DiagramFigure } from "@/app/_components/project/project-figure";
import { ProjectHero } from "@/app/_components/project/project-hero";
import { ProjectPageLayout } from "@/app/_components/project/project-page-layout";
import { SectionHeading } from "@/app/_components/common/section-heading";
import { SkillIcon } from "@/app/_components/common/skill-icon";
import {
  hero,
  metadata as projectMetadata,
  overviewSection,
  roleSection,
  sectionLinks,
  sections,
  skillsSection,
} from "@/content/sch-miniproject";

export const metadata = projectMetadata;

type Figure = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

type ProjectSection = (typeof sections)[number];
type ProjectSubsection = NonNullable<
  Extract<ProjectSection, { subsections: readonly unknown[] }>["subsections"]
>[number];

export default function SchMiniProjectPage() {
  return (
    <ProjectPageLayout
      sectionLinks={sectionLinks}
      topAction={
        <a
          href={hero.repositoryUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-[#d4d4d4] bg-white px-3 text-sm font-medium leading-none text-black transition-colors hover:bg-[#f5f5f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          aria-label={`${hero.title} GitHub 저장소 열기`}
        >
          <GitHubIcon />
          GitHub
          <ArrowUpRight className="-ml-0.5 h-3.5 w-3.5" aria-hidden="true" />
        </a>
      }
    >
      <ProjectHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        meta={[
          {
            label: "Period",
            value: (
              <span className="flex flex-col items-center leading-relaxed">
                <span>{hero.period}</span>
                <span>{hero.periodDetail}</span>
              </span>
            ),
          },
          {
            label: "Position",
            value: (
              <span className="flex flex-col items-center leading-relaxed">
                <span>{hero.affiliation}</span>
                <span>{hero.position}</span>
              </span>
            ),
          },
          { label: "Role", value: hero.role },
        ]}
      />

      <section id={overviewSection.id} className="scroll-mt-12 pt-32">
        <SectionHeading>{overviewSection.title}</SectionHeading>
        <div className="grid gap-5">
          {overviewSection.paragraphs.map((paragraph) => (
            <ProjectParagraph key={paragraph}>{paragraph}</ProjectParagraph>
          ))}
        </div>
      </section>

      <section id={roleSection.id} className="scroll-mt-12 pt-24">
        <SectionHeading>{roleSection.title}</SectionHeading>
        <div className="grid gap-5">
          <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
            {roleSection.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id={skillsSection.id} className="scroll-mt-12 pt-24">
        <SectionHeading>{skillsSection.title}</SectionHeading>
        <div className="flex flex-wrap gap-2.5">
          {skillsSection.emphasized.map((skill) => (
            <SkillIcon key={skill} emphasized>
              {skill}
            </SkillIcon>
          ))}
          {skillsSection.items.map((skill) => (
            <SkillIcon key={skill}>{skill}</SkillIcon>
          ))}
        </div>
      </section>

      {sections.map((section) => (
        <ProjectContentSection key={section.id} section={section} />
      ))}
    </ProjectPageLayout>
  );
}

function ProjectContentSection({ section }: { section: ProjectSection }) {
  return (
    <section id={section.id} className="scroll-mt-12 pt-24">
      <SectionHeading>{section.title}</SectionHeading>
      <div className="grid gap-5">
        {"paragraphs" in section
          ? section.paragraphs.map((paragraph) => (
              <ProjectParagraph key={paragraph}>{paragraph}</ProjectParagraph>
            ))
          : null}
        {"subsections" in section
          ? section.subsections.map((subsection) => (
              <ProjectSubsectionBlock
                key={`${section.id}-${subsection.title}`}
                sectionId={section.id}
                subsection={subsection}
              />
            ))
          : null}
        {"figures" in section ? (
          <FigureGroup
            sectionId={section.id}
            figures={section.figures}
            label={
              "figureGroupLabel" in section
                ? section.figureGroupLabel
                : undefined
            }
          />
        ) : null}
      </div>
    </section>
  );
}

function ProjectSubsectionBlock({
  sectionId,
  subsection,
}: {
  sectionId: string;
  subsection: ProjectSubsection;
}) {
  const isIncidentSection = sectionId === "deployment-environment";

  return (
    <>
      {isIncidentSection ? (
        <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
          {subsection.title}
        </h4>
      ) : (
        <h3 className="pt-4 text-[19px] font-medium leading-[1.4] tracking-normal text-black">
          {subsection.title}
        </h3>
      )}
      {subsection.paragraphs.map((paragraph) => (
        <ProjectParagraph key={paragraph}>{paragraph}</ProjectParagraph>
      ))}
    </>
  );
}

function ProjectParagraph({ children }: { children: string }) {
  return (
    <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
      {children}
    </p>
  );
}

function FigureGroup({
  sectionId,
  figures,
  label,
}: {
  sectionId: string;
  figures: readonly Figure[];
  label?: string;
}) {
  if (sectionId === "pms-workflow") {
    return (
      <div className="grid grid-cols-2 gap-5" aria-label={label}>
        {figures.map((figure) => (
          <ProjectFigure key={figure.src} figure={figure} />
        ))}
      </div>
    );
  }

  if (sectionId === "data-model") {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        {figures.map((figure) => (
          <ProjectFigure key={figure.src} figure={figure} />
        ))}
      </div>
    );
  }

  if (sectionId === "auth-authorization") {
    return (
      <div className="grid gap-6 px-4 sm:px-8">
        {figures.map((figure) => (
          <ProjectFigure key={figure.src} figure={figure} />
        ))}
      </div>
    );
  }

  if (sectionId === "audit-logging") {
    return (
      <div className="px-4 sm:px-8">
        {figures.map((figure) => (
          <ProjectFigure key={figure.src} figure={figure} />
        ))}
      </div>
    );
  }

  if (figures.length === 1) {
    return <ProjectFigure figure={figures[0]} />;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {figures.map((figure) => (
        <ProjectFigure key={figure.src} figure={figure} />
      ))}
    </div>
  );
}

function ProjectFigure({ figure }: { figure: Figure }) {
  return (
    <DiagramFigure
      src={figure.src}
      alt={figure.alt}
      width={figure.width}
      height={figure.height}
      caption={figure.caption}
    />
  );
}

function GitHubIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 text-current"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      focusable="false"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.385.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.238 1.839 1.238 1.071 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.304-5.467-1.332-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.568 21.796 24 17.299 24 12c0-6.63-5.373-12-12-12z" />
    </svg>
  );
}
