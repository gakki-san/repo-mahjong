import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai/index";

export type ScoreMap = number[];

const STORAGE_KEY = "score";

const scoreAtom = atomWithStorage<ScoreMap>(STORAGE_KEY, [0, 0, 0, 0]);

export const useScoreAtom = () => {
  const [score, setScore] = useAtom(scoreAtom);

  const action = {
    set: (value: ScoreMap) => setScore(value),
    reset: () => setScore([0, 0, 0, 0]),
  };

  return [score, action] as const;
};

//-
// const scoreLength = 4;
//
// const getInitialScore = (): ScoreMap => {
//   const stored = localStorage.getItem(STORAGE_KEY);
//   if (stored) {
//     try {
//       const parsed = JSON.parse(stored);
//       if (
//         Array.isArray(parsed) &&
//         parsed.length === scoreLength &&
//         parsed.every((item) => typeof item === "number")
//       ) {
//         return parsed as ScoreMap;
//       }
//     } catch (error) {
//       console.warn("取得に失敗したンゴ", error);
//     }
//   }
//   return [0, 0, 0, 0];
// };
//
// const baseScoreAtom = atom<ScoreMap>(getInitialScore());

// export const scoreAtom = atom(
//   (get) => get(baseScoreAtom),
//   (_, set, newScore: ScoreMap) => {
//     set(baseScoreAtom, newScore);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(newScore));
//   },
// );
