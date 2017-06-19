import * as HangmanActions from './hangman.actions';
import { Word, Status } from 'app/hangman.interfaces';

export interface State {
  readonly word: Word;
  readonly guessedLetters: string[];
  readonly missedLetters: string[];
  readonly lives: number;
  readonly status: Status;
}

const initialState: State = {
  word: {id: 0, word: 'netguru'},
  guessedLetters: [],
  missedLetters: [],
  lives: 11,
  status: {
    over: false,
    won: false
  }
};

export function reducer (state = initialState, action: HangmanActions.All): State {
  switch (action.type) {

    case HangmanActions.RESET_GAME:
      return initialState;

    case HangmanActions.SET_GAME_STATUS:
      return {
        ...state,
        status: action.payload
      };

    case HangmanActions.GET_WORD_SUCCESS:
      const newWord = {...action.payload, word: action.payload.word.toUpperCase()}
      return { ...state, word: newWord };

    case HangmanActions.GET_WORD_ERROR:
      return initialState;

    case HangmanActions.CHECK_LETTER_SUCCESS:
      const newArrayWithGuessedLetter = [
        ...state.guessedLetters.slice(0, 0),
        action.payload,
        ...state.guessedLetters.slice(0)
      ];
      return {
        ...state,
        guessedLetters: newArrayWithGuessedLetter
      };

    case HangmanActions.CHECK_LETTER_ERROR:
      const newLivesCount = state.lives - 1;
      const newArrayWithMissedLetter = [
        ...state.missedLetters.slice(0, 0),
        action.payload,
        ...state.missedLetters.slice(0)
      ];
      return {
        ...state,
        missedLetters: newArrayWithMissedLetter,
        lives: newLivesCount
      };

    default:
      return state;
  }
}
