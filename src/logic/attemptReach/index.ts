import { ReachFlagsProps } from "@/hooks/useReachFlags";
import { Player } from "@/hooks/useScore";

export const playReachAudio = (
  player: Player,
  setIsPopupClose: () => void,
  setReachFlags: (updater: (prev: ReachFlagsProps) => ReachFlagsProps) => void,
) => {
  const audio = new Audio("/audio.mp3");

  if (player !== 1) {
    audio.play();
  } else {
    setTimeout(() => {
      setIsPopupClose();
    }, 6000);
  }

  audio.addEventListener("ended", () => {
    setIsPopupClose();
  });

  setReachFlags((prev) => ({
    ...prev,
    [player]: true,
  }));
};
