import { Player } from "@/hooks/useScore";

export const playReachAudio = (player: Player, setIsPopupClose: () => void) => {
  const audio = new Audio("public/audio.mp3");
  audio.addEventListener("ended", () => {
    setIsPopupClose();
    console.log("動いている");
  });
  console.log("ここにはきてる");

  if (player !== 1) {
    audio.play();
  } else {
    setTimeout(() => {
      setIsPopupClose();
    }, 3000);
  }
};
