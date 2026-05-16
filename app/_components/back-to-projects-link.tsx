import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BackToProjectsLinkProps = {
  className?: string;
};

function cn(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function BackToProjectsLink({ className }: BackToProjectsLinkProps) {
  return (
    <Link
      href="/#projects"
      className={cn(
        "inline-flex h-9 items-center gap-2 text-sm font-medium text-black",
        className,
      )}
    >
      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
      돌아가기
    </Link>
  );
}
