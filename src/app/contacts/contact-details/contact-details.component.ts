import { Component, Input } from '@angular/core';
import { Localization } from '../localization';
import { ContactService } from '../contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})

export class ContactDetailsComponent {
  @Input()
  contact: Localization;

  @Input()
  createHandler: Function;
  @Input()
  duplicateHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private contactService: ContactService) {}

  createContact(contact: Localization) {
    this.contactService.createContact(contact).then((newContact: Localization) => {
      this.createHandler(newContact);
    });
  }

  duplicateLocalization(contact: Localization) {
    this.contactService.duplicateLocalization(contact).then((newContact: Localization) => {
      this.duplicateHandler(newContact);
    });
  }

  updateContact(contact: Localization): void {
    this.contactService.updateContact(contact).then((updatedContact: Localization) => {
      this.updateHandler(updatedContact);
    });
  }

  deleteContact(contactId: String): void {
    this.contactService.deleteContact(contactId).then((deletedContactId: String) => {
      this.deleteHandler(deletedContactId);
    });
  }
}