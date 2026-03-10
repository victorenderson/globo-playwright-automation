import { test } from '@playwright/test';
import { GloboHomePage } from '../pages/GloboHomePage';
import { SectionPage } from '../pages/SectionPage';

const sections: Array<'g1' | 'ge' | 'gshow'> = ['g1', 'ge', 'gshow'];

for (const section of sections) {
  test(`navigates to ${section} successfully`, async ({ page }) => {
    const home = new GloboHomePage(page);
    const sectionPage = new SectionPage(page);

    await home.goto();
    await home.openSection(section);
    await sectionPage.expectDomain(section);
    await sectionPage.expectAnyHeadlineVisible();
  });
}
