import {
  Player,
  ScoreMap,
} from "@/features/scoreManagementV2/hooks/useScore.ts";

export const calculateReachBonus = (
  score: ScoreMap,
  winner: Player,
  countReachPlayer: number,
): ScoreMap => {
  const updatedScore = [...score] as ScoreMap;
  if (countReachPlayer === 0) {
    return updatedScore;
  }
  const reachPoint = countReachPlayer * 1000;
  updatedScore[winner] += reachPoint;

  return updatedScore;
};
