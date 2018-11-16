import { Component, OnInit } from '@angular/core';
import { Localization } from '../localization';
import { LocalizationService } from '../localization.service';
import { LocalizerDetailsComponent } from '../localizer-details/localizer-details.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'localizer-list',
  templateUrl: './localizer-list.component.html',
  styleUrls: ['./localizer-list.component.css'],
  providers: [LocalizationService]
})

export class LocalizerListComponent implements OnInit {

  languages: string[]
  selectedLanguage: string
  localizations: Localization[]
  selectedLocalization: Localization

  constructor(private localizationService: LocalizationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.languages = ['English', 'French', 'German', 'Italian', 'Spanish',];
    this.route.fragment.subscribe(
      (fragments) => {
        if (this.languages.indexOf(fragments) != -1) {
          this.selectedLanguage = fragments;
          this.selectLanguage(fragments);
        } else {
          this.selectedLanguage = 'English';
          this.selectLanguage('English');
        }
      }
    );
    this.localizationService
      .getLocalizations()
      .then((localizations: Localization[]) => {
        this.localizations = localizations.filter(localization => localization.language === this.selectedLanguage);
      });
  }

  private getIndexOfLocalization = (localizationId: String) => {
    return this.localizations.findIndex((localization) => {
      return localization._id === localizationId;
    });
  }

  selectLanguage(language: string) {
    // this.router.navigate(['/#' + this.selectedLanguage]);
    this.selectedLanguage = language;
    this.localizationService
      .getLocalizations()
      .then((localizations: Localization[]) => {
        this.localizations = localizations.filter(localization => localization.language === this.selectedLanguage);
      });
  }

  selectLocalization(localization: Localization) {
    if (this.selectedLocalization === localization) {
      this.selectedLocalization = null;
    } else {
      this.selectedLocalization = localization
    }
  }

  createNewLocalization() {
    var localization: Localization = {
      string: '',
      localization: '',
      comment: '',
      language: this.selectedLanguage
    };

    // By default, a newly-created localization will have the selected state.
    this.selectLocalization(localization);
  }

  deleteLocalization = (localizationId: String) => {
    var idx = this.getIndexOfLocalization(localizationId);
    if (idx !== -1) {
      this.localizations.splice(idx, 1);
      this.selectLocalization(null);
    }
    return this.localizations;
  }

  addLocalization = (localization: Localization) => {
    localization.language = this.selectedLanguage;
    this.localizations.push(localization);
    this.selectLocalization(null);
    return this.localizations;
  }

  duplicateLocalization = (localization: Localization) => {
    localization.language = this.selectedLanguage;
    this.localizations.push(localization);
    this.selectLocalization(null);
    return this.localizations;
  }

  updateLocalization = (localization: Localization) => {
    var idx = this.getIndexOfLocalization(localization._id);
    if (idx !== -1) {
      this.localizations[idx] = localization;
    }
    this.selectLocalization(null);
    return this.localizations;
  }

  downloadLocalizations = () => {
    var textForFile = '';
    this.localizations.forEach(function (localization) {
      if (localization.comment) {
        textForFile += '/* ' + localization.comment + ' */\n';
      }
      textForFile += '\"' + localization.string + '\" = \"' + localization.localization + '\";\n\n';
    });
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([textForFile], { type: 'text/plain' }));
    a.download = 'Localizations-' + this.selectedLanguage + '.txt';

    // Append anchor to body.
    document.body.appendChild(a);
    a.click();

    // Remove anchor from body
    document.body.removeChild(a);
  }

  downloadFile(data: any) {
    var blob = new Blob([data], { type: 'text/plain' });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  // onKeyUp($event): void {
  //   // Detect platform
  //   if(navigator.platform.match('Mac')){
  //       this.handleMacKeyEvents($event);
  //   }
  //   else {
  //       this.handleWindowsKeyEvents($event); 
  //   }
  // }

  // handleMacKeyEvents($event) {
  //   // MetaKey documentation
  //   // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey
  //   let charCode = String.fromCharCode($event.which).toLowerCase();
  //   if ($event.metaKey && charCode === 'S') {
  //       // Action on Cmd + S
  //       $event.preventDefault();
  //       alert('hello');
  //   } 
  // }

  // handleWindowsKeyEvents($event) {
  //   let charCode = String.fromCharCode($event.which).toLowerCase();
  //   if ($event.ctrlKey && charCode === 's') {
  //       // Action on Ctrl + S
  //       $event.preventDefault();
  //   } 
  // }
}