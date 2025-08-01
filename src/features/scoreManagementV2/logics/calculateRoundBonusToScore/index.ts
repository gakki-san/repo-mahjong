import {
  Player,
  ScoreMap,
} from "@/features/scoreManagementV2/hooks/useScore.ts";

export const calculateRoundBonusToScore = (
  score: ScoreMap,
  roundBonus: number,
  winner: Player | null,
  loser: Player | null,
): ScoreMap => {
  if (winner === null) {
    console.error("winnerが選択されていません");
    return score;
  }
  const currentScore = [...score] as ScoreMap;
  if (roundBonus === 0) return currentScore;

  return currentScore.map((playerScore, index) => {
    if (index === winner) {
      return playerScore + roundBonus * 300;
    }
    if (loser !== null) {
      return index === loser ? playerScore - roundBonus * 300 : playerScore;
    }
    return playerScore - roundBonus * 100;
  }) as ScoreMap;
};
