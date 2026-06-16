---
name: Canonical tag duplicate bug
description: index.html has a static canonical pointing to /; content pages must update it, not append a second one.
---

## The rule
`content-page-layout.tsx` must find the existing `<link rel="canonical">` and update its `href`, not create and append a new element.

**Why:** `index.html` contains a hardcoded `<link rel="canonical" href="https://divorcecalculatoruk.co.uk/">`. When React renders a content page, if the code appends a *new* canonical element instead of updating the existing one, the DOM ends up with two canonicals. Google picks the first (the homepage URL), treats every content page as a duplicate of the homepage, and refuses to index it. This caused ~120 content pages to show "Alternative page with proper canonical tag" in GSC.

**How to apply:**
- Always `querySelector('link[rel="canonical"]')` first and update `href` on the found element.
- Only create a new element if none exists.
- On cleanup: if the element was pre-existing, restore `prevHref`; if it was newly created, remove it.
- `useMetaTags` hook already does this correctly — use it as the reference pattern.
- Never add a static canonical to `index.html` pointing to a specific page URL; the homepage `/` is correct as the fallback only.
