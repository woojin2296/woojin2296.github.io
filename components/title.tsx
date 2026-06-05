import { cn } from "@/lib/utils";

export function ContentTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h2 className={cn("font-heading text-2xl font-medium leading-[1.33] tracking-normal text-black", className)}>
      {children}
    </h2>
  );
}

export function ContentSubTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h3 className={cn("font-heading text-xl font-semibold leading-[1.4] tracking-normal text-black mt-4", className)}>
      {children}
    </h3>
  );
}

export function HeadEyebrow({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <p className={cn("text-xs uppercase tracking-[0.22em] text-[#737373]", className)}>
      {children}
    </p>
  );
}

export function HeadTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h1 className={cn("font-display text-4xl font-medium leading-[1.12] text-balance", className)}>
      {children}
    </h1>
  );
}

export function HeadDescription({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <p className={cn("text-base leading-relaxed text-[#737373]", className)}>
      {children}
    </p>
  );
}
