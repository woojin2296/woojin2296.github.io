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
