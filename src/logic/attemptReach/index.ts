import { ReachFlagsProps } from "@/hooks/useReachFlags";
import { Player } from "@/hooks/useScore";

export const playReachAudio = (
  player: Player,
  setIsPopupClose: () => void,
  setReachFlags: (updater: (prev: ReachFlagsProps) => ReachFlagsProps) => void,
) => {
  // const audio = new Audio("/audio.mp3");
  const audio =
    player !== 1 ? new Audio("/audio.mp3") : new Audio("/atmic.mp3");

  audio.play();

  audio.addEventListener("ended", () => {
    setIsPopupClose();
  });

  setReachFlags((prev) => ({
    ...prev,
    [player]: true,
  }));
};
