/**
 * Content constants for Živé Sklo website
 * All Czech copy, structured by section
 */

export const BRAND = {
  name: "ŽIVÉ SKLO",
  tagline: "Vsetínská mobilní manufaktura foukaného skla.",
};

export const NAV = {
  links: [
    { label: "Co nabízíme", href: "#nabidka" },
    { label: "Pro koho jsme", href: "#pro-koho" },
    { label: "Galerie", href: "#galerie" },
    { label: "Kontakt", href: "#kontakt" },
  ],
  ctaLabel: "Poptat akci",
  ctaHref: "#kontakt",
};

export const HERO = {
  backgroundImages: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCPv46HEAkeK13i3ks4NUpwZgMfxR3g6nQ1HjEV2R8szvtlGpgXF_JTi-Nv5ouu8Bi4Ka9VM4RmixZB5pKHtGjSuCXgCHm4u-CJjgPKALAzFAkK8Y4mOrlyjYBpYiYp7-klGzPepQfPsqyXMeKqQnhZzIECIKd32yAaibwBoYWMP0DgAeHNlAiIPlUIvjDP4-83MsTdsp2k5uRbbbJm1-2MyBRpJ-KXB0hTwfnjqkcfYQSURNDuraITupZ2yrM0RJH-6qOJtzQ5m48",
  ],
  h1Prefix: "Zažijte kouzlo",
  h1Highlight: "foukaného skla",
  h1Suffix: "na vlastní oči.",
  subtitle:
    "Přivezeme sklářskou pec přímo na vaši akci. Unikátní spojení tradičního řemesla, ohně a moderního designu, které vaše hosty uchvátí.",
  pills: [
    { label: "PREMIUM B2B", accent: true },
    { label: "LIVE SHOW" },
    { label: "WORKSHOPS" },
    { label: "CZECH CRAFT" },
  ],
  ctaLabel: "Nezávazně poptat akci",
  ctaHref: "#kontakt",
  secondaryCtaLabel: "Prohlédnout nabídku",
  secondaryCtaHref: "#nabidka",
};

export const ABOUT = {
  heading: "Nepřivezeme jen výrobky. Přivezeme celý příběh jejich vzniku.",
  text: "Živé Sklo je mobilní sklářská dílna z Vsetína — města s dlouhou tradicí výroby skleněných ozdob. Naše dílna se vejde do jedné dodávky a může se rozložit téměř kdekoliv — na náměstí, ve firmě nebo ve škole. Návštěvníci sledují celý proces výroby od zahřátí skleněné trubice v plameni až po vznik hotové ozdoby. Každá ozdoba je originál. A každý zážitek zůstane. Projekt vznikl z více než dvacetileté zkušenosti s výrobou skleněných vánočních ozdob ve Vsetíně.",
  image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
};

export const PROCESS = {
  heading: "Jak to celé funguje",
  steps: [
    {
      number: "01",
      title: "Poptávka",
      description:
        "Pošlete nám základní informace o akci — termín, místo a přibližný počet hostů.",
    },
    {
      number: "02",
      title: "Příprava",
      description:
        "Potvrdíme termín, domluvíme program a připravíme veškeré vybavení.",
    },
    {
      number: "03",
      title: "Akce",
      description:
        "Přijedeme, rozbalíme mobilní sklářskou dílnu a vytvoříme fascinující atmosféru přímo u vás.",
    },
    {
      number: "04",
      title: "Výsledek",
      description:
        "Hosté si odnesou nezapomenutelný zážitek a často i vlastnoručně vyrobenou ozdobu.",
    },
  ],
  trustLine:
    "Program je vhodný pro malé i velké akce — od školních skupin po městské slavnosti.",
};

