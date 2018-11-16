import { Component, OnInit } from '@angular/core';
import { Localization } from '../localization';
import { ContactService } from '../contact.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
// import { Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})

export class ContactListComponent implements OnInit {

  languages: string[]
  selectedLanguage: string
  contacts: Localization[]
  selectedContact: Localization

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router) { }
  // constructor(private contactService: ContactService, private router: Router) { }

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
    this.contactService
      .getContacts()
      .then((contacts: Localization[]) => {
        this.contacts = contacts.filter(contact => contact.language === this.selectedLanguage);
      });
  }

  private getIndexOfContact = (contactId: String) => {
    return this.contacts.findIndex((contact) => {
      return contact._id === contactId;
    });
  }

  selectLanguage(language: string) {
    // this.router.navigate(['/#' + this.selectedLanguage]);
    this.selectedLanguage = language;
    this.contactService
      .getContacts()
      .then((contacts: Localization[]) => {
        this.contacts = contacts.filter(contact => contact.language === this.selectedLanguage);
      });
  }

  selectContact(contact: Localization) {
    if (this.selectedContact === contact) {
      this.selectedContact = null;
    } else {
      this.selectedContact = contact
    }
  }

  createNewContact() {
    var contact: Localization = {
      string: '',
      localization: '',
      comment: '',
      language: this.selectedLanguage
    };

    // By default, a newly-created contact will have the selected state.
    this.selectContact(contact);
  }

  deleteContact = (contactId: String) => {
    var idx = this.getIndexOfContact(contactId);
    if (idx !== -1) {
      this.contacts.splice(idx, 1);
      this.selectContact(null);
    }
    return this.contacts;
  }

  addContact = (contact: Localization) => {
    contact.language = this.selectedLanguage;
    this.contacts.push(contact);
    this.selectContact(null);
    return this.contacts;
  }

  duplicateLocalization = (contact: Localization) => {
    contact.language = this.selectedLanguage;
    this.contacts.push(contact);
    this.selectContact(null);
    return this.contacts;
  }

  updateContact = (contact: Localization) => {
    var idx = this.getIndexOfContact(contact._id);
    if (idx !== -1) {
      this.contacts[idx] = contact;
    }
    this.selectContact(null);
    return this.contacts;
  }

  downloadContacts = () => {
    // this.contactService.getDownload(this.selectedLanguage).then((download: any) => {
    //   this.downloadFile(download)
    //   console.log(download);
    // });
    var textForFile = '';
    this.contacts.forEach(function (localization) {
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