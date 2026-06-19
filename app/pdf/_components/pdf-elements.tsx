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

type PDFProfileData = {
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

type PDFProfileProps = {
  data: PDFProfileData;
};

type PDFSkillStackGroup = {
  title: string;
  skills: readonly string[];
};

type PDFSkillStackProps = {
  items: readonly PDFSkillStackGroup[];
};

type PDFExperienceItem = {
  title: string;
  role: string;
  period: string;
  description: readonly string[];
};

type PDFExperienceRowProps = {
  item: PDFExperienceItem;
  emphasized?: boolean;
};

type PDFAwardItem = {
  date: string;
  prize: string;
  title: string;
  project: string;
};

type PDFAwardListProps = {
  items: readonly PDFAwardItem[];
};

export function PdfDocument({ children }: PdfDocumentProps) {
  return (
    <main className="min-h-screen bg-[#f3f4f6] py-8 text-black print:bg-white print:py-0">
      <style>{`
        @page {
          size: A4;
          margin: 0;
        }

        * {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
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

function PDFSectionSubTitle({ children }: { children: ReactNode }) {
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
  data,
}: PDFProfileProps) {
  const { education, language, military, publication } = data;

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
  item,
  emphasized = true,
}: PDFExperienceRowProps) {
  const { title, role, period, description } = item;

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

function PDFAwardRow({ award }: { award: PDFAwardItem }) {
  const { date, prize, title, project } = award;

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
        <PDFAwardRow key={`${award.date}-${award.title}`} award={award} />
      ))}
    </div>
  );
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
