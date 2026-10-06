import type { ReactNode } from "react";

/** Re-mounts on navigation; the .page-shell animation only runs after an in-app click (see globals.css). */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-shell">{children}</div>;
}
