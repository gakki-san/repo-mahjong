import { ReachFlagsProps } from "@/hooks/useReachFlags";
import { Player, ScoreMap } from "@/hooks/useScore";

export const calculateReachScore = (
  player: Player,
  reachFlags: ReachFlagsProps,
  score: ScoreMap,
) => {
  const reachPoint = 1000;
  const isReach = reachFlags[player];
  const delta = isReach ? reachPoint : -reachPoint;
  return {
    ...score,
    [player]: score[player] + delta,
  };
};
