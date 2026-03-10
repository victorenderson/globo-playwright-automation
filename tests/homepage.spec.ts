import { test } from '@playwright/test';
import { GloboHomePage } from '../pages/GloboHomePage';

test.describe('Globo homepage', () => {
  test('loads and shows the main navigation', async ({ page }) => {
    const home = new GloboHomePage(page);

    await home.goto();
    await home.verifyLoaded();
  });

  test('shows top content entry points', async ({ page }) => {
    const home = new GloboHomePage(page);

    await home.goto();
    await home.verifyLoaded();

    await home.destaquesLink.waitFor({ state: 'visible' });
    await home.videosLink.waitFor({ state: 'visible' });
    await home.moreNewsLink.waitFor({ state: 'visible' });
  });
});
