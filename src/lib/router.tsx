import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

/** Strip query/hash and trailing slash so "/services/" and "/services" resolve to one route. */
export function normalizePath(p: string) {
  const clean = p.split(/[?#]/)[0] || "/";
  return clean.length > 1 ? clean.replace(/\/+$/, "") || "/" : "/";
}

type RouterState = {
  path: string;
  /** True once the visitor has navigated client-side at least once (used to skip the enter animation on first paint). */
  navigated: boolean;
  navigate: (to: string) => void;
};

const RouterContext = createContext<RouterState>({
  path: "/",
  navigated: false,
  navigate: () => {},
});

export function RouterProvider({ initialPath, children }: { initialPath: string; children: ReactNode }) {
  const [path, setPath] = useState(() => normalizePath(initialPath));
  const [navigated, setNavigated] = useState(false);
  const pendingHash = useRef<string | null>(null);
  const [tick, setTick] = useState(0);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.href);
    const next = normalizePath(url.pathname);
    const full = next + url.search + url.hash;
    if (full !== window.location.pathname + window.location.search + window.location.hash) {
      window.history.pushState(null, "", full);
    }
    pendingHash.current = url.hash ? url.hash.slice(1) : null;
    setNavigated(true);
    setPath(next);
    setTick((t) => t + 1);
  }, []);

  // Scroll after the new page has rendered: to the anchor if there is one, otherwise to the top.
  useEffect(() => {
    if (tick === 0) return;
    const id = pendingHash.current;
    if (id) {
      document.getElementById(decodeURIComponent(id))?.scrollIntoView({ block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [tick]);

  const pathRef = useRef(path);
  pathRef.current = path;

  useEffect(() => {
    // Fragment-only navigation (TOC links, skip link) also fires popstate — ignore it unless the path changed.
    const onPop = () => {
      const next = normalizePath(window.location.pathname);
      if (next === pathRef.current) return;
      setNavigated(true);
      setPath(next);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const value = useMemo(() => ({ path, navigated, navigate }), [path, navigated, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string };

/** A real <a href> (crawlable, works without JS) that upgrades to client-side navigation. */
export function Link({ to, onClick, target, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      (target && target !== "_self") ||
      !to.startsWith("/")
    ) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };
  return <a href={to} target={target} onClick={handle} {...rest} />;
}

/** True when `path` is `href` or a child of it (e.g. /services/x is inside /services). */
export function isActive(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(href + "/");
}
