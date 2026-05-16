import type { ReactNode } from "react";

type SkillIconProps = {
  children: ReactNode;
  emphasized?: boolean;
  isBlack?: boolean;
  is_black?: boolean;
};

function cn(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function SkillIcon({
  children,
  emphasized,
  isBlack,
  is_black,
}: SkillIconProps) {
  const highlighted = isBlack ?? is_black ?? false;

  return (
    <span
      className={cn(
        "inline-flex h-8 items-center whitespace-nowrap rounded-full px-3 text-sm font-medium leading-none tracking-normal",
        highlighted
          ? "bg-[#171717] text-white"
          : emphasized
            ? "bg-[#eeeeee] text-black"
            : "bg-[#fafafa] text-black",
      )}
    >
      {children}
    </span>
  );
}
