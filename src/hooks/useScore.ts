import { useState } from "react";

export type Player = "east" | "south" | "west" | "north";

export type ScoreMap = Record<Player, number>;

export type useScoreReturn = [
  ScoreMap | null,
  action: {
    set: (value: ScoreMap) => void;
    reset: () => void;
  },
];

export const useScore = (): useScoreReturn => {
  const [score, setScore] = useState<ScoreMap | null>(null);

  const action = {
    set: (value: ScoreMap) => setScore(value),
    reset: () => setScore(null),
  };
  return [score, action];
};
