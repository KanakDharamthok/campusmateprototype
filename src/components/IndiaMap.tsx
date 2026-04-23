import { motion } from "framer-motion";
import { CITIES, type City } from "@/lib/mockData";

type Marker = {
  cityKey: keyof typeof CITIES;
  size?: number;
  color?: "emerald" | "gold";
  label?: string;
  intensity?: number; // 0-1 for heatmap glow
};

type Path = {
  from: keyof typeof CITIES;
  to: keyof typeof CITIES;
  year?: number;
};

export function WorldMap({
  markers = [],
  paths = [],
  onMarkerClick,
  activeCity,
}: {
  markers?: Marker[];
  paths?: Path[];
  onMarkerClick?: (m: Marker) => void;
  activeCity?: keyof typeof CITIES;
}) {
  const c = (key: keyof typeof CITIES): City => CITIES[key];

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-surface/60 grid-pattern">
      {/* Stylized continents — abstract blobs */}
      <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <radialGradient id="land" cx="50%" cy="50%">
            <stop offset="0%" stopColor="oklch(0.32 0.04 165)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.22 0.03 165)" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        {/* India landmass focus */}
        <path
          d="M 28 20 Q 36 18 44 22 Q 50 28 48 38 Q 46 50 40 56 Q 34 60 30 54 Q 24 48 24 38 Q 24 28 28 20 Z"
          fill="url(#land)"
          stroke="oklch(0.4 0.04 165 / 0.5)"
          strokeWidth="0.2"
        />
        {/* Other continents abstract */}
        <ellipse cx="10" cy="20" rx="12" ry="14" fill="url(#land)" opacity="0.5" />
        <ellipse cx="78" cy="78" rx="14" ry="10" fill="url(#land)" opacity="0.5" />
        <ellipse cx="6" cy="40" rx="6" ry="10" fill="url(#land)" opacity="0.4" />
        <ellipse cx="62" cy="42" rx="8" ry="6" fill="url(#land)" opacity="0.5" />
      </svg>

      {/* Animated paths */}
      <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {paths.map((p, i) => {
          const a = c(p.from);
          const b = c(p.to);
          const mx = (a.x + b.x) / 2;
          const my = Math.min(a.y, b.y) - 8;
          return (
            <g key={i}>
              <motion.path
                d={`M ${a.x * 0.6} ${a.y * 0.6} Q ${mx * 0.6} ${my * 0.6} ${b.x * 0.6} ${b.y * 0.6}`}
                fill="none"
                stroke="oklch(0.82 0.13 85)"
                strokeWidth="0.25"
                strokeDasharray="0.8 0.6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
              />
              {p.year && (
                <text
                  x={mx * 0.6}
                  y={my * 0.6}
                  fill="oklch(0.82 0.13 85)"
                  fontSize="1.4"
                  textAnchor="middle"
                  className="font-mono"
                >
                  {p.year}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Heatmap glows */}
      {markers
        .filter((m) => m.intensity)
        .map((m, i) => {
          const city = c(m.cityKey);
          const size = 40 + (m.intensity ?? 0) * 80;
          return (
            <div
              key={`glow-${i}`}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
              style={{
                left: `${city.x * 0.6}%`,
                top: `${city.y * 0.6}%`,
                width: size,
                height: size,
                background:
                  m.color === "gold"
                    ? "oklch(0.82 0.13 85 / 0.55)"
                    : "oklch(0.72 0.16 160 / 0.55)",
              }}
            />
          );
        })}

      {/* Markers */}
      {markers.map((m, i) => {
        const city = c(m.cityKey);
        const size = m.size ?? 10;
        const isActive = activeCity === m.cityKey;
        return (
          <motion.button
            key={`m-${i}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
            onClick={() => onMarkerClick?.(m)}
            className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${city.x * 0.6}%`, top: `${city.y * 0.6}%` }}
          >
            <span
              className={`relative block rounded-full ring-2 ring-background/80 transition-transform group-hover:scale-125 ${
                m.color === "gold" ? "bg-gradient-gold shadow-gold" : "bg-gradient-emerald shadow-glow"
              } ${isActive ? "scale-150" : ""}`}
              style={{ width: size, height: size }}
            >
              <span
                className={`absolute inset-0 animate-ping rounded-full ${
                  m.color === "gold" ? "bg-accent" : "bg-primary"
                } opacity-40`}
              />
            </span>
            <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-surface-2/90 px-2 py-0.5 text-[10px] font-medium text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              {m.label ?? city.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
