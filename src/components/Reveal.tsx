import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";
import { cn } from "../utils/cn";

export function Reveal({
  children,
  className,
  delay,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const ref = useReveal<HTMLDivElement & HTMLLIElement>();
  const d = delay ? Math.min(Math.max(Math.round(delay), 1), 5) : 0;
  return (
    <Tag ref={ref} className={cn("reveal", d && `delay-${d}`, className)}>
      {children}
    </Tag>
  );
}
