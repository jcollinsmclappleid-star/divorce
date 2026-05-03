import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  triggerOnView?: boolean;
  threshold?: number;
  className?: string;
  testId?: string;
  formatNumber?: (v: number) => string;
}

export function AnimatedCounter({
  value,
  duration = 1200,
  prefix = "",
  suffix = "",
  decimals = 0,
  triggerOnView = true,
  threshold = 0.4,
  className,
  testId,
  formatNumber,
}: AnimatedCounterProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState<number>(reduced ? value : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef<boolean>(!!reduced);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      startedRef.current = true;
      return;
    }

    let raf = 0;
    const run = () => {
      const from = 0;
      const to = value;
      const start = performance.now();
      const step = (ts: number) => {
        const t = Math.min(1, (ts - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(from + (to - from) * eased);
        if (t < 1) raf = requestAnimationFrame(step);
        else setDisplay(to);
      };
      raf = requestAnimationFrame(step);
    };

    if (!triggerOnView) {
      if (!startedRef.current) {
        startedRef.current = true;
        run();
      }
      return () => {
        if (raf) cancelAnimationFrame(raf);
      };
    }

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            run();
            obs.disconnect();
          }
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, duration, triggerOnView, threshold, reduced]);

  const fmt =
    formatNumber ??
    ((v: number) =>
      decimals === 0 ? Math.round(v).toLocaleString() : v.toFixed(decimals));

  return (
    <span ref={ref} className={className} data-testid={testId}>
      {prefix}
      {fmt(display)}
      {suffix}
    </span>
  );
}
