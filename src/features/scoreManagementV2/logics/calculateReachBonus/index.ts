import { Player } from "@/features/scoreManagementV2/hooks/useScore.ts";
import { ScoreMap } from "@/globalState/scoreAtom.ts";

type CalculateReachBonus = {
  score: ScoreMap;
  winner: Player | null;
  countReachPlayer: number;
};

export const calculateReachBonus = ({
  score,
  winner,
  countReachPlayer,
}: CalculateReachBonus): ScoreMap => {
  if (winner === null) return score;
  const updatedScore = [...score] as ScoreMap;
  if (countReachPlayer === 0 || countReachPlayer === 4) {
    return updatedScore;
  }

  const reachPoint = countReachPlayer * 1000;
  updatedScore[winner] += reachPoint;

  return updatedScore;
};
