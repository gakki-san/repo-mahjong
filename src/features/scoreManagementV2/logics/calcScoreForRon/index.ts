import { Player } from "@/features/scoreManagementV2/hooks/useScore.ts";
import { ScoreMap } from "@/globalState/scoreAtom.ts";

export const calcScoreForRon = (
  score: ScoreMap,
  loser: Player,
  winner: Player,
  point: number,
): ScoreMap => {
  const next = [...score] as ScoreMap;
  next[winner] += point;
  next[loser] -= point;
  return next;
};
