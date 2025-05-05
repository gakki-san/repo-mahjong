import { ReachFlagsProps } from "@/hooks/useReachFlags";
import { ScoreMap } from "@/hooks/useScore";

export const childrenTsumo = (
  childrenPoint: number,
  parentPoint: number,
  winner: number | null,
  prevScore: ScoreMap,
  currentDirection: number,
  reachPlayer: ReachFlagsProps,
) => {
  if (winner === null) return;
  const countReachPlayer = Object.values(reachPlayer).filter(
    (item) => item === true,
  ).length;
  const twoPerson = 2;
  const winnerPoint = childrenPoint * twoPerson + parentPoint;
  const parentIndex = (4 - currentDirection) % 4;

  const newScore = [...prevScore];

  newScore.map((_, index) => {
    if (winner === index) {
      newScore[index] += winnerPoint + countReachPlayer * 1000;
    } else if (parentIndex === index) {
      newScore[index] -= parentPoint;
    } else {
      newScore[index] -= childrenPoint;
    }
  });

  return newScore;
};
