import wordQuestions from "./static/words_questions.json";
import { WordQuestion } from "./types";
export const WODR_QUESTIONS = wordQuestions;
export const WODR_QUESTIONS_IDS = wordQuestions.map((q) => q.id);
export const WODR_QUESTIONS_MAP = wordQuestions.reduce((acc, q) => {
  acc[q.id] = q;
  return acc;
}, {} as { [id: string]: WordQuestion });

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
export const LETTERS_ARRAY = LETTERS.split("");

export const SUCCESS_COLOR = "oklch(.871 .15 154.449)";
export const FAIL_COLOR = "oklch(.808 .114 19.571)";
export const GRAY_COLOR = "oklch(.872 .01 258.338)";
