# ŽIVÉ SKLO — Stitch Design Prompt
## akce.zivesklo.cz — B2B One-Pager

---

## PROJEKT

Navrhni B2B jednostránkový web (one-pager) pro **Živé Sklo** — mobilní sklářskou manufakturu, která jezdí na firemní akce, školní exkurze, městské slavnosti a soukromé události.

---

## PRIORITA ZADÁNÍ (pro Stitch)

Použij tento prioritní rámec při návrhu:

- **P1 (nejdůležitější):** Prémiový dojem, vysoká čitelnost, důvěryhodnost pro B2B publikum
- **P2:** Jasná obsahová hierarchie sekcí a konverzní tok směrem ke kontaktnímu formuláři
- **P3:** Motion detaily, mikrointerakce a vizuální finesa

### MUST-HAVE (musí zůstat zachováno)

- Nálada „Čerň a záře" (tmavý základ + amber + ice blue akcent)
- Jednostránková struktura se všemi definovanými sekcemi
- Luxusní, klidný, neagresivní charakter
- Silná mobilní použitelnost a čitelnost na všech velikostech
- Primární CTA směřující na poptávkový formulář

### CREATIVE FREEDOM (může se lišit)

- Typografické párování (při zachování serif display pro brand)
- Kompozice hero obsahu a rozvržení karet
- Styl ikon, ornamentů, přechodů a vizuálních textur
- Rytmus vertikálních rozestupů a interní grid systém

### NEGATIVE CONSTRAINTS (čemu se vyhnout)

- Vizuál nesmí působit lacině, přeplácaně nebo "jarmarečně"
- Nepoužívat agresivní animace, blikání nebo herní/neonový feeling
- Neupřednostnit efekt před čitelností a konverzí
- Nepůsobit jako e-shop ani "template" bez charakteru

---

## VÝSTUP OD STITCH

Vygeneruj dvě vizuální varianty stejného obsahu:

- **Varianta A:** více editorial / prémiová
- **Varianta B:** více moderní / minimalistická

U obou variant zachovej stejné obsahové bloky a CTA logiku, ale dovol odlišný art direction v mezích tohoto zadání.

---

## VIZUÁLNÍ IDENTITA & NÁLADA

**Název / wordmark:** ŽIVÉ SKLO (bez loga, pouze typografie — serif display font)

**Koncept:** „Čerň a záře" — kontrast hlubokých stínů a zářivého skla. Tmavé pozadí, glowing amber a ice blue jako akcenty.

**Nálada:** prémiová, klidná, exkluzivní. Web má „dýchat" — řemeslná luxusní značka, ne lidový trh.

**Barevná inspirace materiálem:** uhelná čerň → jantarová/zlatá → čirá ledová modrá → bílá.

**Typografie:** kombinace moderního patkového písma (nadpisy — luxus a tradice) s čistým bezpatkovým (tělo — čitelnost).

**Fotografie:** detaily plamene, roztavené sklo, ruce řemeslníka — dramatické, tmavé, atmosferické.

---

## MOTION — ZÁMĚR (ne technické hodnoty)

Veškerý pohyb má působit jako roztavené sklo: plynule, pomalu, váženě. Žádné hravé nebo agresivní efekty.

- Sekce se objevují plynule při scrollování
- Hero pozadí se pohybuje pomaleji než scroll (parallax)
- Carousel v hero přechází crossfade — **bez viditelných ovládacích prvků** (žádné šipky, žádné tečky)
- Čísla v sekci statistik se animují při prvním zobrazení (count-up)
- Karty programů reagují jemně na hover
- Navigace se při scrollu fixuje a získává tmavé prosklené pozadí
- Galerie se horizontálně scrolluje s momentum efektem

### Přístupnost a UX minimum

- Kontrast textu na tmavém pozadí musí být dostatečný i na mobilu
- Text nesmí splývat s hero fotografiemi (overlay/gradient dle potřeby)
- Touch cíle (tlačítka, odkazy) musí být pohodlné pro mobilní ovládání

---

## NAVIGACE

- Vlevo: wordmark **ŽIVÉ SKLO** (serif)
- Vpravo: anchor links — Co nabízíme / Pro koho jsme / Galerie / Kontakt
- Vpravo CTA tlačítko: **Poptat akci**
- Mobile: hamburger → full-screen dark overlay, centered links

---

## SEKCE 1 — HERO (celá výška viewportu)

**Pozadí:** automatický carousel — pomalý crossfade mezi 3 fotografiemi, žádné ovládací prvky:
- `https://images.unsplash.com/photo-1597340052277-6b63c81fb9b5?w=1920&q=85`
- `https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1920&q=85`
- `https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=1920&q=85`

**Obsah (statický, centrovaný):**

H1: *„Zažijte kouzlo foukaného skla na vlastní oči."*

Podtitulek: *„Přivezeme živou sklářskou dílnu přímo k vám na firemní akce, školní exkurze i městské slavnosti. Žádné výrobky z krabice. Jen oheň, sklo a lidský dech."*

