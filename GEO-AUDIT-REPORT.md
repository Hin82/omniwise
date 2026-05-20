# GEO Audit Report: OmniWise AB

**Audit Date:** 2026-05-19
**URL:** https://omniwise.se
**Business Type:** Local Business / Agency-Services (IT consultancy, Jönköping region, Sweden)
**Pages Analyzed:** 7 Swedish + 5 English (12 total) — static HTML on Cloudflare Pages

---

## Executive Summary

**Overall GEO Score: 47/100 (Poor)**

OmniWise has solid technical foundations — clean server-rendered static HTML, valid structured data, correct canonical/hreflang setup, and a fast Cloudflare-hosted stack. But the site is **actively invisible to the AI engines it should be courting**: Cloudflare's managed bot rules block GPTBot, ClaudeBot, Google-Extended and others, so ChatGPT, Claude and Gemini cannot crawl the site at all. There is no `llms.txt`, no FAQ/Q&A content for AI extraction, and almost no third-party brand authority. For a business that sells *AI development* as a service, blocking AI crawlers is the headline contradiction to fix.

**Biggest strength:** Excellent technical/schema foundation — static SSR HTML, valid JSON-LD on every page.
**Most critical gap:** All major AI crawlers blocked at the edge; zero AI-citable content structure.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 52/100 | 25% | 13.0 |
| Brand Authority | 25/100 | 20% | 5.0 |
| Content E-E-A-T | 48/100 | 20% | 9.6 |
| Technical GEO | 50/100 | 15% | 7.5 |
| Schema & Structured Data | 78/100 | 10% | 7.8 |
| Platform Optimization | 38/100 | 10% | 3.8 |
| **Overall GEO Score** | | | **46.7 → 47/100** |

---

## Critical Issues (Fix Immediately)

### 1. All major AI crawlers are blocked
The live `robots.txt` contains a **Cloudflare-managed content block** that disallows the crawlers AI search depends on:

```
User-agent: GPTBot           Disallow: /   ← ChatGPT
User-agent: ClaudeBot        Disallow: /   ← Claude
User-agent: Google-Extended  Disallow: /   ← Gemini / Google AI training
User-agent: CCBot            Disallow: /   ← Common Crawl (feeds most LLMs)
User-agent: Bytespider, Amazonbot, Applebot-Extended, meta-externalagent  Disallow: /
```

Also set: `Content-Signal: search=yes, ai-train=no`.

**Impact:** ChatGPT, Claude and Gemini cannot read omniwise.se. The site cannot be cited, summarized or recommended by the three largest AI assistants. This single setting caps the achievable GEO score.

**Fix:** This block is **not** in your 214-byte source `robots.txt` file — it is injected by Cloudflare. Go to **Cloudflare Dashboard → your domain → AI Audit / Bots → "Block AI bots"** and disable the managed rule (or switch to "Allow"). At minimum, allow `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `Claude-SearchBot`, `Google-Extended`, `PerplexityBot`, and `CCBot`. Decide `ai-train` per your preference — but `ai-input` (real-time grounding) should be allowed for GEO to work at all.

### 2. No `llms.txt` file
`https://omniwise.se/llms.txt` returns the homepage HTML (SPA/404 fallback), not a real file. AI systems have no curated map of your site.

**Fix:** Add a real `/llms.txt` (see Quick Wins below).

---

## High Priority Issues

- **Zero AI-extractable content blocks.** No FAQ section, no question-style headings, no Q&A pairs, no concrete stat/definition blocks on any page. AI assistants quote *answers*; the site offers only marketing prose ("Expertis omdefinerad", "Den intelligenta ledstjärnan").
- **No FAQPage schema** anywhere — directly tied to the point above.
- **Broken brand/authority links.** Footer social icons on `index.html` (LinkedIn, GitHub) and `about.html`/`contact.html` (`public`, `hub`, `language`, `person`) all point to `href="#"`. The real LinkedIn page (`linkedin.com/company/omniwise-ab`) exists but is not linked — a wasted entity signal.
- **No Google Business Profile signal.** For a local IT consultant, a verified GBP is the strongest local-AI authority source. Not referenced anywhere on the site or in schema.
- **Thin proof of expertise.** "20+ års erfarenhet" and "certifierade partners i Samsung Knox" are claimed but unbacked — no certifications, no case studies, no client names, no testimonials.

---

## Medium Priority Issues

