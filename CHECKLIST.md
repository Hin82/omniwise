# SEO/GEO — Checklist för manuella steg

Saker som inte kan göras i kod utan kräver dig (eller konton).
Listad i ungefärlig ordning av impact.

---

## Innan PR mergas — Cloudflare-konfiguration

- [ ] **Lägg till miljövariabel `BREVO_NEWSLETTER_LIST_ID`** i Cloudflare Pages
      (Settings → Environment variables → Production). Värdet är list-ID:t
      för din Brevo-lista (siffra, t.ex. `7`). Utan den fungerar
      anmälningsformuläret ändå (notifieringsmail går ut), men prenumeranter
      läggs inte till automatiskt i någon Brevo-lista.
- [ ] **Kontrollera Pages build-kommando** — om Pages auto-detekterar
      `package.json` och kör `npm run build`, sätt output-katalog till `/`
      (eller lämna build-kommando tomt och låt den committade
      `css/tailwind.css` användas direkt).

---

## Stora hävstänger (gör inom 1–2 veckor)

### Google Business Profile — recensioner
- [ ] Maila/messa **5–10 tidigare kontakter eller kunder** med direktlänken
      till GBP-recensioner. Mall:
      > "Hej! Skulle du kunna skriva en kort recension om vårt samarbete?
      > Det hjälper enormt för synligheten. Direktlänk: [GBP-länk]"
- [ ] När du har **5+ recensioner** — lägg till `aggregateRating` i
      `LocalBusiness`-schemat (säg till mig så fixar jag det).

### LinkedIn-content under Connys namn
- [ ] Publicera **1–2 inlägg/vecka** under Conny Mohlins personliga profil.
      Ämnesförslag (matchar bloggens nyckelord och bygger entitetssignaler):
      - "5 saker du kan automatisera i Microsoft 365 idag"
      - "AI-agent vs chatbot — vad är skillnaden?"
      - "Så här prissätter jag AI-utvecklingsprojekt"
      - Lärdomar från riktiga kundprojekt (anonymiserat)
- [ ] Komplettera Connys LinkedIn-profil: titel "AI-utvecklare & grundare
      OmniWise AB", featured posts, kontakt-CTA.

### Svenska företagskataloger (engångsjobb)
- [ ] Registrera OmniWise AB på följande och lägg till URL:erna i
      `sameAs`-arrayen i schemat sen (säg till mig):
  - [ ] [allabolag.se](https://www.allabolag.se) — företagsuppgifter
  - [ ] [hitta.se](https://www.hitta.se) — företagsinfo + adress
  - [ ] [eniro.se](https://www.eniro.se) — företagsinfo
  - [ ] [ratsit.se](https://www.ratsit.se) — företagsinfo
- [ ] (Frivilligt) Notera company-profile på [crunchbase.com](https://www.crunchbase.com)
      om internationella kunder eller investerare är relevant.

### Mätning — Search Console & GA4
- [ ] **Sätt upp Google Search Console** för omniwise.se om inte gjort:
      https://search.google.com/search-console
      - Verifiera ägarskap (DNS TXT eller HTML-tagg)
      - Skicka in `https://omniwise.se/sitemap.xml`
- [ ] **Sätt upp Google Analytics 4** om inte gjort:
      https://analytics.google.com
      - Skapa property
      - Skicka GA4 measurement ID till mig så lägger jag in
        `gtag.js`-snippet i `<head>` på alla sidor.
- [ ] Begär att Google indexerar bloggen efter merge:
      Search Console → URL Inspection → `https://omniwise.se/blogg/`
      → Request indexing.

---

## Innehållsmotor (löpande)

- [ ] **Skriv 1 blogginlägg/månad** — använd det befintliga som mall
      (`/blogg/ai-utvecklare-kostnad-2026.html`). Nästa förslag finns
      listade på `/blogg/` i sektionen "Kommande ämnen".
- [ ] **Skriv ett riktigt kundcase** så fort du har tillstånd från en
      kund — använd den utkommenterade mallen i `about.html` /
      `en/about.html`. Lägg sedan till `Review`-schema.

---

## Övriga frivilliga förbättringar

- [ ] **EN-blogg** — när SV-bloggen har 3–5 inlägg, översätt de bästa till
      engelska under `/en/blog/` för att matcha de engelska sidorna.
- [ ] **Reddit-aktivitet** — svara på frågor om AI, M365 och automation
      i r/sweden, r/jonkoping, r/sysadmin under Connys namn med länk till
      bloggen där relevant. Reddit citeras tungt av AI-modeller.
- [ ] **Lokalt PR** — sponsra/föreläs på lokala företagsfrukostar, tech-
      meetups eller näringslivsföreningar i Jönköping/Habo. Lokal mention
      i media = stark backlink-signal.

---

## Vad jag (Claude) har gjort i den här PR:en

- ✅ Bloggstruktur: `/blogg/` med första inlägg ("Vad kostar en AI-utvecklare 2026?", ~2000 ord, Article + FAQPage + BreadcrumbList schema)
- ✅ Brevo nyhetsbrevs-integration: `/api/newsletter` + handler-script
- ✅ Alla footer-nyhetsbrevsformulär kopplade till API:et (index, about, blogg)
- ✅ Course-schema för utbildningarna på services-sidan (SV + EN)
- ✅ Blogg-länk i nav på index, services, about, contact
- ✅ Sitemap uppdaterad med blogg-URL:er
- ✅ Tailwind CSS ombyggd för nya filerna
