import { useState } from "react";

export type ModalType =
  | null
  | "winType"
  | "winPoint"
  | "childrenTsumo"
  | "loser"
  | "reachConfirm"
  | "reachVideo"
  | "tempai"
  | "finish"
  | "appearanceScore";

type UseModalStackReturn = [currentModal: ModalType, actions: Actions];

type Actions = {
  openModal: (type: Exclude<ModalType, null>) => void;
  closeModal: () => void;
  reset: () => void;
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
    reset: () => {
      setModalStack([]);
    },
  };

  return [currentModal, actions];
};
