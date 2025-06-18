import React from "react";
import { CurrentDirection } from "@/features/scoreManagementV2/hooks/useCurrentDirection.ts";
import { WinInfo } from "@/features/scoreManagementV2/hooks/useWinnerinfo.ts";
import { ModalType } from "@/features/scoreManagementV2/hooks/useModalStack.ts";
import { Player } from "@/features/scoreManagementV2/hooks/useScore.ts";

export const handleWinPlayer = (
  event: React.MouseEvent<HTMLButtonElement>,
  currentScore: number,
  setSelectedDirection: (direction: CurrentDirection) => void,
  setWinnerInfo: (value: Partial<WinInfo>) => void,
  openModal: (type: Exclude<ModalType, null>) => void,
) => {
  const selectedDirection = Number(
    event.currentTarget.value,
  ) as CurrentDirection;
  setSelectedDirection(selectedDirection);
  setWinnerInfo({ winner: currentScore as Player });
  openModal("winType");
};
