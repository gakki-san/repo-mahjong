import { SCORE } from "@/features/scoreManagement/const/score";
import { ReachFlagsProps } from "@/features/scoreManagement/hooks/useReachFlags";
import { ScoreMap } from "@/features/scoreManagement/hooks/useScore";

export const childrenTsumo = (
  childrenPoint: number,
  parentPoint: number,
  winner: number | null,
  prevScore: ScoreMap,
  currentDirection: number,
  reachPlayer: ReachFlagsProps,
  countHonba: number,
  countKyotaku: number,
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
      newScore[index] +=
        winnerPoint +
        countReachPlayer * 1000 +
        countHonba * SCORE.HONBA_300 +
        countKyotaku * 1000;
    } else if (parentIndex === index) {
      newScore[index] -= parentPoint + countHonba * SCORE.HONBA_100;
    } else {
      newScore[index] -= childrenPoint + countHonba * SCORE.HONBA_100;
    }
  });

  return newScore;
};
