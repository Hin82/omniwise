# Audit: omniwise.se · 4 sep 2026, fixpass 6 sep · 16 sidor

### [x] 1. Ikonteckensnittet var 4 MB · LCP 22,4 s på startsidan
Klart 4 sep. Material Symbols laddades med fyra variabla axlar och utan
display-swap. Låst till de värden style.css använder + subsettad till 72
ikoner: 3 972 KB → 11,6 KB. Start 70 → 99, LCP 22,4 s → 1,6 s.

### [x] 2. Varje okänd URL svarade 200 med startsidan
Klart 4 sep. Ingen 404.html fanns, så /vad-som-helst returnerade
startsidans HTML med canonical mot /. Lade till 404.html med noindex.

### [x] 3. Telefonnumret fanns inte på sajten
Klart 4 sep. 0 av 16 sidor hade numret trots att det står i
Google-profilen. Nu i footern på alla 17 sidor, som eget kort på
kontaktsidorna och som telephone i JSON-LD.

### [x] 4. sameAs saknades i all strukturerad data
Klart 4 sep. LinkedIn fanns i llms.txt men inte i schema. Nu på alla sidor.

### [x] 5. 13 titlar och 8 meta descriptions utanför rätt längd
Klart 4 sep. Alla 16 sidor ligger nu i 50–60 respektive 140–160 tecken.

### [x] 6. Bilder utan mått, inga WebP, extern kartbild
Klart 4 sep. width/height på alla 58 img-taggar, fetchpriority på
nav-logotypen, WebP (274 KB → 46 KB), kartbilden hemtagen från Googles
CDN (300 KB → 13 KB).

### [x] 7. llms.txt pekade på 10 döda .html-URL:er
Klart 4 sep. Rättade i llms.txt och en/llms.txt. La även till telefon
och bloggsektion.

### [x] 8. Cloudflare blockerade alla AI-crawlers · 403 mot GPTBot, ClaudeBot, PerplexityBot
Klart 6 sep. "Block AI bots" stod på Block och gav 403 på user-agent-nivå
medan Googlebot fick 200 — trots att robots.txt bjöd in dem. Satt till
"Allow (do not block)". Alla tolv testade crawlers får nu 200, och
byte-jämförelsen mot en webbläsare stämmer för samtliga tolv — se
AI-ytor nedan för metoden.

### [ ] 9. Cloudflare döljer e-postadressen för crawlers

Email Address Obfuscation skriver om den synliga adressen till
`[email protected]` och byter `mailto:`-länkarna mot
`/cdn-cgi/l/email-protection#<hex>`. En AI-crawler som läser den
renderade texten ser alltså inte `hello@omniwise.se`.

Begränsad skada: JSON-LD-propertyn `email` och `llms.txt` är orörda, så
adressen finns maskinläsbar på två ställen. Telefonnumret påverkas inte
alls. Men den synliga adressen på sajten är det inte.

**Vem:** du, i Cloudflare
**Tid:** 1 min
**Klickväg:** Scrape Shield → Email Address Obfuscation → Off
**Avvägning:** obfuskeringen finns för att bromsa skördare av
e-postadresser. Stänger du av den blir adressen läsbar för både AI och
spambottar. Ditt val — men den ligger redan i klartext i `llms.txt` och i
schemat, så skyddet är i praktiken redan genomhålat.

### [ ] 10. Google-profilen: sociala profiler och serviceområden

Sociala profiler är tomt trots att LinkedIn finns. Serviceområden är
4 av 20 möjliga (Habo, Bankeryd, Mullsjö, Jönköping).

**Vem:** du, i Google Business Profile
**Tid:** 10 min
**Ändringar:** inga på sajten.

### [ ] 11. Klistra in Tjänster och Produkter från Google-profilen

Utan dem går två av fyra lokala mått inte att mäta: Tjänster (mål 50)
och Produkter (mål 20). Redigera profil → Redigera tjänster → markera
allt → klistra in. Samma för produkter.

**Vem:** du
**Tid:** 2 min
**Ändringar:** inga.

### [ ] 12. Starta en ny Semrush-crawl

Senaste snapshot är 15 maj 2026 och ligger före tre fixar. Site Health
går inte att rapportera förrän den körts om.

**Vem:** du, i Semrush
**Tid:** 2 min
**Klickväg:** semrush.com/projects → omniwise.se → Site Audit → Rerun

### [ ] 13. Exportera de fyra Search Console-rapporterna

Du gav Coverage-exporten. Performance, Core Web Vitals och Manuella
åtgärder saknas. Utan dem är positioner och fältdata gissningar.

**Vem:** du
**Tid:** 2 min
**Ändringar:** inga.

### [ ] 14. Egna sidor för de tjänster du säljer · den verkliga flaskhalsen

Du rankar på 4 sökord, två av dem är slumpträffar. Sju tjänster delar
en enda /services-sida. Med 35 länkande domäner är taket ungefär KD 25,
och allt nedan ligger under det.

