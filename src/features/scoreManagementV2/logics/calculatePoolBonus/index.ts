import {
  Player,
  ScoreMap,
} from "@/features/scoreManagementV2/hooks/useScore.ts";

export const calculatePoolBonus = (
  score: ScoreMap,
  poolBonus: number,
  winner: Player | null,
): ScoreMap => {
  if (winner === null || score === undefined) {
    console.error("winnerかscoreが入力されていません");
    return score;
  }
  const updatedScore = [...score] as ScoreMap;
  if (poolBonus < 0) {
    console.error("供託がマイナスになっています!!");
    return updatedScore;
  }
  updatedScore[winner] += poolBonus * 1000;

  return updatedScore;
};
