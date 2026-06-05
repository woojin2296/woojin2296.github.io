import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const contentTextClassName =
  "text-base font-normal leading-[1.5] tracking-normal text-[#737373]";

const contentListClassName =
  "grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black";

export function ContentText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return renderContentBlocks(children, className);
}

function renderContentBlocks(text: string, className?: string): ReactNode {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return null;
  }

  const blocks: Array<
    | { type: "paragraph"; text: string }
    | { type: "list"; items: string[] }
  > = [];
  let paragraphLines: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return;
    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
    paragraphLines = [];
  };

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push({ type: "list", items: listItems });
    listItems = [];
  };

  for (const line of lines) {
    const listItem = line.match(/^-\s+(.+)$/);

    if (listItem) {
      flushParagraph();
      listItems.push(listItem[1]);
      continue;
    }

    flushList();
    paragraphLines.push(line);
  }

  flushParagraph();
  flushList();

  return blocks.map((block, blockIndex) => {
    if (block.type === "paragraph") {
      return (
        <p key={blockIndex} className={cn(contentTextClassName, className)}>
          {renderBoldSegments(block.text)}
        </p>
      );
    }

    return (
      <ul key={blockIndex} className={cn(contentListClassName, className)}>
        {block.items.map((item) => (
          <li key={item}>{renderBoldSegments(item)}</li>
        ))}
      </ul>
    );
  });
}

function renderBoldSegments(text: string): ReactNode {
  const segments: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*/g;
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;

    if (index > cursor) {
      segments.push(text.slice(cursor, index));
    }

    segments.push(
      <strong key={`${match[1]}-${index}`} className="font-medium text-black">
        {match[1]}
      </strong>,
    );
    cursor = index + match[0].length;
  }

  if (segments.length === 0) {
    return text;
  }

  if (cursor < text.length) {
    segments.push(text.slice(cursor));
  }

  return segments;
}

export function SkillIcon({
  children,
  emphasized,
}: {
  children: ReactNode;
  emphasized?: boolean;
}) {
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
