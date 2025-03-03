import { test, expect } from "../fixtures/pageFixture";
import { SearchPage, ContentTypesFilters } from '../pages/SearchPage';
import { ItemDetailsPage } from "../pages/ItemDetailsPage";

const BASE_URL = process.env.BASE_URL;
let searchPage: SearchPage;
let itemDetalilsPage: ItemDetailsPage;

test.beforeEach(async ({ pageWithState }) => {
  searchPage = new SearchPage(pageWithState);
  itemDetalilsPage = new ItemDetailsPage(pageWithState);
});

test("search wallpaper", async () => {
  await searchPage.setContentTypeFilter(ContentTypesFilters.Wallpapers);
  await searchPage.fillSearch("car");
  await searchPage.pressSearch();
  await searchPage.gotoFirstNonPremiumItem();
  await itemDetalilsPage.clickDownload();
  await itemDetalilsPage.awaitDownload();
});
