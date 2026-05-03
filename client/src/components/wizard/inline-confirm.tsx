import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { chartTheme } from "@/lib/chart-theme";

/**
 * Tiny accent-coloured confirmation that appears below an input on blur,
 * fades out after ~2.5 s. Kept very calm — no emoji, no jargon.
 */
export function useInlineConfirm() {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flash = useCallback((msg: string) => {
    if (timer.current) clearTimeout(timer.current);
    setMessage(msg);
    timer.current = setTimeout(() => setMessage(null), 2500);
  }, []);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return { message, flash };
}

export function InlineConfirm({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          transition={{ duration: 0.2, ease: chartTheme.ease }}
          className="text-xs flex items-center gap-1 mt-1"
          style={{ color: chartTheme.color.gold }}
          data-testid="inline-confirm"
        >
          <Check className="w-3 h-3" strokeWidth={3} />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
