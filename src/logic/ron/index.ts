import { Player, ScoreMap } from "@/hooks/useScore";

export const handleRon = (
  loser: Player,
  winner: Player,
  points: number,
  score: ScoreMap,
) => {
  if (!score) return;
  const newScore = {
    ...score,
    [winner]: score[winner] + points,
    [loser]: score[loser] - points,
  };
  return newScore;
};