export const OFFER = {
  heading: "Co si můžete objednat",
  subtitle:
    "Každý program přizpůsobujeme na míru počtu účastníků, délce akce i vašemu záměru.",
  primary: [
    {
      title: "Živé divadlo řemesla",
      description:
        "Fascinující sklářská show, která se stane magnetem vaší akce a zastaví každého kolemjdoucího. Vaši hosté sledují vznik skleněné ozdoby od skleněné trubice až po hotový výrobek. Ticho, soustředění, dech a pak obdiv.",
      suitableFor: "Města, trhy, slavnosti, firemní večírky",
      price: "Od 12 000 Kč",
      ctaLabel: "Nezávazně poptat",
      ctaHref: "#kontakt",
    },
    {
      title: "Týmový rituál – Firemní event",
      description:
        "Neobvyklý zážitek pro firmy a týmy. Foukání skla vyžaduje soustředění a preciznost — přesně to, na čem stojí dobrá spolupráce ve vašem týmu. Každý odchází s vlastnoručně vyrobenou ozdobou.",
      suitableFor: "Firmy, teambuildingy, firemní večírky",
      duration: "2–4 hodiny / Min. 10 osob",
      price: "Od 8 000 Kč",
      ctaLabel: "Nezávazně poptat",
      ctaHref: "#kontakt",
    },
    {
      title: "Fyzika v plamenech – Školní program",
      description:
        "Přineste do školy zážitek, který propojí fyziku, chemii a tradiční řemeslo v jednom odpoledni. Programy jsou navrženy tak, aby děti bavily a zároveň něco naučily o materiálu a lidském dechu.",
      suitableFor: "MŠ, ZŠ, SŠ",
      duration: "90 minut – 3 hodiny",
      price: "Od 120 Kč/žák",
      ctaLabel: "Nezávazně poptat",
      ctaHref: "#kontakt",
    },
  ],
  secondary: [
    {
      title: "Kreativní dílna",
      description:
        "Malování a zdobení vlastní ozdoby barvami, glitry, zdobicími technikami. Žádné dvě nejsou stejné. Bezpečná alternativa bez ohně — ideální pro nejmenší děti nebo velké skupiny.",
      price: "Od 100 Kč/osoba",
      ctaLabel: "Nezávazně poptat",
      ctaHref: "#kontakt",
    },
    {
      title: "Adventní sklářská dílna",
      description:
        "Kompletní program pro vánoční trhy, nákupní centra a sváteční firemní setkání. Vytvoří pravou vánoční atmosféru s vůní tradice a leskem ručně foukaných ozdob.",
      ctaLabel: "Nezávazně poptat",
      ctaHref: "#kontakt",
    },
    {
      title: "Personifikace – Psaní na přání",
      description:
        "Ruční psaní jmen, věnování nebo důležitých dat přímo na hotové ozdoby. Hosté si odnesou suvenýr s vysokou osobní hodnotou, který se stane trvalou rodinnou památkou.",
      ctaLabel: "Nezávazně poptat",
      ctaHref: "#kontakt",
    },
  ],
};

export const AUDIENCE = {
  heading: "Pro koho tvoříme",
  segments: [
    {
      icon: "corporate_fare",
      heading: "Firemní Eventy",
      description:
        "Teambuildingy a večírky, které vybočují z řady. Přiveďte své kolegy k ohni.",
    },
    {
      icon: "campaign",
      heading: "Marketingové Akce",
      description:
        "Představení nových produktů nebo brandové kampaně s unikátním vizuálem.",
    },
    {
      icon: "location_city",
      heading: "Městské Slavnosti",
      description:
        "Kulturní program pro širokou veřejnost s důrazem na české tradice.",
    },
    {
      icon: "celebration",
      heading: "VIP Konference",
      description:
        "Exkluzivní doprovodný program pro ty nejnáročnější obchodní partnery.",
    },
  ],
};

export const STATS = {
  items: [
    {
      value: "150+",
      label: "Akcí ročně",
    },
    {
      value: "12k+",
      label: "Vyfouklých skel",
    },
    {
      value: "10",
      label: "Let tradice",
    },
    {
      value: "100%",
      label: "Bezpečnost",
    },
  ],
};

