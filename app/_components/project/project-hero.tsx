import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ProjectHeroMeta = {
  label: string;
  value: ReactNode;
};

type ProjectHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  meta: ProjectHeroMeta[];
};

export function ProjectHero({
  eyebrow,
  title,
  description,
  meta,
}: ProjectHeroProps) {
  return (
    <header className="mt-16 flex flex-col gap-8 pt-10 text-center">
      <div className="flex flex-col gap-4">
        <p className="text-xs uppercase tracking-[0.22em] text-[#737373]">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl font-medium leading-[1.12] text-balance">
          {title}
        </h1>
        <p className="text-base leading-relaxed text-[#737373]">
          {description}
        </p>
      </div>

      <section className="mt-8 grid grid-cols-3 items-stretch">
        {meta.map((item, index) => (
          <div
            key={item.label}
            className={cn(
              "grid grid-rows-[auto_1fr]",
              index > 0 && "border-l border-[#e5e5e5]",
            )}
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
              {item.label}
            </p>
            <p className="mt-3 flex min-h-10 items-center justify-center text-sm font-medium text-black">
              {item.value}
            </p>
          </div>
        ))}
      </section>
    </header>
  );
}
