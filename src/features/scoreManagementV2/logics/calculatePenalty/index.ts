import { SCORE } from "../../const/score";
import { ReachFlags } from "../../hooks/useReachFlags";
import { Player, ScoreMap } from "../../hooks/useScore";

export const calculatePenalty = (
  score: ScoreMap,
  tempaiCount: number,
  isTEMPAI: ReachFlags,
) => {
  const calcScore = [...score];
  if (tempaiCount === 0 || tempaiCount === 4) {
    return calcScore as ScoreMap;
  }

  const PENALTY_ADJUSTMENTS: Record<1 | 2 | 3, [number, number]> = {
    1: [SCORE.TRIPLE, -SCORE.SINGLE],
    2: [SCORE.DOUBLE, -SCORE.DOUBLE],
    3: [SCORE.SINGLE, -SCORE.TRIPLE],
  };

  if (tempaiCount === 0 || tempaiCount === 4) return calcScore as ScoreMap;

  const [gain, loss] = PENALTY_ADJUSTMENTS[tempaiCount as 1 | 2 | 3];

  return calcScore.map(
    (point, index) => point + (isTEMPAI[index as Player] ? gain : loss),
  ) as ScoreMap;
};
