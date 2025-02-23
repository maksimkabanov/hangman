export interface WordQuestion {
  id: string;
  question: string;
  word: string;
}

export interface Result {
  gameId: string;
  lifes: number;
  question: string;
  word: string;
  lettersUsed: string[];
  success: boolean;
  fail: boolean;
}

export interface LocalStorageItem {
  results: { [gameId: string]: Result };
}
