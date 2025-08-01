import { Player } from "@/features/scoreManagementV2/hooks/useScore.ts";
import { ScoreMap } from "@/globalState/scoreAtom.ts";

export const calcScoreForRon = (
  score: ScoreMap,
  loser: Player,
  winner: Player,
  point: number,
): ScoreMap => {
  if (
    loser < 0 ||
    loser >= score.length ||
    winner < 0 ||
    winner >= score.length
  ) {
    throw new Error("Invalid player index");
  }
  if (point <= 0) {
    throw new Error("Point value must be positive");
  }
  if (loser === winner) {
    throw new Error("Loser and winner cannot be the same player");
  }
  const next = [...score] as ScoreMap;
  next[winner] += point;
  next[loser] -= point;
  return next;
};
