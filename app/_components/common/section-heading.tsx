import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
};

export function SectionHeading({
  children,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-6", className)}>
      <h2 className="font-heading text-[24px] font-medium leading-[1.33] tracking-normal text-black">
        {children}
      </h2>
    </div>
  );
}
