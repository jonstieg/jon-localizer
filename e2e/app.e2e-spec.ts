import { MeanLocalizationappAngular2Page } from './app.po';

describe('mean-localizationapp-angular2 App', () => {
  let page: MeanLocalizationappAngular2Page;

  beforeEach(() => {
    page = new MeanLocalizationappAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
