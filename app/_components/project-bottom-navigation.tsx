import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

type ProjectBottomNavigationProps = {
  className?: string;
};

function cn(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function ProjectBottomNavigation({
  className,
}: ProjectBottomNavigationProps) {
  return (
    <nav
      aria-label="Project bottom navigation"
      className={cn(
        "mt-24 flex flex-col gap-3 text-sm font-medium text-black sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <Link
        href="/#projects"
        className="inline-flex h-9 items-center gap-2 transition-colors hover:text-[#737373]"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        프로젝트 목록
      </Link>
      <Link
        href="/#contact"
        className="inline-flex h-9 items-center gap-2 transition-colors hover:text-[#737373]"
      >
        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
        Contact
      </Link>
    </nav>
  );
}
