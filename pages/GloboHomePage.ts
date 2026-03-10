import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class GloboHomePage extends BasePage {
  readonly dismissNotificationsButton: Locator;
  readonly homeHeroLink: Locator;
  readonly destaquesLink: Locator;
  readonly videosLink: Locator;
  readonly g1Link: Locator;
  readonly geLink: Locator;
  readonly gshowLink: Locator;
  readonly moreNewsLink: Locator;
  readonly topStoryCards: Locator;

  constructor(page: Page) {
    super(page);
    this.dismissNotificationsButton = page.getByRole('button', { name: /agora não/i });
    this.homeHeroLink = page.getByRole('link', {
      name: /globo\.com, aqui você encontra notícias da sua região/i
    });
    this.destaquesLink = page.getByRole('link', { name: /destaques/i }).first();
    this.videosLink = page.getByRole('link', { name: /vídeos/i }).first();
    this.g1Link = page.getByRole('link', { name: /^g1$/i }).first();
    this.geLink = page.getByRole('link', { name: /^ge$/i }).first();
    this.gshowLink = page.getByRole('link', { name: /^gshow$/i }).first();
    this.moreNewsLink = page.getByRole('link', { name: /veja mais notícias/i }).first();
    this.topStoryCards = page.locator('a[href*="globo.com"], a[href*="g1.globo.com"], a[href*="ge.globo.com"], a[href*="gshow.globo.com"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.dismissNotificationPromptIfPresent();
  }

  async dismissNotificationPromptIfPresent(): Promise<void> {
    await this.clickIfVisible(this.dismissNotificationsButton);
  }

  async verifyLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/globo\.com/);
    await expect(this.homeHeroLink).toBeVisible();
    await expect(this.g1Link).toBeVisible();
    await expect(this.geLink).toBeVisible();
    await expect(this.gshowLink).toBeVisible();
  }

  async openSection(section: 'g1' | 'ge' | 'gshow'): Promise<void> {
    const linkMap = {
      g1: this.g1Link,
      ge: this.geLink,
      gshow: this.gshowLink
    };

    await linkMap[section].click();
  }

  async collectHeadlineCards(limit = 15): Promise<Array<{ title: string; href: string }>> {
    const results: Array<{ title: string; href: string }> = [];
    const count = await this.topStoryCards.count();

    for (let i = 0; i < count && results.length < limit; i += 1) {
      const card = this.topStoryCards.nth(i);
      const title = (await card.textContent())?.replace(/\s+/g, ' ').trim() ?? '';
      const href = await card.getAttribute('href');

      if (!title || !href) continue;
      if (title.length < 12) continue;

      results.push({ title, href });
    }

    return results;
  }
}
