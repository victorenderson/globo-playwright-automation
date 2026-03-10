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

# Globo Playwright Automation Suite

Automation test framework built with **Playwright + TypeScript** to validate core UI and content behaviors on the Globo.com news portal.

This project demonstrates real-world **QA automation architecture**, including page objects, UI validation, headline scraping logic, and content structure verification against a live production website.

---

## Project Goals

The goal of this project is to practice and demonstrate:

- UI automation with Playwright
- Page Object Model architecture
- dynamic content validation
- selector strategy and locator stability
- automation debugging and failure investigation
- test framework structure suitable for CI environments

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Git / GitHub
- Page Object Model (POM)

---

## Project Structure
globo-playwright-automation
│
├── pages
│ ├── BasePage.ts
│ ├── GloboHomePage.ts
│
├── tests
│ ├── homepage.spec.ts
│ ├── headlines.spec.ts
│
├── utils
│ ├── headlineParser.ts
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md


---

## Test Coverage

### Homepage Validation

Validates that the Globo homepage loads and essential navigation elements are present.

Checks include:

- homepage URL validation
- navigation links visibility
- main hero content presence
- top editorial entry points

---

### Headline Card Validation

Tests verify that news headline cards follow expected structure:

- headline cards are collected from the DOM
- cards contain valid title text
- cards contain valid links
- editorial sections contain at least one headline

---

### Headline Search Validation

Searches for keywords inside headline payloads to verify content presence.

---

## Example Test Scenarios

**Homepage Tests**
- Homepage loads successfully
- Main navigation is visible
- Editorial entry points exist

**Headline Validation**
- Collect headline cards from page
- Validate card structure
- Ensure at least one headline per editorial section

---

## Running the Tests

Install dependencies:

npm install


Run tests:

npx playwright test


View test report:

npx playwright show-report


---

## Example Artifacts

Playwright automatically generates:

- screenshots on failure
- test videos
- HTML reports

Artifacts are stored in:

test-results/
playwright-report/


---

## Known Challenges

This project runs tests against a **live production website**, which means:

- selectors may change over time
- editorial content changes dynamically
- some headline tests may fail if page structure changes

These failures are useful for demonstrating how automation engineers investigate unstable UI selectors.

---

## Future Improvements

Planned enhancements:

- stronger locator strategy
- improved resilience for dynamic editorial content
- automated headline export to CSV
- GitHub Actions CI pipeline
- retry strategy for flaky tests

---

## Learning Outcomes

This project demonstrates practical experience with:

- Playwright automation
- UI test architecture
- debugging failing tests
- working with dynamic web content
- maintaining automation frameworks

---

## Author

Victor Enderson Nunes

QA Engineer / Automation Enthusiast
