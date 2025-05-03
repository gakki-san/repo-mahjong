import { WinInfo } from "@/hooks/useWinnerinfo";

export const closeAllModal = (
  setWinnerInfo: (value: Partial<WinInfo>) => void,
  setIsClose: () => void,
  setIsShowInputScoreClose: () => void,
) => {
  setWinnerInfo({
    winType: null,
    winner: null,
    loser: null,
    winPoints: null,
  });
  setIsClose();
  setIsShowInputScoreClose();
};
