import { SCORE } from "../../const/score";
import { ReachFlagsProps } from "../../hooks/useReachFlags";
import { Player, ScoreMap } from "../../hooks/useScore";

export const calculatePenalty = (
  score: ScoreMap,
  tempaiCount: number,
  isTENPAI: ReachFlagsProps,
) => {
  if (tempaiCount === 0 || tempaiCount === 4) {
    return score as ScoreMap;
  }

  const PENALTY_ADJUSTMENTS: Record<1 | 2 | 3, [number, number]> = {
    1: [SCORE.TRIPLE, -SCORE.SINGLE],
    2: [SCORE.DOUBLE, -SCORE.DOUBLE],
    3: [SCORE.SINGLE, -SCORE.TRIPLE],
  };
  if (tempaiCount === 0 || tempaiCount === 4) return [...score] as ScoreMap;

  const [gain, loss] = PENALTY_ADJUSTMENTS[tempaiCount as 1 | 2 | 3];

  return score.map(
    (point, index) => point + (isTENPAI[index as Player] ? gain : loss),
  ) as ScoreMap;
};
