import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { HangmanService } from './services/hangman.service';

import * as HangmanActions from './hangman.actions';
import { Word } from './hangman.interfaces';

@Injectable()
export class HangmanEffects {

  @Effect()
  getWord$: Observable<Action> = this.actions$.ofType(HangmanActions.GET_WORD)
    .switchMap(payload =>
      this.hangmanService.getWord(payload)
        .map((word: Word) => new HangmanActions.GetWordSuccess(word))
        .catch((err) => Observable.of(new HangmanActions.GetWordError(err)))
    );

  constructor(
    private actions$: Actions,
    private hangmanService: HangmanService
  ) { }
}
