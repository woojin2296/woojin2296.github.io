"use client";

import { useEffect, useRef, useState } from "react";

const sectionLinks = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "awards", label: "Awards" },
  { id: "skills", label: "Skills" },
  { id: "profile", label: "Profile" },
  { id: "contact", label: "Contact" },
];

function cn(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function SectionNavigation() {
  const [activeId, setActiveId] = useState(sectionLinks[0].id);
  const [barStyle, setBarStyle] = useState({ top: 0, height: 0 });
  const navRef = useRef<HTMLElement | null>(null);
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
        setActiveId(sectionLinks[sectionLinks.length - 1].id);
        return;
      }

      const viewportAnchor = window.innerHeight * 0.35;
      let nextActiveId = sectionLinks[0].id;

      for (const { id } of sectionLinks) {
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
  }, []);

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

  return (
    <nav
      ref={navRef}
      aria-label="Section navigation"
      className="fixed right-8 top-1/4 z-20 hidden w-28 -translate-y-1/2 flex-col items-end gap-3 pr-4 xl:flex"
    >
      <span
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-px translate-x-1/2 bg-[#c4c0b8]"
      />
      <span
        aria-hidden="true"
        className="absolute right-0 top-0 w-[3px] bg-[#0c0c0c] transition-[height,transform] duration-300 ease-out"
        style={{
          height: barStyle.height,
          transform: `translate(50%, ${barStyle.top}px)`,
        }}
      />
      {sectionLinks.map((link) => {
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
              "pr-3 text-right text-[11px] uppercase tracking-[3px] transition-colors",
              isActive
                ? "font-black text-[#0c0c0c]"
                : "font-semibold text-[#5a6775] hover:text-[#0c0c0c]",
            )}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
