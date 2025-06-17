import {
  Player,
  ScoreMap,
} from "@/features/scoreManagementV2/hooks/useScore.ts";

export const calculateScore = (
  winner: Player,
  score: ScoreMap,
  point: number,
  parent: Player,
) => {
  const currentScore = [...score];
  const fromEachPlayerWhenParentWins = point / 3;
  const fromParentWhenChildWins = point / 2;
  const fromOtherChildWhenChildWins = point / 4;
  const payments = currentScore.map((_, index) => {
    if (index === winner) return 0;
    if (winner === parent) {
      return fromEachPlayerWhenParentWins;
    } else if (index === parent) {
      return fromParentWhenChildWins;
    } else {
      return fromOtherChildWhenChildWins;
    }
  });

  return currentScore.map((score, index) => {
    if (index === winner) {
      return score + point;
    } else {
      return score - payments[index];
    }
  }) as ScoreMap;
};
