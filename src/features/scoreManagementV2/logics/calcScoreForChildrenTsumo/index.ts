import { ScoreMap } from "@/globalState/scoreAtom.ts";
import { Player } from "@/features/scoreManagementV2/hooks/useScore.ts";

export const calcScoreForChildrenTsumo = (
  score: ScoreMap,
  winner: Player,
  point: number,
  parent: Player,
): ScoreMap => {
  const otherChildPay = Math.ceil(point / 4 / 100) * 100;
  // 親の支払いは残り全額
  const parentPay = point - otherChildPay * 2;
  const result = [...score];

  score.forEach((_, i) => {
    if (i === winner) {
      result[i] += point;
    } else if (i === parent) {
      result[i] -= parentPay;
    } else {
      // 他の子
      result[i] -= otherChildPay;
    }
  });

  return result;
};
