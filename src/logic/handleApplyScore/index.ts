import { Player, ScoreMap } from "@/hooks/useScore";
import { handleRon } from "../ron";
import { handleTsumo } from "../tsumo";
import { WinInfo } from "@/hooks/useWinnerinfo";
import { ReachFlagsProps } from "@/hooks/useReachFlags";

export const handleApplyScore = (
  winnerInfo: WinInfo,
  setScore: (value: ScoreMap) => void,
  players: string[],
  score: ScoreMap,
  reachFlags: ReachFlagsProps,
  currentDirectionArrray: number[],
  countHonba: number,
  countKyotaku: number,
) => {
  if (winnerInfo.winPoints === null) return;
  const winner = winnerInfo.winner as Player;
  const point = winnerInfo.winPoints;

  const loser = currentDirectionArrray.indexOf(
    winnerInfo.loser as Player,
  ) as Player;

  if (winnerInfo.winType === "tsumo") {
    const newScore = handleTsumo(
      winner,
      point,
      players,
      score,
      reachFlags,
      countHonba,
      countKyotaku,
    ) as ScoreMap;
    setScore(newScore);
  } else {
    const newScore = handleRon(
      loser,
      winner,
      point,
      score,
      reachFlags,
      countHonba,
      countKyotaku,
    ) as ScoreMap;
    setScore(newScore);
  }
};
