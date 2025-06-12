import { atom, useAtom } from "jotai";

type ScoreMap = [number, number, number, number];

const initialScore: ScoreMap = [0, 0, 0, 0];

const scoreAtom = atom<ScoreMap>([0, 0, 0, 0]);

export const useScoreAtom = () => {
  const [score, setScore] = useAtom(scoreAtom);

  const action = {
    set: (value: ScoreMap) => setScore(value),
    reset: () => setScore(initialScore),
  };

  return [score, action] as const;
};
