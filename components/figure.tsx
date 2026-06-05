"use client";

/* eslint-disable @next/next/no-img-element */
import { RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export type FigureItem = {
  src: string;
  alt: string;
  caption: string;
};

type FigureProps = FigureItem & {
  className?: string;
  imageClassName?: string;
  imageWrapperClassName?: string;
  captionClassName?: string;
};

type FigureGroupProps = {
  figures: readonly FigureItem[];
  columns?: 1 | 2 | 3;
  className?: string;
};

type Offset = {
  x: number;
  y: number;
};

const MIN_SCALE = 1;
const DOUBLE_CLICK_SCALE = 2;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;
const DEFAULT_OFFSET: Offset = { x: 0, y: 0 };

export function Figure({
  src,
  alt,
  caption,
  className,
  imageClassName,
  imageWrapperClassName,
  captionClassName,
}: FigureProps) {
  const [expandedFigure, setExpandedFigure] = useState<FigureItem | null>(null);

  return (
    <>
      <figure className={cn("grid gap-3", className)}>
        <FigureImage
          src={src}
          alt={alt}
          caption={caption}
          className={imageWrapperClassName}
          imageClassName={imageClassName}
          onExpand={setExpandedFigure}
        />
        <figcaption
          className={cn(
            "text-sm font-normal leading-relaxed tracking-normal text-[#737373]",
            captionClassName,
          )}
        >
          {caption}
        </figcaption>
      </figure>
      {expandedFigure ? (
        <FigureDialogPortal
          figure={expandedFigure}
          onClose={() => setExpandedFigure(null)}
        />
      ) : null}
    </>
  );
}

export function FigureGroup({
  figures,
  columns = 2,
  className,
}: FigureGroupProps) {
  const [expandedFigure, setExpandedFigure] = useState<FigureItem | null>(null);

  if (figures.length === 0) {
    return null;
  }

  if (figures.length === 1) {
    const [figure] = figures;

    return (
      <Figure
        src={figure.src}
        alt={figure.alt}
        caption={figure.caption}
        className={className}
      />
    );
  }

  const rows = chunkFigures(figures, columns);

  return (
    <>
      <div data-figure-group="true" className={cn("grid gap-5", className)}>
        {rows.map((row) => (
          <div
            key={row
              .map((figure) => `${figure.src}:${figure.caption}`)
              .join("|")}
            data-figure-group-row="true"
            className="grid gap-x-5 gap-y-3"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {row.map((figure, index) => (
              <figure key={figure.src} className="contents">
                <FigureImage
                  src={figure.src}
                  alt={figure.alt}
                  caption={figure.caption}
                  style={{ gridColumn: index + 1, gridRow: 1 }}
                  onExpand={setExpandedFigure}
                />
                <figcaption
                  className="text-sm font-normal leading-relaxed tracking-normal text-[#737373]"
                  style={{ gridColumn: index + 1, gridRow: 2 }}
                >
                  {figure.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
      {expandedFigure ? (
        <FigureDialogPortal
          figure={expandedFigure}
          onClose={() => setExpandedFigure(null)}
        />
      ) : null}
    </>
  );
}

function FigureImage({
  src,
  alt,
  caption,
  className,
  imageClassName,
  style,
  onExpand,
}: FigureItem & {
  className?: string;
  imageClassName?: string;
  style?: CSSProperties;
  onExpand: (figure: FigureItem) => void;
}) {
  return (
    <button
      type="button"
      aria-label={`이미지 확대: ${caption}`}
      className={cn(
        "block w-full cursor-zoom-in self-center border-0 bg-transparent p-0",
        className,
      )}
      style={style}
      onClick={() => onExpand({ src, alt, caption })}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn("h-auto w-full object-contain", imageClassName)}
      />
    </button>
  );
}

function FigureDialogPortal({
  figure,
  onClose,
}: {
  figure: FigureItem;
  onClose: () => void;
}) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <FigureDialog figure={figure} onClose={onClose} />,
    document.body,
  );
}

function FigureDialog({
  figure,
  onClose,
}: {
  figure: FigureItem;
  onClose: () => void;
}) {
  const [scale, setScale] = useState(MIN_SCALE);
  const [offset, setOffset] = useState(DEFAULT_OFFSET);
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const canDrag = true;

  const zoomIn = () => {
    setScale(clampScale(scale + SCALE_STEP));
  };
  const zoomOut = () => {
    const nextScale = clampScale(scale - SCALE_STEP);

    setScale(nextScale);

    if (nextScale === MIN_SCALE) {
      setOffset(DEFAULT_OFFSET);
    }
  };
  const resetZoom = () => {
    setScale(MIN_SCALE);
    setOffset(DEFAULT_OFFSET);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!canDrag || event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    setOffset({
      x: dragState.originX + event.clientX - dragState.startX,
      y: dragState.originY + event.clientY - dragState.startY,
    });
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current = null;
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    dragStateRef.current = null;
    setIsDragging(false);

    if (scale > MIN_SCALE) {
      setScale(MIN_SCALE);
      setOffset(DEFAULT_OFFSET);
      return;
    }

    setScale(DOUBLE_CLICK_SCALE);
  };

  useEffect(() => {
    if (!figure) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        setScale(clampScale(scale + SCALE_STEP));
      }

      if (event.key === "-") {
        event.preventDefault();
        const nextScale = clampScale(scale - SCALE_STEP);

        setScale(nextScale);

        if (nextScale === MIN_SCALE) {
          setOffset(DEFAULT_OFFSET);
        }
      }

      if (event.key === "0") {
        event.preventDefault();
        setScale(MIN_SCALE);
        setOffset(DEFAULT_OFFSET);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [figure, onClose, scale]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={figure.caption}
      className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-black/80 p-5"
      onClick={onClose}
    >
      <figure
        className="grid h-[calc(100vh-2.5rem)] max-h-[calc(100vh-2.5rem)] w-[calc(100vw-2.5rem)] max-w-[calc(100vw-2.5rem)] grid-rows-[auto_minmax(0,1fr)_auto] gap-4 overflow-visible"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative z-20 flex items-center justify-end gap-2 justify-self-end rounded-sm bg-black/65 p-2 shadow-sm backdrop-blur-sm">
          <button
            type="button"
            aria-label="이미지 축소"
            disabled={scale <= MIN_SCALE}
            className="grid size-9 place-items-center rounded-sm border border-white/20 bg-white/10 text-white disabled:cursor-not-allowed disabled:opacity-35"
            onClick={zoomOut}
          >
            <ZoomOut aria-hidden="true" size={18} />
          </button>
          <button
            type="button"
            aria-label="이미지 확대 비율 초기화"
            disabled={scale === MIN_SCALE}
            className="grid size-9 place-items-center rounded-sm border border-white/20 bg-white/10 text-white disabled:cursor-not-allowed disabled:opacity-35"
            onClick={resetZoom}
          >
            <RotateCcw aria-hidden="true" size={17} />
          </button>
          <span className="min-w-12 text-center text-sm font-medium text-white/80">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            aria-label="이미지 확대"
            disabled={scale >= MAX_SCALE}
            className="grid size-9 place-items-center rounded-sm border border-white/20 bg-white/10 text-white disabled:cursor-not-allowed disabled:opacity-35"
            onClick={zoomIn}
          >
            <ZoomIn aria-hidden="true" size={18} />
          </button>
          <button
            type="button"
            aria-label="확대 이미지 닫기"
            className="grid size-9 place-items-center rounded-sm border border-white/20 bg-white/10 text-white"
            onClick={onClose}
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>
        <div
          className={cn(
            "relative grid h-full min-h-0 w-full touch-none select-none place-items-center overflow-visible",
            canDrag ? "cursor-grab" : "cursor-default",
            isDragging ? "cursor-grabbing" : null,
          )}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDoubleClick={handleDoubleClick}
        >
          <img
            src={figure.src}
            alt={figure.alt}
            draggable={false}
            className={cn(
              "absolute inset-0 h-full w-full object-contain transition-transform duration-150 ease-out",
            )}
            style={{
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
            }}
          />
        </div>
        <figcaption className="relative z-20 justify-self-center rounded-sm bg-black/65 px-3 py-2 text-center text-sm font-normal leading-relaxed tracking-normal text-white/90 shadow-sm backdrop-blur-sm">
          {figure.caption}
        </figcaption>
      </figure>
    </div>
  );
}

function clampScale(scale: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
}

function chunkFigures(figures: readonly FigureItem[], columns: number) {
  const rows: FigureItem[][] = [];

  for (let index = 0; index < figures.length; index += columns) {
    rows.push(figures.slice(index, index + columns));
  }

  return rows;
}
