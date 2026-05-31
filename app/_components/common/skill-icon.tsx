import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SkillIconProps = {
  children: ReactNode;
  emphasized?: boolean;
};

export function SkillIcon({
  children,
  emphasized,
}: SkillIconProps) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center whitespace-nowrap rounded-full px-3 text-sm font-medium leading-none tracking-normal",
        emphasized ? "bg-[#eeeeee] text-black" : "bg-[#fafafa] text-black",
      )}
    >
      {children}
    </span>
  );
}
