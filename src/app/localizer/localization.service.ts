import { Injectable } from '@angular/core';
import { Localization } from './localization';
import { Http, Response } from '@angular/http';

@Injectable()
export class LocalizationService {
    private localizationUrl = '/api/localization';
    private downloadUrl = '/api/download';
    private duplicateUrl = 'api/duplicate';
    constructor (private http: Http) {}

    // get("/api/localization")
    getLocalizations(): Promise<Localization[]> {
      return this.http.get(this.localizationUrl)
                 .toPromise()
                 .then(response => response.json() as Localization[])
                 .catch(this.handleError);
    }

    // post("/api/localization")
    createLocalization(newLocalization: Localization): Promise<Localization> {
      return this.http.post(this.localizationUrl, newLocalization)
                 .toPromise()
                 .then(response => response.json() as Localization)
                 .catch(this.handleError);
    }

    // get("/api/localization/:id") endpoint not used by Angular app

    // delete("/api/localization/:id")
    deleteLocalization(delLocalizationId: String): Promise<String> {
      return this.http.delete(this.localizationUrl + '/' + delLocalizationId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/localization/:id")
    updateLocalization(putLocalization: Localization): Promise<Localization> {
      var putUrl = this.localizationUrl + '/' + putLocalization._id;
      return this.http.put(putUrl, putLocalization)
                 .toPromise()
                 .then(response => response.json() as Localization)
                 .catch(this.handleError);
    }

    // post("/api/duplicate")
    duplicateLocalization(newLocalization: Localization): Promise<Localization> {
      return this.http.post(this.duplicateUrl, newLocalization)
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
