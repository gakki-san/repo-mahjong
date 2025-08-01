import { ScoreMap } from "@/globalState/scoreAtom.ts";

export const calculateScoreDiff = (player: number, score: number[]) => {
  if (player < 0 || player >= score.length) {
    throw new Error(
      `Invalid player index: ${player}. Must be between 0 and ${score.length - 1}`,
    );
  }
  const currentScore = [...score];
  return currentScore.map(
    (playerScore) => playerScore - currentScore[player],
  ) as ScoreMap;
};
