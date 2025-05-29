import { Player, ScoreMap } from "@/hooks/useScore";

export const handleScoreDiff = (playerIndex: Player, score: ScoreMap) => {
  const currentScore = [...score];
  return currentScore.map(
    (item) => item - currentScore[playerIndex],
  ) as ScoreMap;
};
