import { Player, ScoreMap } from "@/hooks/useScore";

export const handleTsumo = (
  winner: Player,
  points: number,
  players: string[],
  score: ScoreMap,
) => {
  if (!score) return;
  const newScore = [...score];
  const losePointPerson = players.length - 1;
  score.map((_, index) => {
    if (index === winner) {
      newScore[index] += points * losePointPerson;
    } else {
      newScore[index] -= points;
    }
  });
  return newScore;
};
