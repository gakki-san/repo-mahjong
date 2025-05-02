import { Player } from "@/hooks/useScore";

export const playReachAudio = (player: Player, setIsPopupClose: () => void) => {
  const audio = new Audio("public/audio.mp3");
  audio.addEventListener("ended", () => {
    setIsPopupClose();
  });

  if (player !== "south") {
    audio.play();
  } else {
    setTimeout(() => {
      setIsPopupClose();
    }, 3000);
  }
};
