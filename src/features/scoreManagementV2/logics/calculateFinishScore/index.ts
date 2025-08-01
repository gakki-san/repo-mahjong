import { Player, ScoreMap } from "../../hooks/useScore";
import { RankOrderRuleAtom } from "@/globalState/rankOrderRuleAtom.ts";
import { PlusScoreRule } from "@/features/scoreManagementV2/hooks/usePlusScoreRule.ts";

export const calculateFinishScore = (
  score: ScoreMap,
  plusScoreRule: PlusScoreRule | null,
  rankOrderRule: RankOrderRuleAtom | null,
): ScoreMap => {
  if (plusScoreRule === null || rankOrderRule === null) {
    return score;
  }

  const rule: Record<number, [number, number]> = {
    0: [5000, 10000],
    1: [10000, 20000],
    2: [10000, 30000],
    3: [20000, 30000],
  };

  const [smallUma, bigUma] = rule[rankOrderRule];
  const okaBonus = Number(plusScoreRule) === 30000 ? 20000 : 0;

  const base = [
    bigUma + okaBonus - plusScoreRule,
    smallUma - plusScoreRule,
    -smallUma - plusScoreRule,
    -bigUma - plusScoreRule,
  ];

  const sortScore = score.map((point, index) => ({
    point,
    index: index as Player,
  }));
  sortScore.sort((a, b) => b.point - a.point);

  const newScore = new Array(4);
  sortScore.forEach((entry, rank) => {
    newScore[entry.index] = base[rank];
  });

  return score.map(
    (points, index) => points + newScore[index as Player],
  ) as ScoreMap;
};
