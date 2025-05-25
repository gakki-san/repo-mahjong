import { useState } from "react";

export type Player = 0 | 1 | 2 | 3;

export type ScoreMap = [number, number, number, number];

export type UseScoreActionMap = {
  set: (value: ScoreMap) => void;
  reset: () => void;
};

export type useScoreReturn = [ScoreMap, action: UseScoreActionMap];
const initialScore: ScoreMap = [0, 0, 0, 0];

export const useScore = (): useScoreReturn => {
  const [score, setScore] = useState<ScoreMap>(initialScore);

  const action = {
    set: (value: ScoreMap) => setScore(value),
    reset: () => setScore(initialScore),
  };
  return [score, action];
};
