import { Player, ScoreMap } from "@/hooks/useScore";

export const handleTsumo = (
  winner: Player,
  points: number,
  players: string[],
  score: ScoreMap,
) => {
  const newScore: ScoreMap = {} as ScoreMap;
  if (!score || !newScore) return;
  const losePointPerson = players.length - 1;
  for (const player of players) {
    const person = player as Player;
    if (person === winner) {
      newScore[person] = score[person] + points * losePointPerson;
    } else {
      newScore[person] = score[person] - points;
    }
  }

  return newScore;
};
