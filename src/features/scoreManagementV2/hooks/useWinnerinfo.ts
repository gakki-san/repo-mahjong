import { useState } from "react";
import { Player } from "./useScore";

export type WinInfo = {
  winType: "tsumo" | "ron" | null;
  winner: Player | null;
  loser: Player | null;
  winPoints: number | null;
};

type UseWinnerInfoReturn = [WinInfo, (value: Partial<WinInfo>) => void];

export const useWinnerInfo = (): UseWinnerInfoReturn => {
  const [winnerInfo, setWinnerInfo] = useState<WinInfo>({
    winType: null,
    winner: null,
    loser: null,
    winPoints: null,
  });

  const updateWinnerInfo = (value: Partial<WinInfo>) => {
    setWinnerInfo((prev) => ({
      ...prev,
      ...value,
    }));
  };

  return [winnerInfo, updateWinnerInfo];
};
