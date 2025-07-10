import { Player } from "../../hooks/useScore";
import { RankOrderRuleAtom } from "@/globalState/rankOrderRuleAtom.ts";
import { ScoreMap } from "@/globalState/scoreAtom.ts";
import { PlusScoreRule } from "@/globalState/plusScoreRuleAtom.ts";

export const calculateFinishScore = (
  score: ScoreMap,
  plusScoreRule: PlusScoreRule | null,
  rankOrderRule: RankOrderRuleAtom | null,
): ScoreMap => {
  if (plusScoreRule === null || rankOrderRule === null) {
    return score;
  }

  const rule: Record<string, [number, number]> = {
    "5-10": [5000, 10000],
    "10-20": [10000, 20000],
    "10-30": [10000, 30000],
    "20-30": [20000, 30000],
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
