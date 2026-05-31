import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

export type BlogReference = {
  label: string;
  href: string;
};

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mt-6 overflow-x-auto rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-4 text-sm leading-relaxed text-black">
      <code>{code}</code>
    </pre>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
      {children}
    </code>
  );
}

export function NoteRow({
  title,
  body,
  bordered,
}: {
  title: string;
  body: string;
  bordered?: boolean;
}) {
  return (
    <section className={bordered ? "border-t border-[#e5e5e5] py-5 first:border-t-0" : "py-5"}>
      <h3 className="text-[18px] font-medium leading-[1.56] tracking-normal text-black">
        {title}
      </h3>
      <p className="mt-2 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
        {body}
      </p>
    </section>
  );
}

export function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <p className="mt-3 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
      <strong className="font-medium text-black">{title}: </strong>
      {children}
    </p>
  );
}

export function ReferenceList({
  references,
}: {
  references: BlogReference[];
}) {
  return (
    <footer className="pt-[88px]">
      <h2 className="text-[18px] font-medium leading-[1.56] tracking-normal text-black">
        참고 자료
      </h2>
      <ul className="mt-4 grid gap-2 text-sm font-normal leading-relaxed tracking-normal text-[#737373]">
        {references.map((reference) => (
          <li key={reference.href}>
            <a
              href={reference.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-black underline-offset-4 hover:underline"
            >
              {reference.label}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
