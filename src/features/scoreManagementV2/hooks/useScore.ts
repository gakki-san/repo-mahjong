import { scoreAtom } from "@/globalState/scoreAtom.ts";
import { useAtom } from "jotai";

export type Player = 0 | 1 | 2 | 3;

export type ScoreMap = [number, number, number, number];

export type UseScoreActionMap = {
  set: (value: ScoreMap) => void;
  reset: () => void;
};

export const useScoreAtom = () => {
  const [score, setScore] = useAtom(scoreAtom);

  const action = {
    set: (value: ScoreMap) => setScore(value),
    reset: () => setScore([0, 0, 0, 0]),
  };

  return [score, action] as const;
};
