import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  /**
   * `measure` caps the line length at 68ch for prose. `wide` is the 12-column
   * field — used for anything that is not a line of text: code, diagrams,
   * screenshots, the stat strip.
   */
  width?: "measure" | "wide";
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

const WIDTHS = {
  measure: "max-w-measure",
  wide: "max-w-wide",
} as const;

export function Container({
  width = "wide",
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

/**
 * The 12-column field itself. Nothing on this site floats: every block declares
 * a column span, so the layout reads as set rather than arranged.
 */
export function Grid({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`grid grid-cols-4 gap-6 md:grid-cols-12 ${className}`}>
      {children}
    </Tag>
  );
}