- **No blog / dated content.** Nothing demonstrates freshness or topical authority. Publishers and service sites that get cited publish dated, substantive articles.
- **`Person` schema is shallow.** Conny Mohlin's `Person` entity has no `sameAs` (LinkedIn), no `knowsAbout`, no `alumniOf`/credentials — weak entity grounding for "who is the AI developer in Jönköping".
- **`LocalBusiness` schema lacks `sameAs` depth and `telephone`.** Only one `sameAs` (LinkedIn). No GBP URL, no `hasMap`. (Phone was intentionally removed — fine, but then email/LinkedIn responsiveness must be airtight.)
- **Tailwind via CDN (`cdn.tailwindcss.com`).** This is the dev/prototype build — render-blocking, large, and explicitly not for production. Hurts Core Web Vitals.
- **`robots.txt` disallows `/css/` and `/js/`.** Blocking stylesheet/script directories can impair how rendering crawlers perceive the page. Low real-world risk for static HTML but unnecessary.

---

## Low Priority Issues

- **Footer copyright inconsistency** — `about.html` says "© 2024", other pages say "© 2026".
- **Missing security headers** — no `Strict-Transport-Security` (HSTS), no `Content-Security-Policy`. `x-content-type-options` and `referrer-policy` are present (good).
- **Newsletter form is non-functional** — `onsubmit="event.preventDefault()"` with no handler; collects nothing.
- **`BreadcrumbList` on the homepage has a single item** — harmless but pointless.
- **No `Organization`-level logo/`sameAs` consolidation** — the homepage uses `LocalBusiness` only; consider `ProfessionalService` (a more specific subtype).

---

## Category Deep Dives

### AI Citability (52/100)
**Positive:** Every page is fully server-rendered static HTML — AI crawlers (when allowed) get 100% of the content with no JS execution needed. One clean `<h1>` per page, sensible `<h2>`/`<h3>` hierarchy, `aria-labelledby` on sections.
**Negative:** Content is persuasion-oriented, not answer-oriented. There are no passages an AI can lift to answer "What does an IT consultant in Jönköping do?" or "What is MDM?". No lists of facts, no definitions, no pricing, no numbered processes, no FAQ. Headlines favor poetry over clarity.
**Fix direction:** Add concrete, self-contained answer blocks: a FAQ section, a "What we do, in plain terms" block, defined service scopes with what's included.

### Brand Authority (25/100)
**Positive:** A LinkedIn company page exists and is referenced in homepage schema `sameAs`.
**Negative:** That is the *only* external signal. No Wikipedia (expected for a 2024 company), no Reddit/forum presence, no YouTube, no press, no directory listings, no Google Business Profile. Footer social links are dead (`#`). AI models build entity confidence from third-party corroboration — OmniWise currently has almost none.
**Fix direction:** Create & verify a Google Business Profile; complete the LinkedIn company + personal pages; get listed in Swedish business directories (hitta.se, allabolag.se, eniro.se); publish on LinkedIn under Conny's name.

### Content E-E-A-T (48/100)
**Positive:** A named, real founder (Conny Mohlin) with a portrait, signature, and a personal first-person voice on the About page. Privacy policy and terms exist. Clear contact path. `Person` schema present.
**Negative:** Experience and certifications are *claimed but not evidenced*. No case studies, no testimonials, no client logos, no measurable outcomes, no dated content. "20+ years" has no supporting timeline or bio depth. Founded 2024 — a young entity that needs to over-index on demonstrable proof.
**Fix direction:** Expand the About page into a real credentialed bio (roles, years, certifications, technologies). Add 2-3 case studies or anonymized client outcomes. Add testimonials with attribution.

