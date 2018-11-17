import { MeanLocalizationappAngular2Page } from './app.po';

describe('mean-localizationapp-angular2 App', () => {
  let page: MeanLocalizationappAngular2Page;

  beforeEach(() => {
    page = new MeanLocalizationappAngular2Page();
  });

  it('language in url will navigate to that language', () => {
    var languages = ['English', 'French', 'German', 'Italian', 'Spanish'];
    for (var i = 0; i < languages.length; i++) {
      page.navigateTo('#' + languages[i]);
      expect<any>(page.getActiveLanguage()).toEqual(languages[i]);
    }
  });

  it('ability to create new localization', () => {
    expect<any>(page.getLocalization('date').isPresent()).toBeFalsy();
    var date = new Date().toString();
    page.navigateTo('');
    page.getNewButton().click();
    page.getStringInput().sendKeys(date);
    page.getCreateButton().click();
    this.browser.refresh();
    expect<any>(page.getLocalization(date).isPresent()).toBeTruthy();
  });

  it('client-side validation before string entry', () => {
    page.navigateTo('');
    page.getNewButton().click();
    expect<any>(page.getCreateButton().isEnabled()).toBeFalsy();
  });

  it('client-side validation after string deletion', () => {
    var date = new Date().toString();
    page.navigateTo('');
    page.getNewButton().click();
    page.getStringInput().sendKeys(date);
    page.getCreateButton().click();
    page.getLocalization('date').click();
    page.getStringInput().clear();
    expect<any>(page.getCreateButton().isEnabled()).toBeFalsy();
  });

  it('ability to delete entry', () => {
    var date = new Date().toString();
    page.navigateTo('');
    page.getNewButton().click();
    page.getStringInput().sendKeys(date);
    page.getCreateButton().click();
    page.getLocalization('date').click();
    page.getDeleteButton().click();
    expect<any>(page.getLocalization(date).isPresent()).toBeFalsy();
  });

  it('ability to update entry', () => {
    var date = new Date().toString();
    page.navigateTo('');
    page.getNewButton().click();
    page.getStringInput().sendKeys(date);
    page.getCreateButton().click();
    page.getLocalization('date').click();
    page.getStringInput().sendKeys('test');
    page.getUpdateButton().click();
    expect<any>(page.getLocalization(date + 'test').isPresent()).toBeTruthy();
  });

  it('ability to duplicate new entry', () => {
    var date = new Date().toString();
    page.navigateTo('');
    page.getNewButton().click();
    page.getStringInput().sendKeys(date);
    page.getDuplicateButton().click();
    page.getLanguageButton('Spanish').click();
    expect<any>(page.getLocalization(date).isPresent()).toBeTruthy();
  });
});
