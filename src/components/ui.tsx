import { Fragment, type ReactNode } from "react";
import { PHOTOS, type PhotoKey } from "../data/site";
import { Link } from "../lib/router";
import { cn } from "../utils/cn";

/** Self-hosted responsive photo with intrinsic size (prevents layout shift). */
export function Photo({
  name,
  alt,
  className,
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
}: {
  name: PhotoKey;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const base = `/images/photos/${name}`;
  const set = (ext: string) => `${base}-640.${ext} 640w, ${base}-1024.${ext} 1024w, ${base}-1600.${ext} 1600w`;
  // AVIF (~35% smaller) for browsers that support it, WebP otherwise. `contents` keeps <picture> out of layout.
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img
        src={`${base}-1024.webp`}
        srcSet={set("webp")}
        sizes={sizes}
        width={1600}
        height={1067}
        alt={alt ?? PHOTOS[name]}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        className={className}
      />
    </picture>
  );
}

/** Renders `[label](/path)` as internal links and `**text**` as <strong>. */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) {
      parts.push(
        <Link key={i++} to={m[2]} className="font-medium text-forest underline decoration-brass/60 underline-offset-4 hover:decoration-forest">
          {m[1]}
        </Link>
      );
    } else {
      parts.push(
        <strong key={i++} className="font-semibold text-ink">
          {m[3]}
        </strong>
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts.map((p, k) => (typeof p === "string" ? <Fragment key={`t${k}`}>{p}</Fragment> : p))}</>;
}

export function Kicker({ children, tone = "sage", className }: { children: ReactNode; tone?: "sage" | "brass"; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]",
        tone === "brass" ? "text-brass" : "text-sage",
        className
      )}
    >
      <span aria-hidden="true" className={cn("h-px w-6", tone === "brass" ? "bg-brass/70" : "bg-sage/60")} />
      {children}
    </p>
  );
}

export function SectionHead({
  kicker,
  title,
  text,
  id,
  tone = "sage",
  className,
}: {
  kicker: string;
  title: ReactNode;
  text?: ReactNode;
  id?: string;
  tone?: "sage" | "brass";
  className?: string;
}) {
  return (
    <div className={className}>
      <Kicker tone={tone}>{kicker}</Kicker>
      <h2 id={id} className="font-display mt-4 max-w-2xl text-3xl font-bold tracking-tight text-balance md:text-[2.75rem] md:leading-[1.08]">
        {title}
      </h2>
      {text && <p className={cn("mt-4 max-w-2xl text-[17px] leading-relaxed", tone === "brass" ? "text-mist/80" : "text-muted")}>{text}</p>}
    </div>
  );
}

/** Answer-first summary block — the passage search and AI engines are most likely to quote. */
export function AnswerBox({ label = "Quick answer", text, updated }: { label?: string; text: string; updated?: string }) {
  return (
    <aside className="rounded-2xl border border-brass/40 bg-sand/30 p-6 md:p-7" aria-label={label}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-copper">{label}</p>
      <p className="mt-3 text-[17px] leading-relaxed text-ink">{text}</p>
      {updated && (
        <p className="mt-4 text-xs text-muted">
          Last reviewed <time dateTime={updated}>{formatDate(updated)}</time>
        </p>
      )}
    </aside>
  );
}

/** Thousands separators without Intl, so server and browser output always match. */
export function formatCount(n: number) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${d} ${months[m - 1]} ${y}`;
}
