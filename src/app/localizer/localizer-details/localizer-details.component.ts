import { Component, Input } from '@angular/core';
import { Localization } from '../localization';
import { LocalizationService } from '../localization.service';

@Component({
  selector: 'localizer-details',
  templateUrl: './localizer-details.component.html',
  styleUrls: ['./localizer-details.component.css']
})

export class LocalizerDetailsComponent {
  @Input()
  localization: Localization;

  @Input()
  createHandler: Function;
  @Input()
  duplicateHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private localizationService: LocalizationService) {}

  createLocalization(localization: Localization) {
    this.localizationService.createLocalization(localization).then((newLocalization: Localization) => {
      this.createHandler(newLocalization);
    });
  }

  duplicateLocalization(localization: Localization) {
    this.localizationService.duplicateLocalization(localization).then((newLocalization: Localization) => {
      this.duplicateHandler(newLocalization);
    });
  }

  updateLocalization(localization: Localization): void {
    this.localizationService.updateLocalization(localization).then((updatedLocalization: Localization) => {
      this.updateHandler(updatedLocalization);
    });
  }

  deleteLocalization(localizationId: String): void {
    this.localizationService.deleteLocalization(localizationId).then((deletedLocalizationId: String) => {
      this.deleteHandler(deletedLocalizationId);
    });
  }
}