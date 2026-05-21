import Image from "next/image";

type BlogDiagramProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export function BlogDiagram({
  src,
  alt,
  width,
  height,
  caption,
}: BlogDiagramProps) {
  return (
    <figure className="mt-8 grid gap-3">
      <div className="overflow-hidden rounded-xl border border-[#e5e5e5] bg-white">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          loading="eager"
          unoptimized
        />
      </div>
      <figcaption className="text-sm font-normal leading-relaxed tracking-normal text-[#737373]">
        {caption}
      </figcaption>
    </figure>
  );
}
