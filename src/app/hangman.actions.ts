import { Action } from '@ngrx/store';

import { Word } from './hangman.interfaces';

export const RESET_GAME = '[Hangman] Reset game';
export const GET_WORD = '[Hangman] Get word from api';
export const SET_GAME_STATUS = '[Hangman] Set game status';
export const GET_WORD_SUCCESS = '[Hangman] Get word from api success';
export const GET_WORD_ERROR = '[Hangman] Get word from api error';
export const CHECK_LETTER = '[Hangman] Check letter action';
export const CHECK_LETTER_SUCCESS = '[Hangman] Check letter action success';
export const CHECK_LETTER_ERROR = '[Hangman] Check letter action error';

export class ResetGame implements Action {
  readonly type = RESET_GAME;
}

export class SetGameStatus implements Action {
  readonly type = SET_GAME_STATUS;

  constructor(public payload: any) { };
}

export class GetWord implements Action {
  readonly type = GET_WORD;

  constructor(public payload: any) { };
}

export class GetWordSuccess implements Action {
  readonly type = GET_WORD_SUCCESS;

  constructor(public payload: Word) { };
}

export class GetWordError implements Action {
  readonly type = GET_WORD_ERROR;

  constructor(public payload: any) { };
}

export class CheckLetter implements Action {
  readonly type = CHECK_LETTER;

  constructor(public payload: any) { };
}

export class CheckLetterSuccess implements Action {
  readonly type = CHECK_LETTER_SUCCESS;

  constructor(public payload: any) { };
}

export class CheckLetterError implements Action {
  readonly type = CHECK_LETTER_ERROR;

  constructor(public payload: any) { };
}

export type All
 = ResetGame
 | SetGameStatus
 | GetWord
 | GetWordSuccess
 | GetWordError
 | CheckLetter
 | CheckLetterSuccess
 | CheckLetterError;
