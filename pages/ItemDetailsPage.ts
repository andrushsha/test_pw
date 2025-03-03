import { Page, Locator } from "@playwright/test";

export class ItemDetailsPage {
  private page: Page;
  private download: Locator;

  constructor(page: Page) {
    this.page = page;
    this.download = page.getByRole('button', { name: 'Download Free' });
  }

  async clickDownload() {
    await this.download.click();
  }

  async awaitDownload() {
    let downloadPromise = this.page.waitForEvent('download');
    let download = await downloadPromise;
    let fileName = '/tmp/downloads/' + download.suggestedFilename()
    await download.saveAs(fileName);
  }

}
