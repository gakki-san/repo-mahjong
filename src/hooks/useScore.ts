import { useState } from "react";

type useScoreReturn = [
  score: number[] | null,
  action: {
    set: (value: number[]) => void;
    reset: () => void;
  },
];

export const useScore = (): useScoreReturn => {
  const [score, setScore] = useState<number[] | null>(null);

  const action = {
    set: (value: number[]) => setScore(value),
    reset: () => setScore(null),
  };
  return [score, action];
};
