import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  BookOpenText,
  ChevronDown,
  Globe,
  Mail,
  Phone,
} from "lucide-react";
import { ExpandableImage } from "@/app/_components/common/expandable-image";
import { SectionHeading } from "@/app/_components/common/section-heading";
import { SectionNavigation } from "@/app/_components/navigation/section-navigation";
import { otherProjects } from "@/content/other-projects";
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
  projectSummary,
} from "@/content/data";

export default function Home() {
  const mainPageContact = contact.filter((item) => item.type !== "portfolio");

  const architecturalDiagrams = [
    {
      src: "/projects/dobonglife/dobonglife-aws-infra-v3.jpg",
      alt: "도봉라이프 V3 AWS 인프라 아키텍처 다이어그램",
      caption: "도봉라이프 인프라 아키텍처 - V3",
      width: 4197,
      height: 3811,
    },
    {
      src: "/projects/dobonglife/dobonglife-ci-cd-v3.jpg",
      alt: "도봉라이프 V3 CI/CD 아키텍처 다이어그램",
      caption: "도봉라이프 CI/CD 파이프라인 - V3",
      width: 4995,
      height: 3202,
    },
    {
      src: "/projects/dobonglife/dobonglife-aws-infra-v1.jpg",
      alt: "도봉라이프 V1 AWS 인프라 아키텍처 다이어그램",
      caption: "도봉라이프 인프라 아키텍처 - V1",
      width: 5800,
      height: 2758,
    },
    {
      src: "/projects/dobonglife/dobonglife-ci-cd-v1.jpg",
      alt: "도봉라이프 V1 CI/CD 아키텍처 다이어그램",
      caption: "도봉라이프 CI/CD 파이프라인 - V1",
      width: 4598,
      height: 3479,
    },
    {
      src: "/projects/dobonglife/dobonglife-aws-infra-v2.jpg",
      alt: "도봉라이프 V2 AWS 인프라 아키텍처 다이어그램",
      caption: "도봉라이프 인프라 아키텍처 - V2",
      width: 5333,
      height: 2999,
    },
    {
      src: "/projects/dobonglife/dobonglife-ci-cd-v2.jpg",
      alt: "도봉라이프 V2 CI/CD 아키텍처 다이어그램",
      caption: "도봉라이프 CI/CD 파이프라인 - V2",
      width: 5756,
      height: 2779,
    },
    {
      src: "/projects/panopticon/panopticon-system-architecture.jpg",
      alt: "판옵티콘 전체 아키텍처 다이어그램",
      caption: "판옵티콘 전체 아키텍처",
      width: 4879,
      height: 3279,
    },
    {
      src: "/projects/panopticon/panopticon-ci-cd.jpg",
      alt: "판옵티콘 self-hosted runner CI/CD 시퀀스 다이어그램",
      caption: "판옵티콘 CI/CD 파이프라인",
      width: 4765,
      height: 3357,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SectionNavigation />

      <main className="mx-auto max-w-[760px] px-5 pt-12 sm:px-6">
        <header className="flex flex-col gap-4 py-[88px]">
          <p className="text-xs uppercase tracking-[0.22em] text-[#737373]">
            Portfolio 2026
          </p>
          <h1 className="font-display text-[48px] font-semibold leading-[1.04] tracking-normal text-black sm:text-[56px]">
            {profile.displayName}
          </h1>
        </header>

        <section id="about" className="flex flex-col gap-[88px] py-[88px]">
          {about.map((section, sectionIndex) => (
            <section key={section.title} className="flex flex-col gap-4">
              <h2 className="font-heading text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
                {section.title}
              </h2>
              <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
                {section.body}
              </p>
              {sectionIndex === 0 ? (
                <div className="relative">
                  <div className="flex gap-4 overflow-x-auto overflow-y-hidden pr-8 [scrollbar-width:none] [-webkit-mask-image:linear-gradient(to_right,black_calc(100%_-_56px),transparent)] [-webkit-overflow-scrolling:touch] [mask-image:linear-gradient(to_right,black_calc(100%_-_56px),transparent)] [&::-webkit-scrollbar]:hidden">
                    {architecturalDiagrams.map((diagram, index) => (
                      <figure key={index} className="shrink-0">
                        <ExpandableImage
                          src={diagram.src}
                          alt={diagram.alt}
                          width={diagram.width}
                          height={diagram.height}
                          unoptimized
                          wrapperClassName="block h-32"
                          className="h-full w-auto max-w-none object-contain object-top"
                        />
                        <figcaption className="mt-2 text-xs font-normal leading-[1.33] tracking-normal text-[#737373]">
                          {diagram.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          ))}
        </section>

        <section id="projects" className="py-[88px]">
          <SectionHeading>Projects</SectionHeading>

          <div className="mt-6 divide-y divide-[#e5e5e5] border-y border-[#e5e5e5]">
            {projectSummary.map((project, index) => (
              <Link
                key={index}
                href={project.link}
                aria-label={`${project.title} 프로젝트 상세 보기`}
                className="group block cursor-pointer py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-heading text-2xl font-bold leading-[1.33] tracking-normal text-black">
                        {project.title}
                      </h3>
                      <span className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full bg-black px-3.5 text-xs font-medium leading-none text-white transition-colors group-hover:bg-[#090909]">
                        상세 보기
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </div>
                    <p className="text-sm font-normal leading-relaxed tracking-normal text-[#737373] sm:whitespace-nowrap">
                      {project.affiliation} | {project.position} |{" "}
                      {project.period}
                    </p>
                  </div>
                  <div className="w-full overflow-hidden px-0 py-2 sm:px-16">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      width={project.image.width}
                      height={project.image.height}
                      unoptimized
                      className="h-auto w-full object-contain object-left-top"
                    />
                  </div>
                  <ul className="grid gap-2 text-base font-normal leading-relaxed tracking-normal text-[#525252]">
                    {project.summary.map((text, index) => (
                      <li key={index} className="flex gap-3">
                        <span
                          className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-black"
                          aria-hidden="true"
                        />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((skill, index) => (
                        <span
                          key={index}
                          className={`inline-flex h-8 items-center rounded-full px-3 text-sm leading-none tracking-normal ${skill.primary ? "bg-[#eeeeee] font-medium text-black" : "bg-[#fafafa] font-normal text-[#737373]"}`}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-center gap-2 py-4 text-sm font-medium text-[#737373] transition-colors hover:text-black focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-black [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">그 외 프로젝트 더보기</span>
                <span className="hidden group-open:inline">
                  그 외 프로젝트 접기
                </span>
                <ChevronDown className="h-4 w-4 text-current transition-transform group-open:rotate-180" />
              </summary>
              <div>
                {otherProjects.map((project) => (
                  <article
                    key={project.title}
                    className="border-t border-[#e5e5e5] py-6"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div>
                        <h3 className="font-heading text-xl font-semibold leading-[1.35] tracking-normal text-black">
                          {project.title}
                          {" - "}
                          {project.subtitle}
                        </h3>
                      </div>
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="relative z-10 inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full border border-[#d4d4d4] bg-white px-3 text-sm font-medium leading-none text-black transition-colors hover:bg-[#f5f5f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                          aria-label={`${project.title} GitHub 저장소 열기`}
                        >
                          <GitHubIcon />
                          GitHub
                          <ArrowUpRight
                            className="-ml-1 h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </a>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm font-normal leading-relaxed tracking-normal text-[#737373]">
                      {project.affiliation} | {project.period}
                    </p>
                    <p className="mt-4 text-base font-normal leading-relaxed tracking-normal text-[#525252]">
                      {project.summary}
                    </p>
                    <ul className="mt-4 grid gap-2 text-sm font-normal leading-relaxed tracking-normal text-[#737373]">
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
                        <span
                          key={skill}
                          className="inline-flex h-7 items-center rounded-full bg-[#fafafa] px-3 text-xs font-normal leading-none tracking-normal text-[#737373]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </details>
          </div>
        </section>

        <section id="experience" className="py-[88px]">
          <SectionHeading>Experience</SectionHeading>

          <div className="mt-6 border-b border-[#e5e5e5]">
            {experience.primary.map((item) => (
              <div
                key={`${item.period}-${item.title}`}
                className="border-t border-[#e5e5e5] py-6"
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                  {item.period}
                </p>
                <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                  <h4 className="text-[17px] font-medium leading-relaxed text-black">
                    {item.title}
                  </h4>
                  <p className="text-sm font-medium text-[#737373]">
                    {item.role}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#737373]">
                  {item.description.join(" · ")}
                </p>
              </div>
            ))}

            <details className="group border-t border-[#e5e5e5]">
              <summary className="flex cursor-pointer list-none items-center justify-center gap-2 py-4 text-sm font-medium text-[#737373] transition-colors hover:text-black focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-black [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">그 외 경험 더보기</span>
                <span className="hidden group-open:inline">
                  그 외 경험 접기
                </span>
                <ChevronDown className="h-4 w-4 text-current transition-transform group-open:rotate-180" />
              </summary>
              <div>
                {experience.additional.map((item) => (
                  <div
                    key={`${item.period}-${item.title}`}
                    className="border-t border-[#e5e5e5] py-6"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                      {item.period}
                    </p>
                    <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                      <h4 className="text-[17px] font-medium leading-relaxed text-black">
                        {item.title}
                      </h4>
                      <p className="text-sm font-medium text-[#737373]">
                        {item.role}
                      </p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#737373]">
                      {item.description.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </section>

        <section id="awards" className="py-[88px]">
          <SectionHeading>Awards</SectionHeading>

          <div className="mt-6 grid gap-6">
            {awards.map((award) => (
              <div
                key={`${award.date}-${award.title}`}
                className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-8"
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                  {award.date} · {award.prize}
                </p>
                <div>
                  <p className="text-[15px] font-medium text-black">
                    {award.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#737373]">
                    {award.project}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="py-[88px]">
          <SectionHeading>Skills &amp; Tools</SectionHeading>

          <div className="mt-6 grid gap-6">
            {skills.map((group) => (
              <div
                key={group.title}
                className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-8"
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                  {group.title}
                </p>
                <p className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex h-8 items-center rounded-full bg-[#fafafa] px-3 text-sm font-medium leading-none text-black"
                    >
                      {skill}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="profile" className="py-[88px]">
          <SectionHeading>Profile</SectionHeading>

          <div className="mt-6 grid gap-6">
            {[
              {
                label: "Education",
                title: `${education.school} ${education.major}`,
                description: `${education.status} · ${education.period} · ${education.grade}`,
              },
              {
                label: publication.label,
                title: publication.title,
                description: publication.description,
                href: publication.href,
                ariaLabel: publication.ariaLabel,
              },
              {
                label: "Language",
                title: `${language.name} ${language.score}`,
                description: language.date,
              },
              {
                label: "Military",
                title: `${military.type} ${military.state}`,
                description: `${military.branch} · ${military.period}`,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-8"
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                  {item.label}
                </p>
                <div>
                  <p className="text-[15px] font-medium text-black">
                    {item.title}
                  </p>
                  {"href" in item ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.ariaLabel}
                      className="mt-1 inline-flex items-center gap-1 text-xs leading-relaxed text-[#737373] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                    >
                      {item.description}
                      <ArrowUpRight
                        className="h-3 w-3 shrink-0 text-current"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <p className="mt-1 text-xs leading-relaxed text-[#737373]">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-[88px]">
          <SectionHeading>Contact</SectionHeading>

          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            {mainPageContact.map((item) => {
              const isExternal = "external" in item && item.external;

              return (
                <div key={item.href} className="flex items-center gap-3">
                  <ContactIcon type={item.type} />
                  <a
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="text-[15px] font-medium text-black hover:underline"
                  >
                    {item.value}
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-[760px] px-5 sm:px-6">
        <div className="py-8 text-center">
          <p className="text-[11px] text-[#a3a3a3]">
            &copy; 2026 {profile.name} ({profile.englishName}) &mdash; All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function ContactIcon({
  type,
}: {
  type: (typeof contact)[number]["type"];
}) {
  switch (type) {
    case "phone":
      return (
        <Phone className="h-4 w-4 shrink-0 text-black" aria-hidden="true" />
      );
    case "email":
      return (
        <Mail className="h-4 w-4 shrink-0 text-black" aria-hidden="true" />
      );
    case "portfolio":
      return (
        <Globe className="h-4 w-4 shrink-0 text-black" aria-hidden="true" />
      );
    case "github":
      return <GitHubIcon />;
    case "blog":
      return (
        <BookOpenText
          className="h-4 w-4 shrink-0 text-black"
          aria-hidden="true"
        />
      );
  }
}

function GitHubIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-black"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      focusable="false"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.385.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.238 1.839 1.238 1.071 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.304-5.467-1.332-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.568 21.796 24 17.299 24 12c0-6.63-5.373-12-12-12z" />
    </svg>
  );
}
