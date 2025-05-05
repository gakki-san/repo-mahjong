import { ReachFlagsProps } from "@/hooks/useReachFlags";
import { Player, ScoreMap } from "@/hooks/useScore";

export const handleRon = (
  loser: Player,
  winner: Player,
  points: number,
  score: ScoreMap,
  reachPlayer: ReachFlagsProps,
) => {
  if (!score) return;
  const countReachPlayer = Object.values(reachPlayer).filter(
    (item) => item === true,
  ).length;
  const newScore = [...score];
  newScore.map((_, index) => {
    if (index === winner) {
      newScore[index] += points + countReachPlayer * 1000;
    }
    if (index === loser) {
      newScore[index] -= points;
    }
  });
  return newScore;
};
