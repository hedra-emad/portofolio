import type { ReactNode } from "react";

type ContainerProps = {
  /**
   * `prose` caps the measure at 68ch — the readable-line-length constraint from
   * the brief. `wide` is for anything that is not a line of text: code blocks,
   * diagrams, card grids.
   */
  width?: "prose" | "wide";
  as?: "div" | "section" | "header" | "footer" | "article";
  className?: string;
  children: ReactNode;
};

const WIDTHS = {
  prose: "max-w-measure",
  wide: "max-w-wide",
} as const;

export function Container({
  width = "prose",
  as: Tag = "div",
  className = "",
  children,
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full px-6 ${WIDTHS[width]} ${className}`}>
      {children}
    </Tag>
  );
}
