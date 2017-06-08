export interface AppState {
  readonly word: string;
  readonly guessedLetters: string[];
  readonly missedLetters: string[];
  readonly lives: number;
  readonly win: boolean;
}