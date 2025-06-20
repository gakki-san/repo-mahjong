import { ScoreMap } from "@/features/scoreManagementV2/hooks/useScore.ts";

export const calculateScoreDiff = (player: number, score: number[]) => {
  const currentScore = [...score];
  return currentScore.map(
    (playerScore) => playerScore - currentScore[player],
  ) as ScoreMap;
};
