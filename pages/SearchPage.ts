import { Page, Locator } from "@playwright/test";

export enum ContentTypesFilters {
  All = "All",
  Wallpapers = "Wallpapers",
  Ringtones = "Ringtones",
}

export class SearchPage {
  private page: Page;
  private searchInput: Locator;
  private searchButton: Locator;
  private expandFilterButton: Locator;
  private filterItem: Locator;
  private cardLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox').first();
    this.searchButton = page.getByRole('navigation').getByRole('button', { name: 'Search' });
    this.expandFilterButton = page.getByRole('navigation');
    this.filterItem = page.getByLabel('All')
    this.cardLocator = page.locator('.Card_card__DE_00');
  }

  async fillSearch(text: string) {
    await this.searchInput.fill(text)
  }

  async gotoFirstNonPremiumItem() {
    await this.cardLocator.filter( {hasNot: this.page.locator('.flex')}).first().click();
  }

  async pressSearch() {
    await this.searchButton.click();
  }

  async setContentTypeFilter(type: ContentTypesFilters) {
    await this.expandFilterButton.getByRole('button', { name: 'All' }).click();
    await this.filterItem.getByText(type as string).click();
  }
  
}
