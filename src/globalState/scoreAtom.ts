import { atom } from "jotai";

type ScoreMap = [number, number, number, number];

const STORAGE_KEY = "score";

const scoreLength = 4;

const getInitialScore = (): ScoreMap => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (
        Array.isArray(parsed) &&
        parsed.length === scoreLength &&
        parsed.every((item) => typeof item === "number")
      ) {
        return parsed as ScoreMap;
      }
    } catch (error) {
      console.warn("取得に失敗したンゴ", error);
    }
  }
  return [0, 0, 0, 0];
};

const baseScoreAtom = atom<ScoreMap>(getInitialScore());

// 書き込みでlocalStorageにも保存
export const scoreAtom = atom(
  (get) => get(baseScoreAtom),
  (_, set, newScore: ScoreMap) => {
    set(baseScoreAtom, newScore);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newScore));
  },
);
