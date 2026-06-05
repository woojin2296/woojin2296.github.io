import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export function ContentSection({
  children,
  className,
  id,
}: SectionProps & { id?: string }) {
  return (
    <section id={id} className={cn("pt-24 flex flex-col gap-4", className)}>
      {children}
    </section>
  );
}

export function SectionDevider() {
  return <div aria-hidden="true" className="mt-24 border-t border-[#e5e5e5]" />;
}

export function HeadSection({ children, className }: SectionProps) {
  return (
    <header className={cn("mt-16 flex flex-col gap-8 pt-10 text-center", className)}>
      {children}
    </header>
  );
}

export function HeadTitleSection({ children, className }: SectionProps) {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      {children}
    </section>
  );
}

export function HeadMetaSection({ children, className }: SectionProps) {
  return (
    <section
      className={cn(
        "mt-8 grid grid-cols-3 items-stretch [&>*+*]:border-l [&>*+*]:border-[#e5e5e5]",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function HeadMetaItem({
  title,
  description,
  className,
}: {
  title: string;
  description: readonly React.ReactNode[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-rows-[auto_1fr]", className)}>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
        {title}
      </p>
      <p className="mt-3 flex min-h-10 flex-col items-center justify-center text-sm font-medium leading-relaxed text-black">
        {description.map((line, index) => (
          <span key={index}>{line}</span>
        ))}
      </p>
    </div>
  );
}
