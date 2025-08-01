import { Player } from "@/features/scoreManagementV2/hooks/useScore.ts";
import { ScoreMap } from "@/globalState/scoreAtom.ts";

export const calculateRoundBonusToScore = (
  score: ScoreMap,
  roundBonus: number,
  winner: Player | null,
  loser: Player | null,
): ScoreMap => {
  if (winner === null) {
    throw new Error("Winner must be selected for round bonus calculation");
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
