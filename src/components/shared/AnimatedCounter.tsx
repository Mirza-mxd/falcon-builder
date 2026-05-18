import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({ value, suffix = "", label, duration = 2000 }: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              setCount(Math.floor(p * value));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, duration]);

  const formatted = count >= 1000 ? count.toLocaleString() : count.toString();

  return (
    <div ref={ref} className="text-center">
      <p className="text-5xl font-extrabold text-primary-500 sm:text-6xl">
        {formatted}
        {suffix}
      </p>
      <p className="mt-3 text-base font-medium text-text-secondary">{label}</p>
    </div>
  );
}
