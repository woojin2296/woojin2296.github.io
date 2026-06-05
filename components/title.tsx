import { cn } from "@/lib/utils";

export function HeroTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
      {children}
    </h1>
  );
}

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

export function LabelTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h4 className={cn("font-heading text-sm font-semibold leading-[1.4] tracking-normal text-[#737373]", className)}>
      {children}
    </h4>
  );
}