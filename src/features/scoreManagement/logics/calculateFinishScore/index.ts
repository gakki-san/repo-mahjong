import { Player, ScoreMap } from "../../hooks/useScore";

export const calculateFinishScore = (
  score: ScoreMap,
  returnPoint: number,
  umaRule: number,
): ScoreMap => {
  const rule: Record<number, [number, number]> = {
    0: [5000, 10000],
    1: [10000, 20000],
    2: [10000, 30000],
    3: [20000, 30000],
  };

  const [smallUma, bigUma] = rule[umaRule];
  const okaBonus = Number(returnPoint) === 30000 ? 20000 : 0;

  const base = [
    bigUma + okaBonus - returnPoint,
    smallUma - returnPoint,
    -smallUma - returnPoint,
    -bigUma - returnPoint,
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
