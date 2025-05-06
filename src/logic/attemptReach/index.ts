import { Player } from "@/hooks/useScore";

export const playReachAudio = (player: Player, setIsPopupClose: () => void) => {
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
};
