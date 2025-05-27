import { useState } from "react";

type useDiceReturn = [dice: number[], rollBoth: () => void];

export const useDice = (): useDiceReturn => {
  const [dice, setDice] = useState<[number, number]>([1, 1]);

  const rollOne = () => Math.floor(Math.random() * 6) + 1;

  const rollBoth = () => {
    setDice([rollOne(), rollOne()]);
  };

  return [dice, rollBoth];
};
