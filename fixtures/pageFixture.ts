import { test as base } from "@playwright/test";
import assert from 'assert';

const BASE_URL = process.env.BASE_URL;

export const test = base.extend<{ pageWithState: any }>({
  pageWithState: async ({ browser }, use) => {
      try {
        new URL(BASE_URL as string);
      } catch (err) {
        assert.fail(`cannot read url, BASE_URL='${BASE_URL}'. Check BASE_URL in .env`);
      }
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(BASE_URL + '/wallpapers');
    const cookieConsent = page.getByRole('button', { name: 'AGREE' }).first();
    if (await cookieConsent.isEnabled({ timeout: 5000 })) {
      await cookieConsent.click();
    }
    await use(page);

    await context.close();
  },
});

export { expect } from "@playwright/test";