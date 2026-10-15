# Audit: omniwise.se · 4 sep 2026 · fixpass 6 sep · mätning 15 okt

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

### [ ] 10. Google-profilen: tomma fält och serviceområden

Tomma fält enligt ditt klistrade profilutdrag: **Sociala profiler**
(trots att LinkedIn finns), **Öppningsdatum**, Från företaget,
Tjänstealternativ och Målgrupp. Serviceområden är 4 av 20 möjliga
(Habo, Bankeryd, Mullsjö, Jönköping).

**Vem:** du, i Google Business Profile
**Tid:** 15 min
**Ändringar:** inga på sajten.

### [ ] 11. Klistra in Tjänster och Produkter från Google-profilen

Utan dem går två av fyra lokala mått inte att mäta: Tjänster (mål 50)
och Produkter (mål 20). Redigera profil → Redigera tjänster → markera
allt → klistra in. Samma för produkter.

**Vem:** du
**Tid:** 2 min
**Ändringar:** inga.

### [ ] 12. Kannibalisering på ditt enda sökord

Semrush 15 okt: tre URL:er konkurrerar om "it företag jönköping" (70/mån).

| URL | Position |
|---|---|
| `/contact` | **29** |
| `/` | 48 |
| `/services` | 68 |

Kontaktsidan rankar bäst på din enda kommersiella term. Det är fel sida:
den är kort och saknar tjänstebeskrivning (181 ord mätt 4 sep, före
Bookings-CTA:n).

Sedan 4 sep är tre sökord borta: "atomize" (pos 65) och "cloudwiser ab"
(pos 43) var slumpträffar och ingen förlust, men **"it konsult jönköping"
(pos 35) var kommersiellt och är borta.** Unika sökord: 4 → 1.

**Vem:** du och jag · **Orsak:** ingen sida äger termen tydligt.
Löses av punkt 16, inte av en teknisk fix. Mätt 15 okt.

### [ ] 13. Perplexity anger fel grundningsår och uppger LinkedIn som källa

Perplexity svarar att du startade OmniWise i **september 2025**. Sajten
säger 2024, verifierat i `llms.txt`, `en/llms.txt` och `foundingDate` i
schemat på både `index.html` och `en/index.html`.

**Jag har inte öppnat LinkedIn-sidan.** Att modellen attribuerar årtalet
till LinkedIn är inte bevis för att det står där — den kan lika gärna ha
härlett det ur registreringsdatum, inläggshistorik eller rent hallucinerat.
Grundorsaken avgör åtgärden, så den måste kontrolleras först.

**Vem:** du
**Tid:** 3 min
**Gör:** (1) öppna LinkedIn-företagssidan och se vad som faktiskt står.
Står 2025 där — rätta det. Står 2024 — då hallucinerar Perplexity, och
åtgärden är i stället att stärka entitetssignalerna. (2) Fyll i
Öppningsdatum i Google-profilen, som står som tomt i punkt 10.

### [ ] 14. Starta en ny Semrush-crawl

Senaste snapshot är 15 maj 2026 och ligger före tre fixar. Site Health
går inte att rapportera förrän den körts om.

**Vem:** du, i Semrush
**Tid:** 2 min
**Klickväg:** semrush.com/projects → omniwise.se → Site Audit → Rerun

### [ ] 15. Exportera de fyra Search Console-rapporterna

Du gav Coverage-exporten. Performance, Core Web Vitals och Manuella
åtgärder saknas. Utan dem är positioner och fältdata gissningar.

**Vem:** du
**Tid:** 2 min
**Ändringar:** inga.

### [ ] 16. Egna sidor för de tjänster du säljer · den verkliga flaskhalsen

Du rankar på **ett** unikt sökord (15 okt; var 4 den 4 sep, varav två
slumpträffar). Sju tjänster delar en enda /services-sida. Med 35 länkande
domäner är taket ungefär KD 25, och allt nedan ligger under det.

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

### [ ] 17. Outreach-listan · domäner som länkar till båda konkurrenterna men inte till dig

hitta.se (AS 76) · eniro.se (60) · theorg.com (50) · ju.se (46) ·
jobbland.se (45) · curlie.org (34) · statsskuld.se (32) ·
gnosjoregion.se (31) · largestcompanies.com (30) · partnerbase.com (27)

De två översta är gratis svenska katalogregistreringar som också löser
citation-täckningen.

