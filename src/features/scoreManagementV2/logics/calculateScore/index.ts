import { Player } from "@/features/scoreManagementV2/hooks/useScore.ts";
import { calcScoreForRon } from "@/features/scoreManagementV2/logics/calcScoreForRon";
import { calcScoreForParentTsumo } from "@/features/scoreManagementV2/logics/calcScoreForParentTsumo";
import { calcScoreForChildrenTsumo } from "@/features/scoreManagementV2/logics/calcScoreForChildrenTsumo";
import { ScoreMap } from "@/globalState/scoreAtom.ts";

type CalculateScore = {
  winner: Player | null;
  score: ScoreMap;
  point: number | null;
  parent: Player;
  loser: Player | null;
};

export const calculateScore = ({
  winner,
  score,
  point,
  parent,
  loser,
}: CalculateScore): ScoreMap => {
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
    return calcScoreForParentTsumo(result, winner, point);
  }

  // 2) 子ツモ
  return calcScoreForChildrenTsumo(result, winner, point, parent);
};
