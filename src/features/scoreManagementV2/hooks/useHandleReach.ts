import {
  PlayerIndex,
  ReachFlagsProps,
  SetReachFlagsReturn,
} from "@/features/scoreManagementV2/hooks/useReachFlags.ts";
import { ModalType } from "@/features/scoreManagementV2/hooks/useModalStack.ts";
import React, { useCallback } from "react";

type UseHandleReachProps = {
  reachFlags: ReachFlagsProps;
  setReachFlags: SetReachFlagsReturn;
  openModal: (type: Exclude<ModalType, null>) => void;
  closeModal: () => void;
};

export const useHandleReach = ({
  reachFlags,
  setReachFlags,
  openModal,
  closeModal,
}: UseHandleReachProps) => {
  const handleReach = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const reachPlayer = Number(event.currentTarget.value) as PlayerIndex;
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
          setReachFlags.toggle(reachPlayer);
        });
      }
    },
    [reachFlags, setReachFlags, openModal, closeModal],
  );

  return { handleReach };
};