| Sökord | Volym | KD | CPC |
|---|---|---|---|
| ai utvecklare | 210 | 14 | 7,78 kr |
| mobile device management | 110 | 43 | 5,94 kr |
| interim it-chef | 50 | 5 | 12,79 kr |
| molntjänster företag | 50 | 19 | 3,29 kr |
| ai konsult | 50 | 10 | 2,46 kr |
| webbutveckling jönköping | 30 | 15 | 1,82 kr |

**Vem:** du och jag, via /service-page (innehållsarbete, inte en fix)
**Tid:** en sida i taget

### [ ] 15. Outreach-listan · domäner som länkar till båda konkurrenterna men inte till dig

hitta.se (AS 76) · eniro.se (60) · theorg.com (50) · ju.se (46) ·
jobbland.se (45) · curlie.org (34) · statsskuld.se (32) ·
gnosjoregion.se (31) · largestcompanies.com (30) · partnerbase.com (27)

De två översta är gratis svenska katalogregistreringar som också löser
citation-täckningen.

**Vem:** du
**Tid:** ~3 h för de tio

### [ ] 16. Footerns kontrast · ditt beslut

text-white/45 ger #737f90 på #001736 = 4,39:1, under WCAG AA 4,5:1.
text-white/50 ger 5,20:1 och klarar det. Varumärkestoken — orörd tills
du säger till.

### [ ] 17. Rubriknivåer hoppar H1 → H4

Hero-dashboardens kort använder h4 direkt efter h1. Kräver en markup-
och CSS-omskrivning av kortkomponenten, inte en mekanisk fix.

---

## AI-ytor: baslinje 4 sep 2026, uppdaterad 6 sep

**Åtkomst, mätt 6 sep 2026 efter att Cloudflare-blockeringen togs bort:**

| User-agent | 4 sep | 6 sep |
|---|---|---|
| GPTBot, OAI-SearchBot, ChatGPT-User | 403 | **200** |
| ClaudeBot, Claude-SearchBot | 403 | **200** |
| PerplexityBot | 403 | **200** |
| Bytespider, Amazonbot | 403 | **200** |
| Googlebot, bingbot, Applebot, Google-Extended | 200 | 200 |

Verifierat att de får riktigt innehåll och inte en utmaningssida.
Omfattningen skiljer sig per adress — startsidan är mätt för alla tolv,
de tre övriga adresserna för tre crawlers:

| Adress | Content-Type | Vad som verifierades |
|---|---|---|
| `/` | `text/html` | Alla **tolv** crawlers: 34 948 B, och sha256 identisk med en webbläsare efter normalisering (se nedan). |
| `/services` · `/blogg/samsung-knox-manage-2026` | `text/html` | GPTBot, PerplexityBot och ClaudeBot: identiska bytes som webbläsare (47 561 / 60 954 B). 4-5 JSON-LD-block per sida med `telephone` och `sameAs` intakt. |
| `/llms.txt` | `text/plain` | GPTBot, PerplexityBot och ClaudeBot: identiska bytes som webbläsare (2 660 B, 36 rader). Ren text utan markup — telefonnumret som klartext, inte som schema. |

**Om normaliseringen.** Rå sha256 skiljer sig mellan varje hämtning av `/`,
även mellan två webbläsarhämtningar efter varandra — Cloudflares
Email Address Obfuscation roterar sitt chiffer per request. Efter att det
chiffret normaliserats bort är alla tolv crawlers byte-identiska med
webbläsaren. Skillnaden är alltså per request, inte bot mot webbläsare.

**Citeringar är ännu inte mätta.** Åtkomst är inte samma sak som
indexering — räkna med två till sex veckor. Kör testet i oktober: fråga
ChatGPT, Perplexity och Google AI Mode "vem är OmniWise AB", "bästa
AI-utvecklare i Jönköping" och "Samsung Knox Manage konsult Sverige", och
logga vilka som nämns. Rör sig ingenting till dess är det inte crawlerna
som är problemet — det är att sajten bara har fyra sökord (punkt 14).

## Vad auditen inte mätte · 4 sep 2026

| Post | Typ | Vad som stänger det |
|---|---|---|
| GSC-frågor, positioner, CTR | saknas | Performance-exporten (punkt 13) |
| Core Web Vitals fältdata | saknas | CWV-exporten (punkt 13) |
| Manuell åtgärd | saknas | Skärmdump från GSC (punkt 13) |
| Semrush Site Health | inferred | Ny crawl (punkt 12) |
| Live AI-test (citeringar) | saknas | Crawlers insläppta 6 sep; indexering tar 2-6 v. Mät i oktober |
| Map pack-position | saknas | Ingen tracking-kampanj i Semrush |
| Recensioner, du och konkurrenter | saknas | Du ser antalet i profilen |
| GBP tjänster och produkter | saknas | Punkt 11 |
| Citation-täckning | inferred | citations.md saknar svenska kataloger |
| 54 av 80 on-page-checkar | ej maskinverifierbara | Röst, intent, längd mot topp-3 |

**Rättelse mot första rapporten:** de 11 bilderna jag flaggade som
saknad alt-text har `alt=""` med `aria-hidden="true"` och är dekorativa.
Det är korrekt markup — inget att fixa.
