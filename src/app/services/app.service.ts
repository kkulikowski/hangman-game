import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const API_ENDPOINT = 'http://api.wordnik.com:80/v4/words.json/';

@Injectable()
export class GameService {

  constructor(private http: Http) { }

  getWord(payload: any): Observable<any> {
    return this.http
      .get(`${API_ENDPOINT}/randomWord`, payload.params)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}
