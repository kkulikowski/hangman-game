import { Component, HostListener, Input, EventEmitter, Output, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';

import { difference } from 'lodash';
import { Status } from '../../hangman.interfaces';

@Component({
  selector: 'app-hangman-dashboard',
  templateUrl: './hangman-dashboard.component.html',
  styleUrls: ['./hangman-dashboard.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class HangmanDashboardComponent implements OnChanges {
  changeDetected: boolean;
  oldStatus: Status;
  // TODO connect it with params to wordnik api request
  maxWordLength = 11;
  emptyBoxes: string[];
  wordToGuessArray: string[];
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  // RegEx for checking word
  format = /^[!@#$%^&*()_ +\-=\[\]{};':"\\|,.<>\/?]*$/;

  @Input() lives: number;
  @Input() wordToGuess: string;
  @Input() guessedLetters: string;
  @Input() missedLetters: string;
  @Input() status: Status;
  @Output() checkLetterEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() getNewWord: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetGame: EventEmitter<any> = new EventEmitter<any>();
  @Output() setGameStatus: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('window:keypress', ['$event'])
  testLetterHandler($event: KeyboardEvent) {
    const letter = String.fromCharCode($event.charCode !== null ? $event.charCode : $event.keyCode);
    this.testLetter(letter.toUpperCase());
  }


  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.wordToGuess && this.status.over === false) {
      // prepare array with letters to show
      this.wordToGuessArray = this.wordToGuess.toUpperCase().split('');
      // check if word has special marks, if so get a new one
      if (this._isWordValid(this.wordToGuess)) {
        this.getNewWord.emit();
        return;
      }
      // check if word to guess length array length is lower than max word count to prevent errors in template
      if (this.wordToGuessArray.length < this.maxWordLength) {
        // prepare array for ngFor loop since we cannot repeat n times
        this.emptyBoxes = Array((this.maxWordLength - 1) - this.wordToGuessArray.length).fill('');
      }

      // check if game is won
      if (this._isGameWon()) {
        console.log('game is won');
        this._setGameStatus(true, true);
      };
      // or lost
      if (this._isGameLost()) {
        console.log('game is lost');
        this._setGameStatus(true, false);
      }
    }
  }

  testLetter (letter: string) {
    // dont do anything if pressed key is not a letter or game is over
    if (!this._isLetter(letter) || this.status.over) {
      return;
    }

    // check if letter is guessed and was not guessed already
    if (this.guessedLetterNotOnList(letter)) {
      this.checkLetterEvent.emit({letter: letter.toUpperCase(), success: true});
      return;
    }

    // check if letter is missed and was not missed already
    if (this.missedLetterNotOnList(letter)) {
      this.checkLetterEvent.emit({letter: letter.toUpperCase(), success: false});
    }
  }

  guessedLetterNotOnList(letter: string): boolean {
    return (this.wordToGuess.indexOf(letter) > -1) && (this.guessedLetters.indexOf(letter) === -1);
  }

  missedLetterNotOnList(letter: string): boolean {
    return (this.wordToGuess.indexOf(letter) === -1) && (this.missedLetters.indexOf(letter) === -1);
  }

  isLetterGuessed(letter: string): boolean {
    return this.guessedLetters.indexOf(letter) !== -1;
  }

  resetGameHandler(): void {
    this.resetGame.emit();
  }

  // check if letter is in alphabet - if no, well.. don't do anything
  private _isLetter(letter: string): boolean {
    return this.alphabet.indexOf(letter) !== -1;
  }

  // check if there are any differences between arrays, if no - you won the game!
  private _isGameWon(): boolean {
    return difference(this.wordToGuessArray, this.guessedLetters).length ? false : true;
  }

  // check if game is over and lostlost
  private _isGameLost(): boolean {
    return this.lives === 0 ? true : false;
  }

  // check if word is valid
  private _isWordValid(word: string): boolean {
    return /[~`!#$%\^&*+=\-\[\]\\';,\/{}|\\":<>\@?1234567890]/g.test(word);
  }

  // set game status
  private _setGameStatus(isOver: boolean, isWon: boolean) {
    this.setGameStatus.emit({over: isOver, won: isWon});
  }

}
