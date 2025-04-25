import { useState } from "react";
import { Player } from "./useScore";

type WinInfo = {
  winType: "tsumo" | "ron" | null;
  winner: Player | null;
  loser: Player | null;
  winPoints: number | null;
};

type UseWinnerInfoReturn = [WinInfo, (value: WinInfo) => void];

export const useWinnerInfo = (): UseWinnerInfoReturn => {
  const [winnerInfo, setWinnerInfo] = useState<WinInfo>({
    winType: null,
    winner: null,
    loser: null,
    winPoints: null,
  });

  const setWinnerInfoValue = (value: WinInfo) => setWinnerInfo(value);

  return [winnerInfo, setWinnerInfoValue];
};
