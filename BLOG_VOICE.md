# OmniWise Bloggröst

Riktlinjer för att skriva inlägg som faktiskt låter som Conny Mohlin och OmniWise AB — inte som en generisk AI-byrå.

> **För Claude / framtida AI / mig själv om sex månader:** läs det här innan du börjar skriva ett nytt blogginlägg. Det är inte dekoration. Det är skillnaden mellan något citerbart och något genomskinligt AI-genererat.

---

## 1. Tilltal

- **"Ni"** (företagsmålgrupp), men **avslappnat** — inte stelt.
- ✅ "Ni får en offert, inte 200 sidor PDF."
- ❌ "Vi förstår att Era IT-behov är unika och därför erbjuder vi..."
- Vi är inte säljiga. Vi är en lokal IT-konsult som råkar kunna mycket om AI.

## 2. Humor — självironisk

- **En till två milda skämt per ~1500 ord.** Inte standup. Inte tvångsmässigt roligt. Inte "är det jag som är gammal eller…"-energi.
- Driv med dig själv, branschen, AI-hypen. **Aldrig med kunden eller läsaren.**
- Pekar uppåt på fakta, neråt på sig själv.

**Exempel som funkar:**

> "Ja, jag erkänner — när jag började titta på AI-agenter 2023 trodde jag fortfarande att 'agent' var något FBI sysslade med på fritiden. Lite har hänt sen dess."

> "Halva jobbet med en AI-agent är att lista ut vad ni faktiskt vill att den ska göra. Resten av jobbet är att övertyga den om att göra det."

**Exempel som inte funkar:**
- Dadjokes utan poäng.
- Skämt på kundens bekostnad ("ni som inte fattar AI…").
- Skämt om generativ AI som varenda LinkedIn-influerare redan kört.

## 3. Vad vi alltid undviker

- **Buzzword-bingo:** "synergier", "lösningar i världsklass", "revolutionerar", "framtidssäkrad", "skräddarsydda lösningar för era unika behov".
- **Tomma superlativer:** "bäst", "ledande", "marknadens vassaste", "outstanding".
- **AI-promosvenska:** "Som experter inom AI-utveckling möter vi ofta…", "I dagens digitala landskap…".
- **Långa intron** innan svaret kommer. Citerbart **först**.
- **Generiska "5 trender 2026"-listor** som alla andra skriver. Konkret eller inget alls.

## 4. Tonläge

- **Direkt:** säg konkret vad något kostar, hur lång tid det tar, varför.
- **Erfarenhetsbaserat:** dra paralleller till verkliga projekt (anonymiserade om de inte är publicerade case studies).
- **Lokal förankring:** nämn Jönköping/Habo/Sverige när det är relevant — aldrig forcerat.
- **Ärlig:** om något kostar mycket, säg det. Om något är överskattat, säg det.
- **Brevity beats cleverness.** Korta meningar slår snygga.

## 5. Struktur — varje inlägg

1. **TL;DR-stycke högst upp** — svaret på rubriken i 2–3 meningar. Detta är vad ChatGPT/Perplexity plockar.
2. **Innehållsförteckning** med ankarlänkar (för långa inlägg).
3. **H2-sektioner** där varje sektion svarar på *en* specifik fråga.
4. **Konkret material:** siffror, tabeller, listor, exempel — inte adjektiv.
5. **FAQ-sektion** i botten — frågor i exakt det format folk googlar på.
6. **Författarbio + relaterade länkar.**

## 6. Schema (alltid)

Varje blogginlägg måste ha:

- `Article` med `author: Person` (Conny, `@id: https://omniwise.se/#conny-mohlin`)
- `publisher: ProfessionalService` (OmniWise AB, `@id: https://omniwise.se/#organization`)
- `BreadcrumbList`
- `FAQPage` om FAQ-sektion finns (vilket den nästan alltid bör)

Mall: `/blogg/ai-utvecklare-kostnad-2026.html` har allt detta korrekt.

## 7. Workflow — så här beställer Conny ett nytt inlägg

**Snabbaste vägen (i Claude Code chat):**

```
Skriv ett blogginlägg om "AI-agent vs chatbot — vad är skillnaden?".
Personliga vinklar:
- [valfritt — en anekdot, en åsikt, en irriterad fundering]
- [valfritt — en kund/situation jag stötte på som illustrerar poängen]
```

**Jag (eller annan AI) gör då:**

1. Läser den här filen + tidigare inlägg som referens
2. Skapar ny branch `feature/blogg-<slug>`
3. Skriver utkast i `blogg/<slug>.html` med komplett schema, FAQ, struktur
4. Lägger till länk i `blogg/index.html` (featured eller i en "tidigare inlägg"-sektion)
5. Uppdaterar `sitemap.xml`
6. Öppnar PR mot `main`

**Conny:**
- Läser igenom, redigerar 10–20 % där det inte låter som Conny
- Mergar när nöjd → Cloudflare deployar

## 8. Referenser

- **Riktigt befintligt inlägg:** [`/blogg/ai-utvecklare-kostnad-2026.html`](blogg/ai-utvecklare-kostnad-2026.html) — bör läsas innan du skriver nytt.
- **Connys ton från sajten:** [`/about.html`](about.html) — första person, direkt.
- **Sökordsstrategi:** [`GEO-KEYWORDS.md`](GEO-KEYWORDS.md) — vad inläggen ska sikta in sig på.
- **Kommande ämnen:** finns på [`/blogg/`](blogg/) under "Kommande ämnen".

## 9. TODO för senare iterationer av den här guiden

- [ ] Lägg till 2–3 verkliga citat ur Connys LinkedIn-inlägg när sådana finns
- [ ] Lägg till "phrases Conny faktiskt använder" när vi sett några inlägg
- [ ] Anteckna exempel på humor som blev *för* mycket (eller för platt) efter feedback
