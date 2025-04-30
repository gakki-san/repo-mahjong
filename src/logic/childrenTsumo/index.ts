import { Player, ScoreMap } from "@/hooks/useScore";

export const childrenTsumo = (
  childrenPoint: number,
  parentPoint: number,
  winner: string,
  prevScore: ScoreMap,
) => {
  if (winner === "east") {
    alert("親があがってるよー。最初に押すボタン間違えた？");
  }

  const players: Player[] = ["east", "south", "west", "north"];

  const twoPerson = 2;
  const winnerPoint = childrenPoint * twoPerson + parentPoint;

  const newScore = {} as ScoreMap;

  for (const player of players) {
    if (player === winner) {
      newScore[player] = prevScore[player] + winnerPoint;
      continue;
    }
    if (player === "east") {
      newScore[player] = prevScore[player] - parentPoint;
      continue;
    }
    newScore[player] = prevScore[player] - childrenPoint;
  }

  return newScore;
};
