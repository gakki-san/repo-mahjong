import {
  Player,
  ScoreMap,
} from "@/features/scoreManagementV2/hooks/useScore.ts";
import { calcScoreForRon } from "@/features/scoreManagementV2/logics/calcScoreForRon";

export const calculateScore = (
  winner: Player | null,
  score: ScoreMap,
  point: number | null,
  parent: Player,
  loser: Player | null,
): ScoreMap => {
  // winner または point が null なら変化なし
  if (winner === null || point === null) {
    return [...score] as ScoreMap;
  }

  const result = [...score] as ScoreMap;

  // 【ロン】
  if (loser !== null) {
    return calcScoreForRon(result, loser, winner, point);
  }

  // 【ツモ】── 振込なし・全部持ち回し
  // 1) 親ツモ
  if (winner === parent) {
    // 各人の支払い額は point を 100 点単位で切り上げ
    const eachPay = Math.ceil(point / 100) * 100;
    score.forEach((_, i) => {
      if (i === winner) {
        result[i] += eachPay * 3;
      } else {
        result[i] -= eachPay;
      }
    });
    return result as ScoreMap;
  }

  // 2) 子ツモ
  // 他の子（親・自分以外の子）が支払う額を計算：point/4 を 100 点単位で切り上げ
  const otherChildPay = Math.ceil(point / 4 / 100) * 100;
  // 親の支払いは残り全額
  const parentPay = point - otherChildPay * 2;

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

  return result as ScoreMap;
};
