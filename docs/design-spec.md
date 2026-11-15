# Design spec: Atelier (redesign/2026-11, demo only)

## Concept
A craft atelier presented with the restraint of an agency site for corporate and event buyers. Real photography carries the page; type, rules and whitespace do the rest. Sections alternate between ink (warm near-black) and ivory so the page has rhythm without decoration. One ember accent, used for the primary action, the hero emphasis word and small markers only.

## Audit of real assets
Strong: `production-01` (4608 px original, glowing glass in blue flame; hero), `excursion-school-01` (6720 px, flame, hands and glass stock; gallery lead), `glass-detail-01` (2:3, abstract glass stock; About), portrait cut-out (works on ink), the event reel (real events, children, tents: proof of context).
Weak: `forming-process-02`, `hands-flame-01`, `03_tvarovani` (soft focus, small tiles only), `blowing-technique-06` (640 px, tile only), old video poster (vertical reel letterboxed with blurred bars; replaced by a centre crop at 9:16), `01_hero_plamen` (out of focus; unused). Hi-res derivatives were generated from `reference/gallery-originals` (`production-hero.jpg`, `excursion-wide.jpg`, `glass-detail-tall.jpg`). Alt text of the "school excursion" image was wrong (no children visible) and was corrected.

## References studied (patterns, not copy)
KraftStories custom events: one repeated primary inquiry CTA, four numbered steps, FAQ accordion, big numerals as proof, quote-based pricing. Blenko corporate events: full-width event photo hero with one-line value statement, FAQ and gallery before the inquiry form. Zimmerman Art Glass (Designerly write-up): let the glass imagery carry a simple site. Takeaways: one CTA language everywhere, how-it-works and FAQ close to the form, proof from real events, no stock imagery.

## Type
Display: Newsreader (variable, optical size), regular weight, tight tracking, italic for one emphasis phrase. Text: Instrument Sans. Fluid scale `--text-step--1 … --text-step-display` in `app/globals.css` (360 to 1440 px). Eyebrows and buttons are small uppercase sans with tracking; body 17 px, line-height 1.65, measure 56 to 62 ch.

## Colour
Ink `#14110E` surface, text `#F2ECE2` (16:1), secondary `#CFC5B6` (11:1), tertiary `#A99E8E` (7:1), ember `#FF8D52` (8.2:1 on ink).
Ivory `#F4EFE6` and paper `#EBE4D6` surfaces, text `#1B1713` (15.6:1), secondary `#554C41` (7.4:1), tertiary `#6A5F52` (4.9 to 5.4:1), ember `#A8360A` with white text (6.6:1).
Same token names on both: `.surface-light` / `.surface-paper` re-map them, so components are surface-agnostic. Form fields use a 3:1 border (`#8C8274`).

## Grid and rhythm
One container (`.wrap`, max 1320 px, fluid gutter), one 12-column grid (`.grid-12`, 12 columns from 768 px). Text blocks take 5 to 7 columns, image 4 to 5. Section padding `--section-y` (72 to 144 px) everywhere. Section order and tone: hero ink, About ivory, Video + figures ink, Process ivory, Offer paper, Audience ink, Gallery ivory, Benefits ink, FAQ ivory, Contact ink, footer deep ink.

## Imagery
Photos are full-bleed or on the grid, never in frames with shadows or radius. Hero photo with a directional ink gradient only where text sits. Square corners everywhere; pills only for round controls. No icons font (Material Symbols removed); inline SVG for the few glyphs.

## Motion
Only a small `.reveal` fade/translate (scroll-driven, `@supports` and `prefers-reduced-motion: no-preference`), a gallery zoom on hover with a fine pointer, colour/gap transitions on links. The h1 never animates. Video starts only after a click.

## Conversion path
Hero CTA (Nezávazně poptat akci) then proof (Vsetín, 20+ let, jedna dodávka, 1 200 °C, 100 %, 1 dech; all from existing copy), real event reel, 4-step process, priced programmes, audience segments, gallery, trust points and the organiser sheet, FAQ (answers only restate existing copy), contact with the founder portrait and the form on an ivory card. Every section ends in the same inquiry target `#kontakt`.
