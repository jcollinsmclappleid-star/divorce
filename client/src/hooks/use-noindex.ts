import { useEffect } from "react";

export function useNoIndex() {
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      document.head.appendChild(meta);
    }
    meta.content = "noindex, nofollow";

    return () => {
      if (meta && meta.parentNode) {
        meta.parentNode.removeChild(meta);
      }
    };
  }, []);
}
