import Image from "next/image";

export type Shot = {
  /** Public path, e.g. `/shots/edugenie/course-page.png`. */
  readonly src: string;
  readonly alt: string;
  /** One-line, mono, muted — what the screen shows. */
  readonly caption: string;
};

/**
 * A responsive gallery of product screenshots. Each shot sits in a framed,
 * fixed-ratio box (cropped from the top so the header/nav reads) with a mono
 * caption underneath — the same figure/label treatment the code samples and
 * architecture diagram use, so screenshots don't introduce a new visual idiom.
 */
export function Screens({ items }: { items: readonly Shot[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((shot) => (
        <figure key={shot.src}>
          <div className="border-border bg-surface-2 relative aspect-[16/10] w-full overflow-hidden rounded-[12px] border">
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width: 640px) 100vw, 560px"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="label mt-3 normal-case">
            {shot.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
