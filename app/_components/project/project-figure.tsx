import { ExpandableImage } from "@/app/_components/common/expandable-image";
import { cn } from "@/lib/utils";

type ProjectFigureProps = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  className?: string;
  figureClassName?: string;
  wrapperClassName?: string;
  imageClassName?: string;
};

export function ProjectFigure({
  src,
  alt,
  caption,
  width,
  height,
  className,
  figureClassName,
  wrapperClassName = "block w-full",
  imageClassName = "h-auto w-full object-contain",
}: ProjectFigureProps) {
  return (
    <figure className={cn("grid gap-3", className, figureClassName)}>
      <ExpandableImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        wrapperClassName={wrapperClassName}
        className={imageClassName}
      />
      <figcaption className="text-sm font-normal leading-relaxed tracking-normal text-[#737373]">
        {caption}
      </figcaption>
    </figure>
  );
}
