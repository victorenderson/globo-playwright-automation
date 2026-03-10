import type { Page } from '@playwright/test';

export type HeadlineRecord = {
  title: string;
  href: string;
  sourceBucket: string;
  isGloboDomain: boolean;
};

export async function extractHeadlineRecords(page: Page, limit = 20): Promise<HeadlineRecord[]> {
  const anchors = page.locator('a[href]');
  const count = await anchors.count();
  const results: HeadlineRecord[] = [];

  for (let i = 0; i < count && results.length < limit; i += 1) {
    const anchor = anchors.nth(i);
    const href = await anchor.getAttribute('href');
    const title = (await anchor.textContent())?.replace(/\s+/g, ' ').trim() ?? '';

    if (!href || !title || title.length < 12) continue;

    const lowerHref = href.toLowerCase();
    const sourceBucket =
      lowerHref.includes('g1.globo.com') ? 'g1' :
      lowerHref.includes('ge.globo.com') ? 'ge' :
      lowerHref.includes('gshow.globo.com') ? 'gshow' :
      lowerHref.includes('globo.com') ? 'globo' : 'external';

    const duplicate = results.some((item) => item.title === title && item.href === href);
    if (duplicate) continue;

    results.push({
      title,
      href,
      sourceBucket,
      isGloboDomain: /(^https?:\/\/)?([\w-]+\.)?globo\.com/i.test(href)
    });
  }

  return results;
}
