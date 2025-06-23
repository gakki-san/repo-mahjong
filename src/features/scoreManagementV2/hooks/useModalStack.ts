import { useState } from "react";

export type ModalType =
  | null
  | "winType"
  | "finishWinType"
  | "winPoint"
  | "childrenTsumo"
  | "loser"
  | "reachConfirm"
  | "reachVideo"
  | "tempai"
  | "finish"
  | "appearanceScore";

type UseModalStackReturn = [currentModal: ModalType, actions: useModalActions];

export type useModalActions = {
  openModal: (type: Exclude<ModalType, null>) => void;
  closeModal: () => void;
  resetModal: () => void;
};

export const useModalStack = (): UseModalStackReturn => {
  const [modalStack, setModalStack] = useState<ModalType[]>([]);
  const currentModal =
    modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;

  const actions = {
    openModal: (type: Exclude<ModalType, null>) => {
      setModalStack((current) => [...current, type]);
    },
    closeModal: () => {
      setModalStack((current) => current.slice(0, -1));
    },
    resetModal: () => {
      setModalStack([]);
    },
  };

  return [currentModal, actions];
};
