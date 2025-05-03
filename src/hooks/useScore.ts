import { useState } from "react";

export type Player = 0 | 1 | 2 | 3;

export type ScoreMap = [number, number, number, number];

export type UseScoreActionMap = {
  set: (value: ScoreMap) => void;
  reset: () => void;
};

export type useScoreReturn = [ScoreMap | null, action: UseScoreActionMap];

export const useScore = (): useScoreReturn => {
  const [score, setScore] = useState<ScoreMap | null>(null);

  const action = {
    set: (value: ScoreMap) => setScore(value),
    reset: () => setScore(null),
  };
  return [score, action];
};
