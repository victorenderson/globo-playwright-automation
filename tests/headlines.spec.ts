import { expect, test } from '@playwright/test';
import { GloboHomePage } from '../pages/GloboHomePage';
import { extractHeadlineRecords } from '../utils/headlines';


test.describe('Headline search and card validation', () => {
  test('collects headline cards and validates their structure', async ({ page }) => {
    const home = new GloboHomePage(page);

    await home.goto();
    const records = await extractHeadlineRecords(page, 20);

    expect(records.length).toBeGreaterThan(5);

    for (const record of records.slice(0, 10)) {
      expect(record.title.length).toBeGreaterThan(12);
      expect(record.href).toMatch(/https?:\/\/|\//);
    }
  });

  test('finds at least one headline for each major editorial bucket', async ({ page }) => {
    const home = new GloboHomePage(page);

    await home.goto();
    const records = await extractHeadlineRecords(page, 30);

    expect(records.some((r) => r.sourceBucket === 'g1')).toBeTruthy();
    expect(records.some((r) => r.sourceBucket === 'ge')).toBeTruthy();
    expect(records.some((r) => r.sourceBucket === 'gshow')).toBeTruthy();
  });

  test('searches headlines by keyword from the current page payload', async ({ page }) => {
    const home = new GloboHomePage(page);

    await home.goto();
    const records = await extractHeadlineRecords(page, 30);

    const likelyNewsKeywords = ['ao vivo', 'veja', 'champions', 'bbb', 'lula', 'saiba'];
    const match = records.find((record) =>
      likelyNewsKeywords.some((keyword) => record.title.toLowerCase().includes(keyword))
    );

    expect(match, 'Expected at least one headline to match a common editorial keyword').toBeDefined();
  });
});
