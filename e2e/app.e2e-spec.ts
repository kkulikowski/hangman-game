import { HangmanGamePage } from './app.po';

describe('hangman-game App', function() {
  let page: HangmanGamePage;

  beforeEach(() => {
    page = new HangmanGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