### Technical GEO (50/100)
**Positive:** Static HTML on Cloudflare Pages = perfect SSR, fast TTFB, HTTP/2 + HTTP/3 (`alt-svc h3`), HTTPS enforced. Correct `canonical`, `hreflang` (sv/en/x-default), valid XML sitemap with `lastmod`, proper `meta robots index,follow`, complete Open Graph + Twitter Card on every page.
**Negative:** AI crawlers blocked (see Critical #1). No `llms.txt`. Tailwind loaded from CDN (prototype build). Missing HSTS/CSP. `/css/` and `/js/` disallowed in robots.txt.
**Fix direction:** Unblock AI crawlers, ship `llms.txt`, compile Tailwind to a static minified stylesheet, add HSTS via Cloudflare.

### Schema & Structured Data (78/100)
**Positive:** The strongest category. Valid JSON-LD on every page: `LocalBusiness` (with address, geo, areaServed, openingHours, founder), `WebSite`, `BreadcrumbList`, `Service` + `OfferCatalog` (4 offers), `Person`, `ContactPage`. Well-formed and consistent.
**Negative:** No `FAQPage` (no FAQ content exists yet). `Person` and `LocalBusiness` have minimal `sameAs`. No `Review`/`AggregateRating`. Homepage could use the more specific `ProfessionalService` type.
**Fix direction:** Add `FAQPage` once FAQ content exists; enrich `sameAs` on both entities; add `knowsAbout` to `Person`.

### Platform Optimization (38/100)
- **ChatGPT (GPTBot / OAI-SearchBot):** Blocked. Invisible.
- **Claude (ClaudeBot):** Blocked. Invisible.
- **Google Gemini / AI training (Google-Extended):** Blocked. (Google AI Overviews can still surface content via the main Googlebot index, which is *not* blocked — partial reach.)
- **Perplexity (PerplexityBot):** Not blocked — reachable. Currently your one open AI channel.
- **Bing Copilot (Bingbot):** Search crawler not blocked — reachable.
- No presence on platforms AI models cite heavily (Reddit, YouTube, Wikipedia, LinkedIn articles).

---

## Quick Wins (Implement This Week)

1. **Unblock AI crawlers in the Cloudflare dashboard** (AI Audit / Bots → disable "Block AI bots"). Single biggest GEO lever — moves Platform & Technical scores immediately.
2. **Publish a real `/llms.txt`.** Minimal version:
   ```
   # OmniWise AB
   > Lokal IT-konsult i Jönköpingsregionen — Microsoft 365, moln, MDM, automation och AI-utveckling.

   ## Pages
   - [Tjänster](https://omniwise.se/services.html): IT-tjänster — M365, moln, MDM, automation, AI, webb
   - [Om oss](https://omniwise.se/about.html): Conny Mohlin, grundare och AI-utvecklare
   - [Kontakt](https://omniwise.se/contact.html): Kontaktuppgifter, Habo, Jönköpings län
   ```
   Add it as a static file in the repo root so Cloudflare Pages serves it.
3. **Fix the dead footer social links** — point the LinkedIn icon to `https://www.linkedin.com/company/omniwise-ab` (and remove or wire up the GitHub/`#` placeholders).
4. **Create & verify a Google Business Profile** for OmniWise AB at Hagagatan 16, Habo — the highest-ROI local authority signal.
5. **Fix the `© 2024` → `© 2026`** copyright in `about.html`.

## 30-Day Action Plan

### Week 1: Unblock & Expose
- [ ] Disable Cloudflare AI-bot blocking; verify with `curl https://omniwise.se/robots.txt`
- [ ] Add `/llms.txt` (sv + en) and confirm it returns plain text, not HTML
- [ ] Fix footer social links across all pages; add real LinkedIn URL
- [ ] Add HSTS header via Cloudflare

### Week 2: Make Content Citable
- [ ] Add a FAQ section to `services.html` (e.g. "Vad kostar en IT-konsult?", "Vad är MDM?", "Vad gör en AI-utvecklare?") with concrete 2-4 sentence answers
- [ ] Add matching `FAQPage` JSON-LD
- [ ] Add a plain-language "Vad vi gör" summary block with defined service scopes

### Week 3: Build Proof (E-E-A-T)
- [ ] Expand About page into a credentialed bio — roles, years, certifications, tech stack
- [ ] Add 2-3 case studies or anonymized client outcomes with measurable results
- [ ] Add testimonials with attribution
- [ ] Enrich `Person` schema: `sameAs` (LinkedIn), `knowsAbout`, credentials

### Week 4: Build Brand Authority
- [ ] Complete Google Business Profile (photos, services, posts)
- [ ] List OmniWise on allabolag.se, hitta.se, eniro.se
- [ ] Publish first LinkedIn article under Conny Mohlin (M365 / AI automation topic)
- [ ] Add GBP URL + directory profiles to `sameAs` in `LocalBusiness` schema
- [ ] Plan a recurring blog (1-2 substantive, dated posts/month)

---

## Appendix: Pages Analyzed

| URL | Title | GEO Issues |
|---|---|---|
| / | IT-konsult Jönköping & Habo — OmniWise AB | Crawler block, no FAQ, dead social links, single-item breadcrumb |
| /services.html | IT-tjänster Jönköping & Habo | Crawler block, no FAQ schema, marketing-heavy prose |
| /about.html | Om OmniWise AB — 20+ års erfarenhet | Unbacked credentials, © 2024 typo, shallow Person schema |
| /contact.html | Kontakta IT-konsult Jönköping & Habo | Dead social links, functional form (good) |
| /arende.html | Registrera supportärende | Support page, low GEO relevance |
| /integritetspolicy.html | Integritetspolicy | Legal page — OK |
| /anvandarvillkor.html | Användarvillkor | Legal page — OK |
| /en/* (5 pages) | English mirror | Same issues as Swedish; hreflang correct |

---

*Generated by the GEO-SEO Analysis skill. Scoring: AI Citability 25%, Brand Authority 20%, Content E-E-A-T 20%, Technical GEO 15%, Schema 10%, Platform Optimization 10%.*
