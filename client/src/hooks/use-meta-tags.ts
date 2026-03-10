import { useEffect } from "react";

interface MetaTagOptions {
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export function useMetaTags({ description, canonical, ogTitle, ogDescription }: MetaTagOptions) {
  useEffect(() => {
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
      return () => { el?.removeAttribute("content"); };
    };

    const cleanups: (() => void)[] = [];

    if (description) cleanups.push(setMeta("description", description));
    if (ogTitle) cleanups.push(setMeta("og:title", ogTitle, "property"));
    if (ogDescription) cleanups.push(setMeta("og:description", ogDescription, "property"));

    let linkEl: HTMLLinkElement | null = null;
    if (canonical) {
      linkEl = document.querySelector('link[rel="canonical"]');
      if (!linkEl) {
        linkEl = document.createElement("link");
        linkEl.rel = "canonical";
        document.head.appendChild(linkEl);
      }
      linkEl.href = canonical;
    }

    return () => {
      cleanups.forEach(fn => fn());
    };
  }, [description, canonical, ogTitle, ogDescription]);
}
