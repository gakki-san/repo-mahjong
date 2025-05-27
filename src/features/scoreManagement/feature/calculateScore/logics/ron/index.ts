import { SCORE } from "@/features/scoreManagement/const/score";
import { ReachFlagsProps } from "@/features/scoreManagement/hooks/useReachFlags";
import { Player, ScoreMap } from "@/features/scoreManagement/hooks/useScore";

export const handleRon = (
  loser: Player,
  winner: Player,
  points: number,
  score: ScoreMap,
  reachPlayer: ReachFlagsProps,
  countHonba: number,
  countKyotaku: number,
) => {
  if (!score) return;
  const countReachPlayer = Object.values(reachPlayer).filter(
    (item) => item === true,
  ).length;
  const newScore = [...score];
  newScore.map((_, index) => {
    if (index === winner) {
      newScore[index] +=
        points +
        countReachPlayer * 1000 +
        countHonba * SCORE.HONBA_300 +
        countKyotaku * 1000;
    }
    if (index === loser) {
      newScore[index] -= points + countHonba * SCORE.HONBA_300;
    }
  });
  return newScore;
};
