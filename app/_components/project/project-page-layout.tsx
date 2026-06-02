import type { ReactNode } from "react";
import { BackToProjectsLink } from "@/app/_components/navigation/back-to-projects-link";
import {
  ProjectSectionNavigation,
  type ProjectSectionLink,
} from "@/app/_components/navigation/project-section-navigation";
import { ProjectBottomNavigation } from "@/app/_components/navigation/project-bottom-navigation";

type ProjectPageLayoutProps = {
  sectionLinks: readonly ProjectSectionLink[];
  topAction?: ReactNode;
  children: ReactNode;
};

export function ProjectPageLayout({
  sectionLinks,
  topAction,
  children,
}: ProjectPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-[760px] px-5 pt-10 pb-28 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <BackToProjectsLink />
          {topAction ? (
            <div className="flex items-center justify-end">{topAction}</div>
          ) : null}
        </div>
        <ProjectSectionNavigation links={sectionLinks} />
        {children}
        <ProjectBottomNavigation />
      </main>
    </div>
  );
}
