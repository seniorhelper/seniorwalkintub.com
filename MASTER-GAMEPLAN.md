# seniorwalkintub.com · MASTER GAMEPLAN
Last updated 2026-11-08 (overnight aging-network push). Network plan: Desktop\02 AGING SAFELY BATHS\07 Aging Safely Website Network\MASTER GAMEPLAN.md. Rules: C:\Users\zachw\aging-sweep\notes\RULES.md.

## Lane
Does a walk-in tub fit this body: fit check tool, hip/knee, arthritis, diabetes, living alone.

Every page here supports agingsafelybaths.com (quotes, installs) and never targets its head terms (walk in tubs, walk in tub cost, handicap showers, roll in showers, Medicaid/grants head terms). Max 2 followed network links per page; other network links nofollow; one nofollow Eye To Ad credit.

## Business facts
Aging Safely Baths & More, LLC. 1-888-779-2284, sales@agingsafelybaths.com. BBB A+ since 2012. Published prices only (RULES.md): walk-in tub about $15,500 installed after the $2,000 promo, $15,250 veterans, roll-in showers $13,500 to $17,000, wide/transfer/bariatric from about $19,000.

## Targets (one page owns one term)
- walk in tub for seniors (body fit angle)
- walk in tub fit check
- walk in tub after hip replacement

## Competitors (live check 2026-11-08; search results, not verified rank)
- theseniorlist.com, bestcompany.com: brand rankings, nothing on fit
- getsafe.com: notes a filled tub can top 1,000 lb (floor-load angle)
- aquaticausa.com: product focus

**How we beat them:** The fit tool plus clinician-sourced condition guides.

## Done tonight (2026-11-08)
- Quote forms now post to the company lead server (clients.eyetoad.com/lead/send.php, saves to disk first, then emails sales) through /lead-send.js, with the old sender (FormSubmit or EmailJS) as automatic fallback. Pilot verified in a live browser on walkintubsflorida.com.
- GA4 tag (property per site, events generate_lead, phone_click, estimator_use) confirmed on every indexable page; Search Console verification file googleadb17462a109b3ca.html present.
- Lighthouse (home page, live, 2026-11-08 early morning) recorded before and after in _overnight-reports/aging-sites-report.md.
- Home page speed: hotlinked hero and diagrams replaced with local WebP, correct dimensions, hero preload, fonts display=optional (mobile 78 to 97 Lighthouse).
- AA contrast for kickers, stars and in-text links; Google rating corrected to the verified 4.9 (35 reviews).
- New /privacy/ page with footer link.

## Next
1. Walk-in tub after stroke (ASA bathroom setup PDF)
1. Parkinson's and the fill/drain wait (Parkinson's Foundation)
1. Is my floor strong enough (manufacturer filled weights + IRC floor loads)
1. Speed: home page LCP 5.0 s mobile and CLS 0.18 desktop in tonight's Lighthouse; fix hero image sizing and the dealer widget load

## Morning to-dos (network)
- Add the six EmailJS satellites (seniorwalkintub, utahwalkintubs, walkintubdenver, walkintubscalifornia, walkintubschicago, walkintubstexas) to lead-config.php on clients.eyetoad.com so they stop falling back to EmailJS.
- Confirm where aging-site leads from the lead server are emailed (sales@agingsafelybaths.com?) and that the mail lands; fix eyetoad.com SPF/DMARC.
- Request indexing in Search Console for every new or changed URL listed in the report.
- AdSense: not added to these lead-gen pages on purpose (ads next to a quote form cost leads). Decide if any info-only page should carry it.

## Measurement
GA4 property per site (account 45765285), key events generate_lead and phone_click. Search Console: bare domain property, sitemap.xml submitted. Check queries and positions in GA4's Search Console report at the start of every project.
