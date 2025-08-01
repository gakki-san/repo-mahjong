import {
  PlayerIndex,
  ReachFlags,
  SetReachFlagsReturn,
} from "@/features/scoreManagementV2/hooks/useReachFlags.ts";
import { ModalType } from "@/features/scoreManagementV2/hooks/useModalStack.ts";
import React, { useCallback } from "react";
import { useScoreAtom } from "@/globalState/scoreAtom.ts";

type UseHandleReachProps = {
  reachFlags: ReachFlags;
  setReachFlags: SetReachFlagsReturn;
  openModal: (type: Exclude<ModalType, null>) => void;
  closeModal: () => void;
  setReachPlayer: (player: number) => void;
  reachPlayer: number;
};

export const useHandleReach = ({
  reachFlags,
  setReachFlags,
  openModal,
  closeModal,
  setReachPlayer,
  reachPlayer,
}: UseHandleReachProps) => {
  const [score, { set: setScore }] = useScoreAtom();

  const handleReach = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const reachPlayer = Number(event.currentTarget.value) as PlayerIndex;
      setReachPlayer(reachPlayer);
      if (reachFlags[reachPlayer]) {
        const audio = new Audio("/dio.mp3");
        audio.play();
        openModal("reachConfirm");
      } else {
        openModal("reachVideo");
        const audio = new Audio("/audio.mp3");
        audio.play();
        audio.addEventListener("ended", () => {
          closeModal();
        });
        setReachFlags.toggle(reachPlayer);
        const newScore = [...score];
        newScore[reachPlayer] -= 1000;
        setScore(newScore);
      }
    },
    [
      reachFlags,
      setReachFlags,
      openModal,
      closeModal,
      setReachPlayer,
      score,
      setScore,
    ],
  );

  const handleResetReach = useCallback(() => {
    setReachFlags.toggle(reachPlayer as PlayerIndex);
    const newScore = [...score];
    newScore[reachPlayer] += 1000;
    setScore(newScore);
    closeModal();
  }, [setReachFlags, reachPlayer, score, setScore, closeModal]);

  return { handleReach, handleResetReach };
};
