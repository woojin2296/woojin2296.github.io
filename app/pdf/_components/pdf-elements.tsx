import type { ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type PdfDocumentProps = {
  children: ReactNode;
};

type PdfPageProps = {
  children: ReactNode;
  dense?: boolean;
};

type SectionProps = {
  children: ReactNode;
  className?: string;
};

type PDFSectionTitleProps = {
  children: ReactNode;
};

type PDFContactItem = {
  type: string;
  href: string;
  label: string;
  value: string;
  external?: boolean;
};

type PDFContactProps = {
  items: readonly PDFContactItem[];
};

type PDFProfileProps = {
  education: {
    school: string;
    major: string;
    status: string;
    period: string;
    grade: string;
  };
  language: {
    language: string;
    name: string;
    score: string | number;
    date: string;
  };
  military: {
    type: string;
    state: string;
    branch: string;
    period: string;
  };
  publication: {
    title: string;
    href: string;
  };
};

type PDFSkillStackGroup = {
  title: string;
  skills: readonly string[];
};

type PDFSkillStackProps = {
  items: readonly PDFSkillStackGroup[];
};

type PDFExperienceRowProps = {
  title: string;
  role: string;
  period: string;
  description: readonly string[];
  emphasized?: boolean;
};

type PDFAwardRowProps = {
  date: string;
  prize: string;
  title: string;
  project: string;
};

type PDFAwardListProps = {
  items: readonly PDFAwardRowProps[];
};

type ImageFigureProps = {
  src: string;
  alt: string;
  caption: string;
};

export function PdfDocument({ children }: PdfDocumentProps) {
  return (
    <main className="min-h-screen bg-[#f3f4f6] py-8 text-black print:bg-white print:py-0">
      <style>{`
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>
      <div className="mx-auto grid w-[210mm] gap-6 print:w-full print:gap-0">
        {children}
      </div>
    </main>
  );
}

export function PdfPage({ children, dense = false }: PdfPageProps) {
  return (
    <section
      className={`mx-auto h-[297mm] w-[210mm] overflow-hidden bg-white px-[18mm] py-[16mm] shadow-sm print:h-[297mm] print:w-[210mm] print:shadow-none [&:not(:last-child)]:[break-after:page] ${
        dense ? "py-[14mm]" : ""
      }`}
    >
      {children}
    </section>
  );
}

export function PdfHeader({
  label,
  title,
  subtitle,
  right,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <header className="grid gap-5 border-b border-[#d9d9d9] pb-6 sm:grid-cols-[1fr_68mm] sm:items-end">
      <div>
        {label ? (
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#737373]">
            {label}
          </p>
        ) : null}
        <h1 className="mt-3 text-[34px] font-semibold leading-none tracking-normal text-black">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 text-[13px] leading-relaxed text-[#525252]">
            {subtitle}
          </p>
        ) : null}
      </div>
      {right ? (
        <div className="text-right text-[11px] leading-relaxed text-[#525252]">
          {right}
        </div>
      ) : null}
    </header>
  );
}

export function PdfSection({ children, className }: SectionProps) {
  return (
    <section className={twMerge(clsx("mt-12 [break-inside:avoid]", className))}>
      {children}
    </section>
  );
}

export function PDFSectionTitle({ children }: PDFSectionTitleProps) {
  return (
    <h2 className="text-[18px] font-semibold leading-tight text-black">
      {children}
    </h2>
  );
}

export function PDFSectionSubTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-[14.5px] font-semibold leading-snug text-black">
      {children}
    </h3>
  );
}

export function PDFContact({ items }: PDFContactProps) {
  return (
    <div className="mt-4 grid gap-x-8 gap-y-4 text-[13px] leading-relaxed text-black sm:grid-cols-2">
      {items.map((item) => (
        <p key={item.label} className="grid grid-cols-[20mm_1fr] gap-2">
          <span className="font-medium text-[#525252]">{item.label}</span>
          <a
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            className="text-inherit no-underline"
          >
            {item.value}
          </a>
        </p>
      ))}
    </div>
  );
}

export function PDFProfile({
  education,
  language,
  military,
  publication,
}: PDFProfileProps) {
  return (
    <div className="mt-4 grid gap-x-8 gap-y-4 text-[13px] leading-relaxed text-black sm:grid-cols-2">
      <p className="grid grid-cols-[20mm_1fr] gap-2">
        <span className="font-medium text-[#525252]">학력</span>
        <span>
          <span className="font-semibold text-black">
            {education.school} {education.major} {education.status}
          </span>
          <span className="block text-[#737373]">
            {education.period} · {education.grade}
          </span>
        </span>
      </p>
      <p className="grid grid-cols-[20mm_1fr] gap-2">
        <span className="font-medium text-[#525252]">어학</span>
        <span>
          <span className="font-semibold text-black">
            {language.language} : {language.name} {language.score}
          </span>
          <span className="block text-[#737373]">{language.date}</span>
        </span>
      </p>
      <p className="grid grid-cols-[20mm_1fr] gap-2">
        <span className="font-medium text-[#525252]">병역</span>
        <span>
          <span className="font-semibold text-black">
            {`군필 : ${military.type} ${military.state} (${military.branch})`}
          </span>
          <span className="block text-[#737373]">{military.period}</span>
        </span>
      </p>
      <p className="grid grid-cols-[20mm_1fr] gap-2">
        <span className="font-medium text-[#525252]">논문</span>
        <span>
          <span>{publication.title.replace("(KCC2025)", "")}</span>
          <a
            href={publication.href}
            target="_blank"
            rel="noreferrer"
            className="block text-[#737373] no-underline"
          >
            논문 확인하기
            <span aria-hidden="true"> ↗</span>
          </a>
        </span>
      </p>
    </div>
  );
}

export function PDFSkillStack({ items }: PDFSkillStackProps) {
  return (
    <ul className="mt-4 grid gap-2 text-[13px] leading-relaxed text-black">
      {items.map((group) => (
        <li
          key={group.title}
          className="grid grid-cols-[8px_28mm_1fr] gap-3"
        >
          <span className="mt-[0.75em] h-1 w-1 rounded-full bg-black" />
          <span className="font-medium text-[#525252]">{group.title}</span>
          <span>{group.skills.join(", ")}</span>
        </li>
      ))}
    </ul>
  );
}

export function PDFExperienceRow({
  title,
  role,
  period,
  description,
  emphasized = true,
}: PDFExperienceRowProps) {
  return (
    <article className="[break-inside:avoid]">
      <div className="flex items-baseline gap-2">
        {emphasized ? (
          <PDFSectionSubTitle>{title}</PDFSectionSubTitle>
        ) : (
          <p className="text-[14.5px] font-normal leading-snug text-[#525252]">
            {title}
          </p>
        )}
        <p className="text-[12px] leading-relaxed text-[#737373]">
          {emphasized ? `| ${role} | ${period}` : `| ${role} · ${period}`}
        </p>
      </div>
      <p className="mt-2 text-[12.5px] leading-relaxed text-[#525252]">
        {description.join(" · ")}
      </p>
    </article>
  );
}

export function PDFAwardRow({ date, prize, title, project }: PDFAwardRowProps) {
  return (
    <div className="grid grid-cols-[33mm_1fr] items-start gap-8">
      <p className="text-[12px] font-medium leading-relaxed tracking-[0.16em] text-[#737373]">
        {date} · {prize}
      </p>
      <div>
        <p className="text-[14px] font-semibold leading-snug text-black">
          {title}
        </p>
        <p className="mt-2 text-[12.5px] font-normal leading-relaxed text-[#737373]">
          {project}
        </p>
      </div>
    </div>
  );
}

export function PDFAwardList({ items }: PDFAwardListProps) {
  return (
    <div className="mt-4 grid gap-4">
      {items.map((award) => (
        <PDFAwardRow
          key={`${award.date}-${award.title}`}
          date={award.date}
          prize={award.prize}
          title={award.title}
          project={award.project}
        />
      ))}
    </div>
  );
}

export function MetaLine({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-[12px] leading-relaxed text-[#737373]">{children}</p>;
}

export function BodyText({ children }: { children: ReactNode }) {
  return <p className="text-[13px] mt-2 leading-relaxed text-[#525252]">{children}</p>;
}

export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="grid gap-1.5 text-[12.5px] leading-relaxed text-[#525252]">
      {items.map((item, index) => (
        <li
          key={typeof item === "string" ? item : index}
          className="grid grid-cols-[10px_1fr] gap-2"
        >
          <span className="mt-[0.7em] h-1 w-1 rounded-full bg-black" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex h-6 items-center rounded-full bg-[#f2f2f2] px-2.5 text-[10.5px] font-medium leading-none text-black"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function ImageFigure({ src, alt, caption }: ImageFigureProps) {
  return (
    <figure className="grid gap-2 [break-inside:avoid]">
      <div className="flex h-[56mm] items-center justify-center overflow-hidden border border-[#e5e5e5] bg-white p-3">
        <img src={src} alt={alt} className="max-h-full w-full object-contain" />
      </div>
      <figcaption className="text-[9.5px] leading-relaxed text-[#737373]">
        {caption}
      </figcaption>
    </figure>
  );
}

export function KeyValueGrid({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
      {items.map((item) => (
        <div key={item.label}>
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#737373]">
            {item.label}
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-black">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
