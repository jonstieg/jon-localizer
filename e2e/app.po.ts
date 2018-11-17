import { browser, element, by } from 'protractor';

export class MeanLocalizationappAngular2Page {
  navigateTo(url) {
    return browser.get('/' + url);
  }

  getTestPage() {
    return element(by.css('container'));
  }

  getLanguageButton(language) {
    return element(by.id(language));
  }

  getActiveLanguage() {
    return element(by.css('list-group-item active')).getText();
  }

  getNewButton() {
    return element(by.id('new-localization-button'));
  }

  getStringInput() {
    return element(by.id('localization-string'));
  }

  getCreateButton() {
    return element(by.id('create-button'));
  }

  getDuplicateButton() {
    return element(by.id('duplicate-button'));
  }

  getUpdateButton() {
    return element(by.id('update-button'));
  }

  getDeleteButton() {
    return element(by.id('delete-button'));
  }

  getLocalization(string) {
    return element(by.cssContainingText('list-group-item', string));
  }
}