Věta důvěry (malá, tlumená): *„Vhodné pro školy, firmy i městské slavnosti."*

4 ikonkové pilulky: 🔥 Živá výroba skla / 🏫 Školní programy / 🏙 Městské slavnosti / 🏢 Firemní akce

CTA tlačítko (velké, amber): **„Nezávazně poptat akci"** → kotva na kontaktní formulář

---

## SEKCE 2 — O PROJEKTU

Nadpis: *„Nepřivezeme jen výrobky. Přivezeme celý příběh jejich vzniku."*

Text: *„Živé Sklo je mobilní sklářská dílna z Vsetína — města s dlouhou tradicí výroby skleněných ozdob. Naše dílna se vejde do jedné dodávky a může se rozložit téměř kdekoliv — na náměstí, ve firmě nebo ve škole. Návštěvníci sledují celý proces výroby od zahřátí skleněné trubice v plameni až po vznik hotové ozdoby. Každá ozdoba je originál. A každý zážitek zůstane. Projekt vznikl z více než dvacetileté zkušenosti s výrobou skleněných vánočních ozdob ve Vsetíně."*

Fotografie vedle textu: `https://images.unsplash.com/photo-1597340052277-6b63c81fb9b5?w=900&q=85`

---

## SEKCE 3 — JAK TO FUNGUJE

Nadpis: *„Jak to celé funguje"*

4 kroky (horizontálně na desktopu, velká čísla):

**Krok 01 — Poptávka**
*„Pošlete nám základní informace o akci — termín, místo a přibližný počet hostů."*

**Krok 02 — Příprava**
*„Potvrdíme termín, domluvíme program a připravíme veškeré vybavení."*

**Krok 03 — Akce**
*„Přijedeme, rozbalíme mobilní sklářskou dílnu a vytvoříme fascinující atmosféru přímo u vás."*

**Krok 04 — Výsledek**
*„Hosté si odnesou nezapomenutelný zážitek a často i vlastnoručně vyrobenou ozdobu."*

Věta důvěry pod kroky (tlumená, centrovaná): *„Program je vhodný pro malé i velké akce — od školních skupin po městské slavnosti."*

---

## SEKCE 4 — CO NABÍZÍME

Nadpis: *„Co si můžete objednat"*

Podtitulek: *„Každý program přizpůsobujeme na míru počtu účastníků, délce akce i vašemu záměru."*

### 3 hlavní karty programů:

**Živé divadlo řemesla**
*„Fascinující sklářská show, která se stane magnetem vaší akce a zastaví každého kolemjdoucího. Vaši hosté sledují vznik skleněné ozdoby od skleněné trubice až po hotový výrobek. Ticho, soustředění, dech a pak obdiv."*
Vhodné pro: Města, trhy, slavnosti, firemní večírky
Cena: Od 12 000 Kč
Tlačítko: **Nezávazně poptat**

**Týmový rituál – Firemní event**
*„Neobvyklý zážitek pro firmy a týmy. Foukání skla vyžaduje soustředění a preciznost — přesně to, na čem stojí dobrá spolupráce ve vašem týmu. Každý odchází s vlastnoručně vyrobenou ozdobou."*
Vhodné pro: Firmy, teambuildingy, firemní večírky
Délka: 2–4 hodiny / Min. 10 osob
Cena: Od 8 000 Kč
Tlačítko: **Nezávazně poptat**

**Fyzika v plamenech – Školní program**
*„Přineste do školy zážitek, který propojí fyziku, chemii a tradiční řemeslo v jednom odpoledni. Programy jsou navrženy tak, aby děti bavily a zároveň něco naučily o materiálu a lidském dechu."*
Vhodné pro: MŠ, ZŠ, SŠ
Délka: 90 minut – 3 hodiny
Cena: Od 120 Kč/žák
Tlačítko: **Nezávazně poptat**

### 3 doplňkové menší formáty (pod hlavními kartami):

**Kreativní dílna**
*„Malování a zdobení vlastní ozdoby barvami, glitry, zdobicími technikami. Žádné dvě nejsou stejné. Bezpečná alternativa bez ohně — ideální pro nejmenší děti nebo velké skupiny."*
Cena: Od 100 Kč/osoba
Tlačítko: **Nezávazně poptat**

**Adventní sklářská dílna**
*„Kompletní program pro vánoční trhy, nákupní centra a sváteční firemní setkání. Vytvoří pravou vánoční atmosféru s vůní tradice a leskem ručně foukaných ozdob."*
Tlačítko: **Nezávazně poptat**

**Personifikace – Psaní na přání**
*„Ruční psaní jmen, věnování nebo důležitých dat přímo na hotové ozdoby. Hosté si odnesou suvenýr s vysokou osobní hodnotou, který se stane trvalou rodinnou památkou."*
Tlačítko: **Nezávazně poptat**

---

## SEKCE 5 — PRO KOHO JSME

Nadpis: *„Pro ty, kdo chtějí nabídnout lidem něco opravdového."*

