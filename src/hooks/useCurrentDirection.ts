import { useState } from "react";

export type CurrentDirection = 0 | 1 | 2 | 3;

type UseCurrentDirection = [CurrentDirection, () => void];

const infintyDirection = 0 as CurrentDirection;

export const useCurrentDirection = (): UseCurrentDirection => {
  const [currentDirection, setCurrentDirection] = useState(infintyDirection);

  const rotateDirection = () => {
    setCurrentDirection((prev) =>
      prev === 3 ? 0 : ((prev + 1) as CurrentDirection),
    );
  };

  return [currentDirection, rotateDirection];
};
