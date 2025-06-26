import {
  Player,
  ScoreMap,
} from "@/features/scoreManagementV2/hooks/useScore.ts";

export const calcScoreForParentTsumo = (
  score: ScoreMap,
  winner: Player,
  point: number,
): ScoreMap => {
  const calcScore = [...score];
  // 各人の支払い額は point を 100 点単位で切り上げ
  const eachPay = Math.ceil(point / 100) * 100;
  calcScore.forEach((_, i) => {
    if (i === winner) {
      calcScore[i] += eachPay * 3;
    } else {
      calcScore[i] -= eachPay;
    }
  });
  return calcScore as ScoreMap;
};
