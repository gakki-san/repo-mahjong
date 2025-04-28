import { Player, ScoreMap } from "@/hooks/useScore";
import { handleRon } from "../ron";
import { handleTsumo } from "../tsumo";
import { WinInfo } from "@/hooks/useWinnerinfo";

export const handleApplyScore = (
  winnerInfo: WinInfo,
  setScore: (value: ScoreMap) => void,
  players: string[],
  score: ScoreMap,
) => {
  if (winnerInfo.winPoints === null) return;
  const winner = winnerInfo.winner as Player;
  const point = winnerInfo.winPoints;
  const loser = winnerInfo.loser as Player[];

  if (winnerInfo.winType === "tsumo") {
    const newScore = handleTsumo(winner, point, players, score) as ScoreMap;
    setScore(newScore);
  } else {
    const newScore = handleRon(loser[0], winner, point, score) as ScoreMap;
    setScore(newScore);
  }
};
