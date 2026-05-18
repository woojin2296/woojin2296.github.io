"use client";

import { useEffect, useRef, useState } from "react";

export type ProjectSectionLink = {
  id: string;
  label: string;
};

function cn(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function ProjectSectionNavigation({
  links,
}: {
  links: ProjectSectionLink[];
}) {
  const [activeId, setActiveId] = useState(links[0]?.id ?? "");
  const [barStyle, setBarStyle] = useState({ top: 0, height: 0 });
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      const pageHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
      );
      const isAtPageEnd = window.scrollY + window.innerHeight >= pageHeight - 4;

      if (isAtPageEnd) {
        setActiveId(links[links.length - 1]?.id ?? "");
        return;
      }

      const viewportAnchor = window.innerHeight * 0.35;
      let nextActiveId = links[0]?.id ?? "";

      for (const { id } of links) {
        const section = document.getElementById(id);

        if (!section) {
          continue;
        }

        const rect = section.getBoundingClientRect();

        if (rect.top <= viewportAnchor) {
          nextActiveId = id;
        }
      }

      setActiveId((current) =>
        current === nextActiveId ? current : nextActiveId,
      );
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [links]);

  useEffect(() => {
    const updateBar = () => {
      const activeLink = linkRefs.current[activeId];

      if (!activeLink) {
        return;
      }

      setBarStyle({
        top: activeLink.offsetTop,
        height: activeLink.offsetHeight,
      });
    };

    updateBar();
    window.addEventListener("resize", updateBar);

    return () => window.removeEventListener("resize", updateBar);
  }, [activeId]);

  if (links.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Project section navigation"
      className="fixed left-[calc(50%_+_25rem)] top-1/4 z-20 hidden w-52 -translate-y-1/2 flex-col items-start gap-2.5 pl-4 xl:flex"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-px -translate-x-1/2 bg-[#c4c0b8]"
      />
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 w-[3px] bg-[#0c0c0c] transition-[height,transform] duration-300 ease-out"
        style={{
          height: barStyle.height,
          transform: `translate(-50%, ${barStyle.top}px)`,
        }}
      />
      {links.map((link) => {
        const isActive = activeId === link.id;

        return (
          <a
            key={link.id}
            ref={(node) => {
              linkRefs.current[link.id] = node;
            }}
            href={`#${link.id}`}
            aria-current={isActive ? "location" : undefined}
            className={cn(
              "w-full overflow-hidden whitespace-nowrap pl-3 text-left text-xs leading-[1.33] tracking-normal transition-colors [-webkit-mask-image:linear-gradient(to_right,black_0,black_calc(100%_-_18px),transparent_100%)] [mask-image:linear-gradient(to_right,black_0,black_calc(100%_-_18px),transparent_100%)]",
              isActive
                ? "font-medium text-black"
                : "font-normal text-[#737373] hover:text-black",
            )}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