export const GALLERY = {
  heading: "Galerie zážitků — Živé sklo v akci",
  hint: "← přetáhni pro více →",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD7ZcrjEp2noAffj_xV5nmKW6naEKgPmceA1ksPBFhDA87A4mYrXCB3cAIJwYFTNcO-TN83dcerjKTeY2l3P55SNx5LTl6wOOGkwv5A_nQPfqaZravOiX5sfYPgSAx40g8HYi931cfTKhJBmm5hUWi3PoOWey7ER8jlxkc7RFUq7cHrCiw0CF3H7XWITt4BoycLQ9bSkRH_Wbqfq1ervyIXlsVOUOc9DdkH4pev4hs3fN3SXolM0Mi4Cy0CJUU6R_xMRJ4BH_cStPk",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDxXFa8yY7_ZWuIcZTjbmVSAKec1SeUyCeMhRwe_dLhY17VnIbvmDm8oBG8gVtng3SZQEkC-5i4X4HxnuubWzeUJpasVviqGBkr0ineqjHg85Hxfi21CV2BjfJuf20GpEz-7IiqeBbJhQCo0FUM6gETq1CWegB70uIM6Wt5m36xeUidgBmlRYUxhBdMQhB0OBchZENfaOA0MYhSTeg7tIirP-tdNu6jCgtD7_Qb8zMq8q75kYZSNQIAQ2I8FNpEA7Na6PROPNAzhT4",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB7YYq1bWkpWuVruwm8UztdX5f_INz9ZTy_1jwuqkUJ_7p68vf6jHsgsTWquVrS1qYN3KiTfCUPIUl1fkE_Yq738j0QiNtxxUfqkMlXJIIvJ0WNwqI3jMsI0o_MEZw7azs1tbrVT019JNzyUaEqAeWb1lOGqXmMmKryP1UK6exTjHsE6gjrfsnY6eSMxqwnZKxCc1AKxY_D8qbbxfF7EIBWDWuQIXBNwZ0DnFWBUKuFdxXcRLfG4BJTLG9bM-EUeaCxQsUMlPLA6k4",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCnOFDcu1dmt4pZXk1kk289Ouj8Mtnon0ugA0XWsx2jphLgqQ5yEDp9HdzlJ3YUfJ6vHHX0JXqOpcUQ3nixVF_Zq9f0Yf6LQq1-wiNC30hYL0YNxUvWtgD3ib0bZTQ8hJMCgcHE1Mo9A2p8ITHNlZSqKoUxEL1N-pJmiC7I8jD7v_vVjIoYsItkKBgjZndyOTVc7BA78EkMZnYo2EW5mCmlVGtuKqWju7QO8kCXFx3_PzRu1NJLnB33ztznbszNoPhGUs0QMocrqIU",
  ],
};

export const BENEFITS = {
  heading: "Proč zvolit Živé sklo pro vaši akci",
  items: [
    {
      title: "Autentičnost",
      description:
        "Žádné atrapy. Pracujeme s teplotami přes 1100°C a skutečným sklářským kmenem.",
    },
    {
      title: "Mobilita",
      description:
        "Díky naší technologii nepotřebujeme žádné speciální připojení. Jsme soběstační.",
    },
    {
      title: "Design",
      description:
        "Naše výrobky nejsou jen suvenýry, ale designové objekty, které si lidé vystaví.",
    },
    {
      title: "Flexibilita",
      description:
        "Přizpůsobíme vizuál pece a oblečení personálu vašemu brandu nebo tématu akce.",
    },
  ],
  downloadLabel: "Stáhnout informační list pro pořadatele",
  downloadHref: "#", // Placeholder - not ready yet
};

export const CONTACT = {
  heading: "Poptejte svoji akci",
  subtitle:
    "Vyplňte krátký formulář a my se vám co nejdříve ozveme s nabídkou na míru.",
  fields: {
    name: {
      label: "Jméno a příjmení",
      placeholder: "Vaše jméno",
      required: true,
    },
    email: {
      label: "E-mail",
      placeholder: "vas@email.cz",
      required: true,
      type: "email",
    },
    phone: {
      label: "Telefon",
      placeholder: "+420 123 456 789",
      required: true,
      type: "tel",
    },
    eventType: {
      label: "Typ akce",
      required: true,
      options: [
        { value: "", label: "Vyberte typ akce" },
        { value: "teambuilding", label: "Teambuilding" },
        { value: "school", label: "Škola" },
        { value: "city-market", label: "Město – trh" },
        { value: "creative-workshop", label: "Kreativní dílna" },
        { value: "corporate-gifts", label: "Firemní dárky" },
        { value: "other", label: "Jiné" },
      ],
    },
    datePlace: {
      label: "Přibližné datum a místo konání",
      placeholder: "Např. 15. 5. 2026, Praha",
      required: true,
    },
    participants: {
      label: "Počet účastníků",
      placeholder: "Např. 30",
      required: true,
    },
    message: {
      label: "Zpráva",
      placeholder: "Napište nám více o vaší akci...",
      required: false,
    },
    gdpr: {
      label: "Souhlasím se zpracováním osobních údajů",
      required: true,
    },
  },
  submitLabel: "Odeslat poptávku",
};

export const FOOTER = {
  brand: BRAND,
  legal: [
    { label: "Obchodní podmínky", href: "#" },
    { label: "Ochrana údajů", href: "#" },
    { label: "Cookies", href: "#" },
  ],
  copyright: "© 2024 Živé Sklo. Všechna práva vyhrazena.",
};
