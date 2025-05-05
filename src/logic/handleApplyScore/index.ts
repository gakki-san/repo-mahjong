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
) => {
  if (winnerInfo.winPoints === null) return;
  const winner = winnerInfo.winner as Player;
  const point = winnerInfo.winPoints;

  const loser = currentDirectionArrray.indexOf(
    winnerInfo.loser as Player,
  ) as Player;
  console.log("currentDirectionArrray", currentDirectionArrray);
  console.log("winnerInfo.loser", winnerInfo);

  console.log("handleLoser", loser);

  if (winnerInfo.winType === "tsumo") {
    const newScore = handleTsumo(
      winner,
      point,
      players,
      score,
      reachFlags,
    ) as ScoreMap;
    setScore(newScore);
  } else {
    const newScore = handleRon(
      loser,
      winner,
      point,
      score,
      reachFlags,
    ) as ScoreMap;
    setScore(newScore);
  }
};
