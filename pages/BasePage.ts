import type { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected async clickIfVisible(locator: Locator): Promise<void> {
    if (await locator.isVisible().catch(() => false)) {
      await locator.click();
    }
  }
}
