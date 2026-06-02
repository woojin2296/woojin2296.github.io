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
} from "@/content/dobonglife";

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

export default function DobongLifePage() {
  return (
    <ProjectPageLayout sectionLinks={sectionLinks}>
      <ProjectHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        meta={[
          { label: "Period", value: hero.period },
          {
            label: "Position",
            value: (
              <>
                {hero.affiliation} <br />
                {hero.position}
              </>
            ),
          },
          {
            label: "Role",
            value: (
              <span className="flex flex-col items-center leading-relaxed">
                {hero.role.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </span>
            ),
          },
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
                subsection={subsection}
              />
            ))
          : null}
        {"figures" in section ? <FigureGroup figures={section.figures} /> : null}
      </div>
    </section>
  );
}

function ProjectSubsectionBlock({
  subsection,
}: {
  subsection: ProjectSubsection;
}) {
  return (
    <>
      <h3
        id={"id" in subsection ? subsection.id : undefined}
        className="scroll-mt-12 pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black"
      >
        {subsection.title}
      </h3>
      {"paragraphs" in subsection
        ? subsection.paragraphs.map((paragraph) => (
            <ProjectParagraph key={paragraph}>{paragraph}</ProjectParagraph>
          ))
        : null}
      {"figures" in subsection ? (
        <FigureGroup figures={subsection.figures} />
      ) : null}
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

function FigureGroup({ figures }: { figures: readonly Figure[] }) {
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
