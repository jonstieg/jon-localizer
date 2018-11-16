import { Injectable } from '@angular/core';
import { Localization } from './localization';
import { Http, Response } from '@angular/http';

@Injectable()
export class ContactService {
    private contactsUrl = '/api/contacts';
    private downloadUrl = '/api/download';
    private duplicateUrl = 'api/duplicate';
    constructor (private http: Http) {}

    // get("/api/contacts")
    getContacts(): Promise<Localization[]> {
      return this.http.get(this.contactsUrl)
                 .toPromise()
                 .then(response => response.json() as Localization[])
                 .catch(this.handleError);
    }

    // post("/api/contacts")
    createContact(newContact: Localization): Promise<Localization> {
      return this.http.post(this.contactsUrl, newContact)
                 .toPromise()
                 .then(response => response.json() as Localization)
                 .catch(this.handleError);
    }

    // get("/api/contacts/:id") endpoint not used by Angular app

    // delete("/api/contacts/:id")
    deleteContact(delContactId: String): Promise<String> {
      return this.http.delete(this.contactsUrl + '/' + delContactId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateContact(putContact: Localization): Promise<Localization> {
      var putUrl = this.contactsUrl + '/' + putContact._id;
      return this.http.put(putUrl, putContact)
                 .toPromise()
                 .then(response => response.json() as Localization)
                 .catch(this.handleError);
    }

    // get("/api/download/:language")
    getDownload(language: string): Promise<string> {
      return this.http.get(this.downloadUrl + '/' + language)
                 .toPromise()
                 .then(response => response.text() as string)
                 .catch(this.handleError);
    }

    // post("/api/duplicate")
    duplicateLocalization(newContact: Localization): Promise<Localization> {
      return this.http.post(this.duplicateUrl, newContact)
                 .toPromise()
                 .then(response => response.json() as Localization)
                 .catch(this.handleError);
    }

    private handleError (error: any): Promise<any> {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Promise.reject(errMsg);
    }


}
