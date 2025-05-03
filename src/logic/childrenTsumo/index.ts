import { ScoreMap } from "@/hooks/useScore";

export const childrenTsumo = (
  childrenPoint: number,
  parentPoint: number,
  winner: number | null,
  prevScore: ScoreMap,
  currentDirection: number,
) => {
  if (currentDirection === 0) {
    alert("親があがってるよー。最初に押すボタン間違えた？");
  }
  if (winner === null) return;
  const twoPerson = 2;
  const winnerPoint = childrenPoint * twoPerson + parentPoint;
  const parentIndex = (4 - currentDirection) % 4;

  const newScore = [...prevScore];

  newScore.map((_, index) => {
    if (winner === index) {
      newScore[index] += winnerPoint;
    } else if (parentIndex === index) {
      newScore[index] -= parentPoint;
    } else {
      newScore[index] -= childrenPoint;
    }
  });

  return newScore;
};
