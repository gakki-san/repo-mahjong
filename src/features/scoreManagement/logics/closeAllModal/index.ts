import { initialReachFlags, ReachFlagsProps } from "../../hooks/useReachFlags";
import { WinInfo } from "../../hooks/useWinnerinfo";

export const closeAllModal = (
  setWinnerInfo: (value: Partial<WinInfo>) => void,
  resetReachFlags: (list: ReachFlagsProps) => void,
) => {
  setWinnerInfo({
    winType: null,
    winner: null,
    loser: null,
    winPoints: null,
  });
  resetReachFlags(initialReachFlags);
};
