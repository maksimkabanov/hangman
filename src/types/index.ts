export interface WordQuestion {
  id: string;
  question: string;
  word: string;
}

export interface Result {
  gameId: string;
  question: string;
  word: string;
  lettersUsed: string[];
  success: false;
  fail: false;
}
