import { cn } from "@/lib/utils";

export function ContentSection({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("pt-24 flex flex-col gap-4", className)}>
      {children}
    </section>
  );
}

export function SectionDevider() {
  return <div aria-hidden="true" className="mt-24 border-t border-[#e5e5e5]" />;
}