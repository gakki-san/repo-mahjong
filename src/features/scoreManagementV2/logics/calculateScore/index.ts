import { Player } from "@/features/scoreManagementV2/hooks/useScore.ts";
import { ScoreMap } from "@/globalState/scoreAtom.ts";

export const calculateScore = (
  winner: Player | null,
  score: ScoreMap,
  point: number | null,
  parent: Player,
  loser: Player | null,
): ScoreMap => {
  if (winner === null || point === null) {
    console.error("winnerかpointが入力されていないです。");
    return score;
  }
  const currentScore = [...score];
  const fromEachPlayerWhenParentWins = point;
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

  if (loser !== null) {
    currentScore[winner] += point;
    currentScore[loser] -= point;
    return currentScore;
  }

  return currentScore.map((score, index) => {
    if (index === parent && index === winner) {
      return score + point * 3;
    } else if (index === winner) {
      return score + point;
    } else {
      return score - payments[index];
    }
  });
};
