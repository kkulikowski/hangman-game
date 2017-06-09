import * as fromHangman from './hangman.reducer';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../environments/environment';

export interface State {
  hangman: fromHangman.State;
}

export const reducers = {
  hangman: fromHangman.reducer
};

export function selectLives(state: State) {
  return state.hangman.lives;
}

export function selectWord(state: State) {
  return state.hangman.word.word;
}

export function selectGuessedLetters(state: State) {
  return state.hangman.guessedLetters;
}

export function selectMissedLetters(state: State) {
  return state.hangman.missedLetters;
}

export function selectStatus(state: State) {
  return state.hangman.status;
}

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer (state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
