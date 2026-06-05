import { ProjectFigure as DiagramFigure } from "@/app/_components/project/project-figure";
import { ProjectHero } from "@/app/_components/project/project-hero";
import { ProjectPageLayout } from "@/app/_components/project/project-page-layout";
import { SectionHeading } from "@/app/_components/common/section-heading";
import { SkillIcon } from "@/app/_components/common/skill-icon";
import { panopticon } from "@/content/panopticon";

export const metadata = panopticon.metadata;

const {
  hero,
  overviewSection,
  roleSection,
  sectionLinks,
  sections,
  skillsSection,
} = panopticon;

type Figure = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

type ProjectSection = (typeof sections)[number];

export default function PanopticonPage() {
  return (
    <ProjectPageLayout sectionLinks={sectionLinks}>
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
        {section.paragraphs.map((paragraph) => (
          <ProjectParagraph key={paragraph}>{paragraph}</ProjectParagraph>
        ))}
        {"figures" in section ? (
          <FigureGroup
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

function ProjectParagraph({ children }: { children: string }) {
  return (
    <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
      {children}
    </p>
  );
}

function FigureGroup({
  figures,
  label,
}: {
  figures: readonly Figure[];
  label?: string;
}) {
  if (label) {
    return (
      <div
        className="-mx-5 overflow-x-auto overflow-y-hidden px-5 pb-1 [scrollbar-width:none] [-webkit-mask-image:linear-gradient(to_right,black_calc(100%_-_56px),transparent)] [-webkit-overflow-scrolling:touch] [mask-image:linear-gradient(to_right,black_calc(100%_-_56px),transparent)] sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
        aria-label={label}
      >
        <div className="flex snap-x snap-mandatory gap-5">
          {figures.map((figure) => (
            <div
              key={figure.src}
              className="w-[82vw] max-w-[381px] flex-none snap-start sm:w-[74vw] md:w-[381px]"
            >
              <ProjectFigure figure={figure} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (figures.length === 1) {
    return <ProjectFigure figure={figures[0]} inset />;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {figures.map((figure) => (
        <ProjectFigure key={figure.src} figure={figure} />
      ))}
    </div>
  );
}

function ProjectFigure({
  figure,
  inset = false,
}: {
  figure: Figure;
  inset?: boolean;
}) {
  return (
    <DiagramFigure
      src={figure.src}
      alt={figure.alt}
      width={figure.width}
      height={figure.height}
      figureClassName={inset ? "px-8" : undefined}
      caption={figure.caption}
    />
  );
}
