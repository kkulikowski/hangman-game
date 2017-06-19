import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const API_ENDPOINT = 'https://api.wordnik.com/api/words.json/';

@Injectable()
export class HangmanService {

  constructor(private http: Http) { }

  getWord(action: any): Observable<any> {
    return this.http
      .get(`${API_ENDPOINT}randomWord?${action.payload}`)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}