**Vem:** du
**Tid:** ~3 h för de tio

### [ ] 18. Footerns kontrast · ditt beslut

text-white/45 ger #737f90 på #001736 = 4,39:1, under WCAG AA 4,5:1.
text-white/50 ger 5,20:1 och klarar det. Varumärkestoken — orörd tills
du säger till.

### [ ] 19. Rubriknivåer hoppar H1 → H4

Hero-dashboardens kort använder h4 direkt efter h1. Kräver en markup-
och CSS-omskrivning av kortkomponenten, inte en mekanisk fix.

---

## AI-ytor: baslinje 4 sep 2026, åtkomst 6 sep, citeringar 15 okt

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

### Citeringsmätning 1 · 15 okt 2026 (Perplexity)

Kört skarpt i webbläsare, inloggningsfritt. **1 av 3 frågor ger citering.**

| Fråga | Citerad? | Vem som nämns |
|---|---|---|
| "vem är OmniWise AB" | **JA** | `omniwise.se/services` citerad 7 gånger som primärkälla. Tjänstebeskrivningen stämmer, Conny identifierad som VD — men grundningsåret blev fel, se punkt 13. |
| "bästa AI-utvecklare i Jönköping" | nej | **Siax** och **The Balthazar Project** namnges i stället. OmniWise nämns inte alls. |
| "Samsung Knox Manage konsult Sverige" | nej | Perplexity svarar ordagrant att "sökresultaten visar ingen specifik svensk konsult eller partner". 10 källor, samsung.com primär. |

**Vad det betyder — och vad det inte bevisar.** Perplexity citerar sajten
i dag, på varumärkesfrågan. Före 6 sep fick PerplexityBot 403 och kunde
inte hämta sidorna alls. Men **det finns ingen citeringsmätning från före
6 sep**, så att crawler-öppningen orsakade citeringen är inte mätt — bara
åtkomsten är det. Det här är mätning nummer 1; förändring kräver minst
två. På de två köpfrågorna syns OmniWise inte, vilket är förenligt med
(men inte bevis för) kombinationen "ett unikt sökord" och "ingen
tjänstesida per tjänst".

**Knox-frågan är öppet mål.** Du har en 2 919 ord lång bloggpost om
Samsung Knox Manage, och Perplexity hittar ingen svensk konsult i sina
källor. Posten svarar på "vad är det och vad kostar det", inte på "vem anlitar
jag". Det är skillnaden mellan en bloggpost och en tjänstesida.

**ChatGPT: ej försökt.** Ingen inloggad session fanns, och jag har inte
testat om utloggat läge räcker — chatgpt.com går att använda utloggat, så
det kan mycket väl gå.
**Google AI Mode: försökt, gick inte.** Utan inloggning är AI-läge-fliken
disabled och sidan tom. Kör båda manuellt med samma tre frågor, eller
logga in i webbläsaren om det krävs, så kör jag dem.

**Nästa mätning: november.** En surface mätt, två kvar. Rör sig
ingenting på köpfrågorna till dess är det inte crawlerna som är problemet
— det är att sajten har ett unikt sökord (punkt 16).

## Vad auditen inte mätte · 4 sep 2026, uppdaterad 15 okt

| Post | Typ | Vad som stänger det |
|---|---|---|
| GSC-frågor, positioner, CTR | saknas | Performance-exporten (punkt 15) |
| Core Web Vitals fältdata | saknas | CWV-exporten (punkt 15) |
| Manuell åtgärd | saknas | Skärmdump från GSC (punkt 15) |
| Semrush Site Health | inferred | Ny crawl (punkt 14) |
| Live AI-test: Google AI Mode | saknas | Blockerad utloggat, verifierat |
| Live AI-test: ChatGPT | saknas | Ej försökt; utloggat läge otestat |
| Map pack-position | saknas | Ingen tracking-kampanj i Semrush |
| Recensioner, du och konkurrenter | saknas | Du ser antalet i profilen |
| GBP tjänster och produkter | saknas | Punkt 11 |
| Citation-täckning | inferred | citations.md saknar svenska kataloger |
| 54 av 80 on-page-checkar | ej maskinverifierbara | Röst, intent, längd mot topp-3 |

**Rättelse mot första rapporten:** de 11 bilderna jag flaggade som
saknad alt-text har `alt=""` med `aria-hidden="true"` och är dekorativa.
Det är korrekt markup — inget att fixa.
