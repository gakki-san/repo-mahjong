import { useState } from "react";
import { ScoreMap } from "@/globalState/scoreAtom.ts";

export type Player = 0 | 1 | 2 | 3;

export type UseScoreActionMap = {
  set: (value: ScoreMap) => void;
  reset: () => void;
};

const initialScore = [0, 0, 0, 0] as ScoreMap;

export const useScore = () => {
  const [score, setScore] = useState<ScoreMap>(initialScore);

  const action = {
    set: (value: ScoreMap) => setScore(value),
    reset: () => setScore([0, 0, 0, 0]),
  };

  return [score, action] as const;
};
