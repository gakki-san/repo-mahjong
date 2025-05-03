import { Player, ScoreMap } from "@/hooks/useScore";

export const handleRon = (
  loser: Player,
  winner: Player,
  points: number,
  score: ScoreMap,
) => {
  if (!score) return;
  const newScore = [...score];
  newScore.map((_, index) => {
    if (index === winner) {
      newScore[index] += points;
    }
    if (index === loser) {
      newScore[index] -= points;
    }
  });
  return newScore;
};
