import { chromium } from '@playwright/test';
import { extractHeadlineRecords } from './headlines';
import { exportToCsv, exportToExcel } from './exporters';

async function run(): Promise<void> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.globo.com/', { waitUntil: 'domcontentloaded' });

    const dismiss = page.getByRole('button', { name: /agora não/i });
    if (await dismiss.isVisible().catch(() => false)) {
      await dismiss.click();
    }

    const records = await extractHeadlineRecords(page, 30);
    const csvPath = exportToCsv(records, 'globo-headlines.csv');
    const excelPath = exportToExcel(records, 'globo-headlines.xlsx');

    console.log(`Scraped ${records.length} headlines.`);
    console.log(`CSV: ${csvPath}`);
    console.log(`Excel: ${excelPath}`);
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error('Failed to scrape headlines:', error);
  process.exit(1);
});
