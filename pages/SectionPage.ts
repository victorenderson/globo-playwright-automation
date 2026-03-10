import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SectionPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectDomain(domain: 'g1' | 'ge' | 'gshow'): Promise<void> {
    const expected = new RegExp(`${domain}\\.globo\\.com|globo\\.com`);
    await expect(this.page).toHaveURL(expected);
  }

  async expectAnyHeadlineVisible(): Promise<void> {
    const headline = this.page.locator('h1, h2, h3').filter({ hasText: /.+/ }).first();
    await expect(headline).toBeVisible();
  }
}
