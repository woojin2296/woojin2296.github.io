import type { ReactNode } from "react";

type SkillIconProps = {
  children: ReactNode;
  isBlack?: boolean;
  is_black?: boolean;
};

function cn(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function SkillIcon({
  children,
  isBlack,
  is_black,
}: SkillIconProps) {
  const highlighted = isBlack ?? is_black ?? false;

  return (
    <span
      className={cn(
        "border px-3 py-1.5 text-xs",
        highlighted
          ? "border-[#111418] bg-[#111418] font-semibold text-[#f5f5f5]"
          : "border-[#c4c0b8] font-medium text-[#5a6775]",
      )}
    >
      {children}
    </span>
  );
}
