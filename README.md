# Globo Playwright Suite

This project includes four deliverables for `https://www.globo.com/`:

1. A full Playwright test suite
2. A Page Object Model (POM) framework
3. Headline search and card validation automation
4. A scraper that exports top headlines to CSV and Excel

## Project structure

```text
pages/
  BasePage.ts
  GloboHomePage.ts
  SectionPage.ts
tests/
  homepage.spec.ts
  navigation.spec.ts
  headlines.spec.ts
utils/
  headlines.ts
  exporters.ts
  scrape-headlines.ts
playwright.config.ts
package.json
tsconfig.json
```

## Install

```bash
npm install
npx playwright install
```

## Run the full suite

```bash
npm test
```

## Run one spec

```bash
npx playwright test tests/headlines.spec.ts
```

## Run the scraper

```bash
npm run scrape:ts
```

This generates:

- `output/globo-headlines.csv`
- `output/globo-headlines.xlsx`

## What the suite validates

- Homepage load
- Main navigation visibility
- Navigation to `g1`, `ge`, and `gshow`
- Headline/card extraction
- Headline structure validation
- Editorial bucket coverage validation
- Keyword-based headline search from live page content

## Notes

News homepages change often. To keep the suite stable, this framework avoids brittle selectors tied to a single headline and instead uses:

- ARIA roles
- top-level navigation labels
- broad headline extraction rules
- URL/domain assertions

If Globo changes the DOM significantly, update the locators in `GloboHomePage.ts` and `utils/headlines.ts`.
