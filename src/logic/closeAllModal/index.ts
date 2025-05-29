import { initialReachFlags, ReachFlagsProps } from "@/hooks/useReachFlags";
import { WinInfo } from "@/hooks/useWinnerinfo";

export const closeAllModal = (
  setWinnerInfo: (value: Partial<WinInfo>) => void,
  setIsClose: () => void,
  setIsShowInputScoreClose: () => void,
  resetReachFlags: (list: ReachFlagsProps) => void,
  closeClickWinner: () => void,
) => {
  setWinnerInfo({
    winType: null,
    winner: null,
    loser: null,
    winPoints: null,
  });
  setIsClose();
  setIsShowInputScoreClose();
  resetReachFlags(initialReachFlags);
  closeClickWinner();
};
