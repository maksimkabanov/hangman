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
  startTimestamp: number;
  endTimestamp?: number;
}

export interface LocalStorageItem {
  results: { [gameId: string]: Result };
}
