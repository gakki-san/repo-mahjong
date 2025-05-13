import { useState } from "react";

export type CurrentDirection = 0 | 1 | 2 | 3;

type UseSetCurrentDirection = {
  set: (value: CurrentDirection) => void;
  rotate: () => void;
};

type UseCurrentDirection = [CurrentDirection, UseSetCurrentDirection];

const infintyDirection = 0 as CurrentDirection;

// 現在の上側にいるdirection(number)を示す。setでrotateする。
export const useCurrentDirection = (): UseCurrentDirection => {
  const [currentDirection, setCurrentDirection] = useState(infintyDirection);

  const action = {
    set: (value: CurrentDirection) => setCurrentDirection(value),
    rotate: () =>
      setCurrentDirection((prev) =>
        prev === 3 ? 0 : ((prev + 1) as CurrentDirection),
      ),
  };

  return [currentDirection, action];
};