3 bloky vedle sebe:

**Školy a vzdělávací instituce**
Label: Školy
Heading: *„Výuka, která se nezapomene"*
*„Přineste do školy zážitek, který propojí fyziku, chemii a tradiční řemeslo. Programy jsou navrženy tak, aby děti bavily a zároveň něco naučily."*
- Programy pro MŠ, ZŠ i SŠ
- Přijedeme k vám nebo vás přivítáme v dílně
- Možnost propojení s výukou fyziky a přírodovědy
- Každé dítě si odnese vlastní výrobek
Tlačítko: **Nezávazně poptat**

**Města, obce a kulturní akce**
Label: Města a obce
Heading: *„Živá sklářská dílna jako kulturní atrakce"*
*„Hledáte program, který přitáhne pozornost na vašem trhu nebo slavnosti? Mobilní sklářská dílna zastaví každého kolemjdoucího. Není to stánek — je to živé divadlo řemesla."*
- Vhodné pro vánoční trhy, slavnosti a festivaly
- Samostatná instalace bez velkých nároků na zázemí
- Přitahuje rodiny, děti i dospělé
- Připomíná tradiční řemeslo a sklářství
Tlačítko: **Nezávazně poptat**

**Firmy a firemní akce**
Label: Firmy
Heading: *„Zážitek, který spojuje tým"*
*„Foukání skla vyžaduje soustředění a preciznost — přesně to, na čem stojí dobrá spolupráce v týmu. Navíc si každý účastník odnese vlastnoručně vyrobenou ozdobu."*
- Teambuilding pro 10–50 osob
- Možnost živé ukázky na firemním večírku
- Program přizpůsoben na míru firmě
- Každý účastník si odnese vlastní výrobek
- Program na 2–4 hodiny
Tlačítko: **Nezávazně poptat**

---

## SEKCE 6 — ČÍSLA

3 statistiky v řadě, velká čísla (amber), popis bílý. Čísla se animují při scrollu do pohledu.

- **1 200 °C** — Teplota plamene při foukání skla
- **100 %** — Ručně vyrobené, každý kus je originál
- **1 dech** — Každá ozdoba vzniká jediným lidským dechem

---

## SEKCE 7 — GALERIE

Nadpis: *„Galerie zážitků — Živé sklo v akci"*

Horizontální scrollovatelný pás s 5 fotografiemi (portrétní poměr), překrývající okraje viewportu. Okraje pásma se prolínají do tmavého pozadí (signalizuje scroll). Hint text: *„← přetáhni pro více →"*

Fotografie (dočasné Unsplash placeholdery — klient dodá vlastní):
1. `https://images.unsplash.com/photo-1597340052277-6b63c81fb9b5?w=840&q=85`
2. `https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=840&q=85`
3. `https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=840&q=85`
4. `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=840&q=85`
5. `https://images.unsplash.com/photo-1604871000636-074fa5117945?w=840&q=85`

---

## SEKCE 8 — PROČ ŽIVÉ SKLO

Nadpis: „Proč zvolit Živé sklo pro vaši akci"

4 benefity (grid), každý s ikonou, titulem a krátkým textem:

- Přijedeme vybaveni
  „Nic nemusíte zajišťovat. Přivezeme veškeré vybavení a postaráme se o bezpečný provoz."

- Bezpečný provoz
  „V souladu s požadavky pojišťoven a přísnými normami. Bezpečný provoz vhodný pro veřejné akce."

- Pro každou akci
  „Program vhodný pro děti i dospělé, pro malé skupiny i velké akce od 10 do 500 lidí."

- Profesionální komunikace
  „Komunikujeme profesionálně — smlouva, faktura, pojištění."

Odkaz pod gridem: „Stáhnout informační list pro pořadatele" (pokud PDF není připravené, zobraz jako neaktivní placeholder, ne jako 404 odkaz)

---

## SEKCE 9 — KONTAKT / POPTÁVKA

Nadpis: „Poptejte svoji akci"

Podtitulek: „Vyplňte krátký formulář a my se vám co nejdříve ozveme s nabídkou na míru."

Formulářová pole:
- Jméno a příjmení
- E-mail
- Telefon
- Typ akce (select: Teambuilding / Škola / Město – trh / Kreativní dílna / Firemní dárky / Jiné)
- Přibližné datum a místo konání
- Počet účastníků
- Zpráva (textarea)
- Souhlas se zpracováním osobních údajů (GDPR checkbox)

Tlačítko odeslání: „Odeslat poptávku"

---

## SEKCE 10 — FOOTER

ŽIVÉ SKLO
„Vsetínská mobilní manufaktura foukaného skla."

Navigační odkazy: Co nabízíme / Pro koho jsme / Galerie / Kontakt

Kontakt:
- info@zivesklo.cz
- 737 206 653

Sociální sítě: Instagram @zivesklo / Facebook Živé Sklo

© 2026 Živé Sklo – Vlastimil Juřička. Všechna práva vyhrazena.

