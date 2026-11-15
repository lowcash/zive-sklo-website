/**
 * Content constants for Živé Sklo website
 * All Czech copy, structured by section
 */
import { CONTACT_EVENT_TYPES, CONTACT_EVENT_TYPE_LABELS } from '@/lib/schemas/contact'
import {
  BRAND,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  SITE_ADDRESS_DISPLAY,
  SITE_ICO,
  SITE_LEGAL_NAME,
  SITE_LOCALITY,
  SITE_MAPS_URL,
  SITE_POSTAL_CODE,
  SITE_STREET_ADDRESS,
} from '@/lib/site-config'

export const NAV = {
  links: [
    { label: 'Co nabízíme', href: '#nabidka' },
    { label: 'Pro koho jsme', href: '#pro-koho' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
  ctaLabel: 'Poptat akci',
  ctaHref: '#kontakt',
}

export const HERO = {
  image: '/images/hero/production-hero.jpg',
  imageAlt: 'Roztavené sklo v plameni hořáku, ruce sklářky při práci',
  h1Prefix: 'Zažijte kouzlo',
  h1Highlight: 'foukaného skla',
  h1Suffix: 'na vlastní oči.',
  subtitle:
    'Přivezeme živou sklářskou dílnu přímo k vám na firemní akce, školní exkurze i městské slavnosti. Žádné výrobky z krabice. Jen oheň, sklo a lidský dech.',
  trustLine: 'Vhodné pro školy, firmy i městské slavnosti.',
  pills: [
    { label: 'Živá výroba skla', accent: true },
    { label: 'Školní programy' },
    { label: 'Městské slavnosti' },
    { label: 'Firemní akce' },
  ],
  ctaLabel: 'Nezávazně poptat akci',
  ctaHref: '#kontakt',
  secondaryCtaLabel: 'Prohlédnout nabídku',
  secondaryCtaHref: '#nabidka',
}

export const ABOUT = {
  heading: 'Nepřivezeme jen výrobky. Přivezeme celý příběh jejich vzniku.',
  text: 'Živé Sklo je mobilní sklářská dílna z Vsetína - města s dlouhou tradicí výroby skleněných ozdob. Naše dílna se vejde do jedné dodávky a může se rozložit téměř kdekoliv - na náměstí, ve firmě nebo ve škole. Návštěvníci sledují celý proces výroby od zahřátí skleněné trubice v plameni až po vznik hotové ozdoby. Každá ozdoba je originál. A každý zážitek zůstane. Projekt vznikl z více než dvacetileté zkušenosti s výrobou skleněných vánočních ozdob ve Vsetíně.',
  image: '/images/gallery/glass-detail-tall.jpg',
  imageAlt: 'Hromada ručně foukaných skleněných baněk a trubic',
  eyebrow: 'O projektu',
  facts: [
    { value: 'Vsetín', label: 'Město s tradicí skleněných ozdob' },
    { value: '20+ let', label: 'Zkušeností s výrobou skleněných ozdob' },
    { value: '1 dodávka', label: 'Je vše, co naše dílna potřebuje' },
  ],
}

export const VIDEO = {
  heading: 'Živé sklo naživo',
  subtitle: 'Podívejte se, jak sklářská dílna vypadá naživo při\u00A0akci.',
  src: '/videos/zive-sklo-akce.mp4',
  poster: '/videos/zive-sklo-akce-poster-vertical.jpg',
  eyebrow: 'Ukázka z akce',
  ariaLabel: 'Video ze sklářské akce Živého skla',
}

export const PROCESS = {
  eyebrow: 'Postup',
  heading: 'Jak to celé funguje',
  steps: [
    {
      number: '01',
      title: 'Poptávka',
      description: 'Pošlete nám základní informace o akci - termín, místo a přibližný počet hostů.',
    },
    {
      number: '02',
      title: 'Příprava',
      description: 'Potvrdíme termín, domluvíme program a připravíme veškeré vybavení.',
    },
    {
      number: '03',
      title: 'Akce',
      description: 'Přijedeme, rozbalíme mobilní sklářskou dílnu a vytvoříme fascinující atmosféru přímo u vás.',
    },
    {
      number: '04',
      title: 'Výsledek',
      description: 'Hosté si odnesou nezapomenutelný zážitek a často i vlastnoručně vyrobenou ozdobu.',
    },
  ],
  trustLine: 'Program je vhodný pro malé i velké akce - od školních skupin po městské slavnosti.',
}

export const OFFER = {
  eyebrow: 'Nabídka',
  heading: 'Co si můžete objednat',
  subtitle: 'Každý program přizpůsobujeme na míru počtu účastníků, délce akce i vašemu záměru.',
  primary: [
    {
      title: 'Živé divadlo řemesla',
      description:
        'Fascinující sklářská show, která se stane magnetem vaší akce a zastaví každého kolemjdoucího. Vaši hosté sledují vznik skleněné ozdoby od skleněné trubice až po hotový výrobek. Ticho, soustředění, dech a pak obdiv.',
      suitableFor: 'Města, trhy, slavnosti, firemní večírky',
      price: 'Od 12 000 Kč',
      ctaLabel: 'Nezávazně poptat',
      ctaHref: '#kontakt',
    },
    {
      title: 'Týmový rituál – Firemní event',
      description:
        'Neobvyklý zážitek pro firmy a týmy. Foukání skla vyžaduje soustředění a preciznost - přesně to, na čem stojí dobrá spolupráce ve vašem týmu. Každý odchází s vlastnoručně vyrobenou ozdobou.',
      suitableFor: 'Firmy, teambuildingy, firemní večírky',
      duration: '2–4 hodiny / Min. 10 osob',
      price: 'Od 20 000 Kč',
      ctaLabel: 'Nezávazně poptat',
      ctaHref: '#kontakt',
    },
    {
      title: 'Fyzika v plamenech – Školní program',
      description:
        'Přineste do školy zážitek, který propojí fyziku, chemii a tradiční řemeslo v jednom odpoledni. Programy jsou navrženy tak, aby děti bavily a zároveň něco naučily o materiálu a lidském dechu.',
      suitableFor: 'MŠ, ZŠ, SŠ',
      duration: '90 minut – 3 hodiny',
      price: 'Od 120 Kč/žák',
      ctaLabel: 'Nezávazně poptat',
      ctaHref: '#kontakt',
    },
  ],
  secondary: [
    {
      title: 'Kreativní dílna',
      description:
        'Malování a zdobení vlastní ozdoby, glitry, zdobicími technikami. Žádné dvě nejsou stejné. Bezpečná alternativa bez ohně - ideální pro nejmenší děti nebo velké skupiny.',
      price: 'Od 100 Kč/osoba',
      ctaLabel: 'Nezávazně poptat',
      ctaHref: '#kontakt',
    },
    {
      title: 'Adventní sklářská dílna',
      description:
        'Kompletní program pro vánoční trhy, nákupní centra a sváteční firemní setkání. Vytvoří pravou vánoční atmosféru s vůní tradice a leskem ručně foukaných ozdob.',
      ctaLabel: 'Nezávazně poptat',
      ctaHref: '#kontakt',
    },
    {
      title: 'Personifikace – Psaní na přání',
      description:
        'Ruční psaní jmen, věnování nebo důležitých dat přímo na hotové ozdoby. Hosté si odnesou suvenýr s vysokou osobní hodnotou, který se stane trvalou rodinnou památkou.',
      ctaLabel: 'Nezávazně poptat',
      ctaHref: '#kontakt',
    },
  ],
}

export const AUDIENCE = {
  eyebrow: 'Pro koho jsme',
  heading: 'Pro ty, kdo chtějí nabídnout lidem něco opravdového.',
  segments: [
    {
      label: 'Školy',
      title: 'Školy a vzdělávací instituce',
      heading: 'Výuka, která se nezapomene',
      description:
        'Přineste do školy zážitek, který propojí fyziku, chemii a tradiční řemeslo. Programy jsou navrženy tak, aby děti bavily a zároveň něco naučily.',
      bullets: [
        'Programy pro MŠ, ZŠ i SŠ',
        'Přijedeme k vám nebo vás přivítáme v dílně',
        'Možnost propojení s výukou fyziky a přírodovědy',
        'Každé dítě si odnese vlastní výrobek',
      ],
      ctaLabel: 'Nezávazně poptat',
      ctaHref: '#kontakt',
    },
    {
      label: 'Města a obce',
      title: 'Města, obce a kulturní akce',
      heading: 'Živá sklářská dílna jako kulturní atrakce',
      description:
        'Hledáte program, který přitáhne pozornost na vašem trhu nebo slavnosti? Mobilní sklářská dílna zastaví každého kolemjdoucího. Není to stánek - je to živé divadlo řemesla.',
      bullets: [
        'Vhodné pro vánoční trhy, slavnosti a festivaly',
        'Samostatná instalace bez velkých nároků na zázemí',
        'Přitahuje rodiny, děti i dospělé',
        'Připomíná tradiční řemeslo a sklářství',
      ],
      ctaLabel: 'Nezávazně poptat',
      ctaHref: '#kontakt',
    },
    {
      label: 'Firmy',
      title: 'Firmy a firemní akce',
      heading: 'Zážitek, který spojuje tým',
      description:
        'Foukání skla vyžaduje soustředění a preciznost - přesně to, na čem stojí dobrá spolupráce v týmu. Navíc si každý účastník odnese vlastnoručně vyrobenou ozdobu.',
      bullets: [
        'Teambuilding pro 10–50 osob',
        'Možnost živé ukázky na firemním večírku',
        'Program přizpůsoben na míru firmě',
        'Každý účastník si odnese vlastní výrobek',
        'Program na 2–4 hodiny',
      ],
      ctaLabel: 'Nezávazně poptat',
      ctaHref: '#kontakt',
    },
  ],
}

export const STATS = {
  items: [
    {
      numericValue: 1200,
      suffix: ' °C',
      label: 'Teplota plamene při foukání skla',
    },
    {
      numericValue: 100,
      suffix: ' %',
      label: 'Ručně vyrobené, každý kus je originál',
    },
    {
      numericValue: 1,
      suffix: ' dech',
      label: 'Každá ozdoba vzniká jediným lidským dechem',
    },
  ],
}

export const GALLERY = {
  eyebrow: 'Galerie',
  heading: 'Živé sklo v akci',
  alts: [
    'Sklář tvaruje roztavené sklo v plameni mezi hromadou skleněných ozdob',
    'Detail ruky sklářky nad plamenem',
    'Sklářka foukající skleněnou ozdobu v plameni',
    'Ruce při tvarování skleněné trubice',
    'Roztavené sklo žhnoucí v plameni hořáku',
  ],
  images: [
    '/images/gallery/excursion-wide.jpg',
    '/images/gallery/hands-flame-01.webp',
    '/images/gallery/blowing-technique-06.webp',
    '/images/gallery/forming-process-02.webp',
    '/images/hero/production-hero.jpg',
  ],
}

export const BENEFITS = {
  eyebrow: 'Proč Živé sklo',
  heading: 'Proč zvolit Živé sklo pro vaši akci',
  items: [
    {
      icon: 'inventory_2',
      title: 'Přijedeme vybaveni',
      description: 'Nic nemusíte zajišťovat. Přivezeme veškeré vybavení a postaráme se o bezpečný provoz.',
    },
    {
      title: 'Bezpečný provoz',
      description: 'V souladu s požadavky pojišťoven a přísnými normami. Bezpečný provoz vhodný pro veřejné akce.',
    },
    {
      title: 'Pro každou akci',
      description: 'Program vhodný pro děti i dospělé, pro malé skupiny i velké akce od 10 do 500 lidí.',
    },
    {
      title: 'Profesionální komunikace',
      description: 'Komunikujeme profesionálně - smlouva, faktura, pojištění.',
    },
  ],
  downloadLabel: 'Stáhnout informační list pro pořadatele',
  downloadHref: '/informacni-list',
}

export const CONTACT = {
  eyebrow: 'Kontakt',
  heading: 'Poptejte svoji akci',
  subtitle: 'Vyplňte krátký formulář a my se vám co nejdříve ozveme s nabídkou na míru.',
  portrait: {
    src: '/images/contact/portrait.png',
    alt: 'Vlastimil Juřička, Živé sklo s.r.o.',
  },
  details: [
    {
      label: 'E-mail',
      value: CONTACT_EMAIL,
      href: CONTACT_EMAIL_HREF,
      nowrap: true,
    },
    {
      label: 'Telefon',
      value: CONTACT_PHONE_DISPLAY,
      href: CONTACT_PHONE_HREF,
      nowrap: true,
    },
    {
      label: 'Sídlo',
      value: SITE_STREET_ADDRESS,
      secondary: `${SITE_POSTAL_CODE} ${SITE_LOCALITY}`,
      href: SITE_MAPS_URL,
      external: true,
    },
    {
      label: 'Obchodní firma',
      value: SITE_LEGAL_NAME,
      secondary: `IČO\u00A0${SITE_ICO}`,
    },
  ],
  fields: {
    name: {
      label: 'Jméno a příjmení',
      placeholder: 'Jan Novák',
      required: true,
    },
    email: {
      label: 'E-mail',
      placeholder: 'email@firma.cz',
      required: true,
      type: 'email',
    },
    phone: {
      label: 'Telefon',
      placeholder: CONTACT_PHONE_DISPLAY,
      required: true,
      type: 'tel',
    },
    eventType: {
      label: 'Typ akce',
      required: true,
      options: [
        { value: '', label: 'Vyberte typ akce' },
        ...CONTACT_EVENT_TYPES.map((value) => ({
          value,
          label: CONTACT_EVENT_TYPE_LABELS[value],
        })),
      ],
    },
    datePlace: {
      label: 'Přibližné datum a místo konání',
      placeholder: 'Např. 15. 5. 2026, Praha',
      required: true,
    },
    participants: {
      label: 'Počet účastníků',
      placeholder: 'Např. 30',
      required: true,
    },
    message: {
      label: 'Zpráva',
      placeholder: 'Napište nám více o vaší akci...',
      required: false,
    },
    gdpr: {
      label: 'Souhlasím se zpracováním osobních údajů pro vyřízení poptávky',
      detailsText: 'Údaje použijeme jen pro vyřízení poptávky a navazující komunikaci k akci.',
      detailsLabel: 'Zásady ochrany osobních údajů',
      detailsHref: '/ochrana-osobnich-udaju',
      required: true,
    },
  },
  submitLabel: 'Odeslat poptávku',
}

export const FAQ = {
  eyebrow: 'Časté dotazy',
  heading: 'Než nám napíšete',
  items: [
    {
      question: 'Pro kolik lidí je program vhodný?',
      answer:
        'Program je vhodný pro děti i dospělé, pro malé skupiny i velké akce od 10 do 500 lidí. Firemní týmový program počítá s minimem 10 osob.',
    },
    {
      question: 'Co musíme zajistit my?',
      answer: 'Nic. Přivezeme veškeré vybavení a postaráme se o bezpečný provoz. Dílna se vejde do jedné dodávky.',
    },
    {
      question: 'Jak dlouho program trvá?',
      answer: 'Firemní program trvá 2–4 hodiny, školní program 90 minut až 3 hodiny. Délku přizpůsobujeme vaší akci.',
    },
    {
      question: 'Je provoz bezpečný?',
      answer:
        'Provoz je v souladu s požadavky pojišťoven a přísnými normami a je vhodný pro veřejné akce. Pro nejmenší děti nebo velké skupiny nabízíme Kreativní dílnu bez ohně.',
    },
    {
      question: 'Odnesou si hosté vlastní ozdobu?',
      answer:
        'U týmového a školního programu si každý účastník odnese vlastnoručně vyrobenou ozdobu. Ozdoby můžeme také osobně popsat jménem či věnováním.',
    },
    {
      question: 'Kolik to stojí a jak objednat?',
      answer:
        'Ceny začínají od 12 000 Kč za Živé divadlo řemesla, od 20 000 Kč za firemní event a od 120 Kč za žáka u školního programu. Pošlete nám termín, místo a přibližný počet hostů a ozveme se s nabídkou na míru.',
    },
  ],
  ctaLabel: 'Nezávazně poptat akci',
  ctaHref: '#kontakt',
}

export const FOOTER = {
  brand: BRAND,
  nav: NAV.links,
  contacts: [
    { label: CONTACT_EMAIL, href: CONTACT_EMAIL_HREF },
    { label: CONTACT_PHONE_DISPLAY, href: CONTACT_PHONE_HREF },
    { label: SITE_ADDRESS_DISPLAY, href: SITE_MAPS_URL, external: true },
  ],
  social: [
    {
      label: 'Instagram',
      value: '@zivesklo',
      href: INSTAGRAM_URL,
    },
    {
      label: 'Facebook',
      value: 'Živé Sklo',
      href: FACEBOOK_URL,
    },
  ],
  legal: {
    note: 'Google Analytics spouštíme až po vašem souhlasu. Volbu můžete kdykoli změnit.',
    privacyHref: '/ochrana-osobnich-udaju',
    privacyLabel: 'Zásady ochrany osobních údajů',
    cookiesHref: '/cookies',
    cookiesLabel: 'Zásady cookies',
    settingsLabel: 'Nastavení cookies',
  },
  copyrightOwner: `${SITE_LEGAL_NAME} (IČO: ${SITE_ICO})`,
  copyrightRights: 'Všechna práva vyhrazena.',
}

export const COOKIE_NOTICE = {
  banner: {
    eyebrow: 'Souhlas s cookies',
    title: 'Můžeme měřit návštěvnost webu?',
    description:
      'Bez souhlasu se uloží jen informace o vaší volbě. Po souhlasu zapneme Google Analytics pro základní měření návštěvnosti a používání webu.',
    acceptLabel: 'Povolit analytiku',
    declineLabel: 'Pokračovat bez analytiky',
    detailsLabel: 'Podrobnosti o cookies',
  },
  page: {
    eyebrow: 'Informace o cookies',
    title: 'Zásady cookies',
    intro:
      'Na webu Živé Sklo používáme nezbytnou cookie pro zapamatování vaší volby a po vašem svolení také Google Analytics pro základní měření návštěvnosti.',
    sections: [
      {
        title: 'Cookie pro zapamatování volby',
        description: 'Tato cookie si pamatuje pouze to, zda jste povolili měření návštěvnosti.',
        items: [
          'ukládá pouze stav vašeho souhlasu',
          'platí nejdéle 180 dní, pak se zeptáme znovu',
          'nepoužívá se k reklamě ani měření návštěvnosti',
        ],
      },
      {
        title: 'Google Analytics',
        description:
          'Po vašem souhlasu načteme službu Google Analytics 4, která nám pomáhá vyhodnocovat návštěvnost a používání jednotlivých částí webu.',
        items: [
          'nástroj se nespustí, dokud ho sami nepovolíte',
          'v aktuálním nastavení nepoužíváme reklamní personalizaci ani propojení pro Google Ads',
          'svůj souhlas můžete kdykoli změnit přes odkaz Nastavení cookies ve footeru',
        ],
      },
      {
        title: 'Jak volbu změnit',
        description: 'Souhlas můžete změnit kdykoli později, nejen při první návštěvě webu.',
        items: [
          've footeru klikněte na odkaz Nastavení cookies',
          'pro úplné odstranění dříve uložených cookies můžete použít i nastavení prohlížeče',
          'pokud si nejste jistí, ponechte pouze nezbytné uložení volby',
        ],
      },
    ],
    contactNote:
      'Pokud potřebujete doplňující informace k používání cookies nebo analytiky, napište nám na kontaktní e-mail.',
  },
}

export const PRIVACY_NOTICE = {
  page: {
    eyebrow: 'Ochrana osobních údajů',
    title: 'Zásady ochrany osobních údajů',
    intro:
      'Když nám pošlete poptávku přes formulář na webu Živé Sklo, používáme vaše údaje pouze pro vyřízení poptávky, přípravu nabídky a navazující komunikaci k dané akci.',
    sections: [
      {
        title: 'Kdo údaje zpracovává',
        description: `Správcem osobních údajů je ${SITE_LEGAL_NAME}, se sídlem ${SITE_ADDRESS_DISPLAY}, IČO: ${SITE_ICO}.`,
        items: [
          `IČO: ${SITE_ICO}`,
          `sídlo: ${SITE_ADDRESS_DISPLAY}`,
          `kontaktní e-mail: ${CONTACT_EMAIL}`,
          `telefon: ${CONTACT_PHONE_DISPLAY}`,
          'v případě dotazů ke zpracování údajů nás můžete kontaktovat přímo těmito kanály',
        ],
      },
      {
        title: 'Jaké údaje zpracováváme',
        description: 'Z formuláře zpracováváme pouze údaje, které sami vyplníte.',
        items: ['jméno a příjmení', 'e-mail a telefon', 'typ akce, datum, místo, počet účastníků a případnou zprávu'],
      },
      {
        title: 'Proč údaje potřebujeme',
        description: 'Údaje používáme jen pro komunikaci o vaší poptávce a pro přípravu konkrétní nabídky.',
        items: [
          'abychom vám mohli odpovědět na poptávku',
          'abychom mohli navrhnout vhodný program a cenovou nabídku',
          'nepoužíváme je pro reklamní rozesílky ani profilování',
        ],
      },
      {
        title: 'Jak dlouho a komu údaje předáváme',
        description:
          'Údaje uchováváme jen po nezbytnou dobu a sdílíme je pouze s technickými dodavateli nutnými pro obsluhu poptávky.',
        items: [
          'pokud se spolupráce neuskuteční, údaje držíme jen po dobu potřebnou k uzavření a vyhodnocení poptávky a navazující komunikaci',
          'pokud naváže smluvní vztah, mohou být údaje zpracovány i déle podle smluvních a účetních povinností',
          'pro doručení e-mailu využíváme službu Brevo a související hostingové a technické poskytovatele',
        ],
      },
      {
        title: 'Vaše práva',
        description:
          'Můžete nás kdykoli požádat o informace ke zpracování nebo o úpravu či odstranění údajů, pokud to dovolují právní povinnosti.',
        items: [
          'máte právo na přístup, opravu, omezení zpracování a odstranění',
          'svůj souhlas můžete kdykoli odvolat',
          'máte právo podat stížnost u Úřadu pro ochranu osobních údajů',
        ],
      },
    ],
    contactNote:
      'Pokud chcete uplatnit některé ze svých práv nebo máte dotaz ke zpracování osobních údajů, napište nám na kontaktní e-mail.',
  },
}
