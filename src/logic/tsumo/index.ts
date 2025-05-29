import { SCORE } from "@/const/score";
import { ReachFlagsProps } from "@/hooks/useReachFlags";
import { Player, ScoreMap } from "@/hooks/useScore";

// todo: 既に計算済みのpoint(winnerPoint,loserPoint)を引数にする
export const handleTsumo = (
  winner: Player,
  points: number,
  players: string[],
  score: ScoreMap,
  reachPlayer: ReachFlagsProps,
  countHonba: number,
) => {
  if (!score) return;
  const newScore = [...score];
  const countReachPlayer = Object.values(reachPlayer).filter(
    (item) => item === true,
  ).length;
  const losePointPerson = players.length - 1;
  score.map((_, index) => {
    if (index === winner) {
      newScore[index] +=
        points * losePointPerson +
        countReachPlayer * 1000 +
        countHonba * SCORE.HONBA_300;
    } else {
      newScore[index] -= points + countHonba * SCORE.HONBA_100;
    }
  });
  return newScore;
};
