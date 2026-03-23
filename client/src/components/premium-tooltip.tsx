import type { TooltipProps } from "recharts";

export const PREMIUM_TOOLTIP_STYLE: Pick<TooltipProps<number, string>, "contentStyle" | "itemStyle" | "labelStyle"> = {
  contentStyle: {
    background: "hsl(220,52%,22%)",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontSize: 12,
    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
  },
  itemStyle: { color: "#fff" },
  labelStyle: { color: "rgba(255,255,255,0.6)", marginBottom: 4 },
};
