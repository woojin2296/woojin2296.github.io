"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type ExpandableImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  wrapperClassName?: string;
  unoptimized?: boolean;
  priority?: boolean;
};

function cn(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function ExpandableImage({
  src,
  alt,
  width,
  height,
  className,
  wrapperClassName,
  unoptimized,
  priority,
}: ExpandableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0c0c]/85 p-4"
      onClick={() => setIsOpen(false)}
    >
      <button
        type="button"
        aria-label="닫기"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-white/30 bg-[#0c0c0c]/70 text-white transition-colors hover:bg-[#0c0c0c]"
        onClick={() => setIsOpen(false)}
      >
        <X className="h-5 w-5" />
      </button>
      <div
        className="max-h-full max-w-full"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized={unoptimized}
          className="max-h-[calc(100vh-6rem)] w-auto max-w-[calc(100vw-2rem)] object-contain"
        />
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        aria-label={`${alt} 크게 보기`}
        className={cn(
          "group relative cursor-zoom-in appearance-none bg-transparent p-0",
          wrapperClassName,
        )}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized={unoptimized}
          priority={priority}
          className={className}
        />
      </button>

      {isOpen && typeof document !== "undefined"
        ? createPortal(modal, document.body)
        : null}
    </>
  );
}
