import { ScoreMap } from "@/features/scoreManagementV2/hooks/useScore.ts";

export const calculateWinnerScore = (
  winner: number,
  score: ScoreMap,
  point: number,
) => {
  const currentScore = [...score];
  currentScore[winner] += point;
  return currentScore;
};
