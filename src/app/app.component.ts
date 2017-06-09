import { Component, HostListener, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as HangmanActions from './hangman.actions';
import * as fromRoot from './reducers';
import { Observable } from 'rxjs/Observable';
import { Status } from './hangman.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  searchParams = {
    hasDictionaryDef: false,
    minCorpusCount: 0,
    maxCorpusCount: -1,
    minDictionaryCount: 1,
    maxDictionaryCount: -1,
    minLength: 5,
    maxLength: 11,
    api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
  };
  params2 = 'hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=11&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

  lives$: Observable<number>;
  wordToGuess$: Observable<string>;
  missedLetters$: Observable<string[]>;
  guessedLetters$: Observable<string[]>;
  status$: Observable<Status>;

  constructor(private store: Store<fromRoot.State>) {
    this.lives$ = store.select(fromRoot.selectLives);
    this.wordToGuess$ = store.select(fromRoot.selectWord);
    this.missedLetters$ = store.select(fromRoot.selectMissedLetters);
    this.guessedLetters$ = store.select(fromRoot.selectGuessedLetters);
    this.status$ = store.select(fromRoot.selectStatus);
  }

  ngOnInit(): void {
    this.store.dispatch(new HangmanActions.GetWord(this.params2));
  }

  onCheckLetterHandler($event) {
    if ($event.success) {
      this.store.dispatch(new HangmanActions.CheckLetterSuccess($event.letter));
    } else {
      this.store.dispatch(new HangmanActions.CheckLetterError($event.letter));
    }
  }

  onGetNewWordHandler() {
    this.store.dispatch(new HangmanActions.GetWord(this.params2));
  }

  onResetGameHandler() {
    this.store.dispatch(new HangmanActions.GetWord(this.params2));
    this.store.dispatch(new HangmanActions.ResetGame());
  }

  onSetGameStatusHandler($event) {
    this.store.dispatch(new HangmanActions.SetGameStatus($event));
  }

}
