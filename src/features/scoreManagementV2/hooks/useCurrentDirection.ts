import { useState } from "react";
import { Player } from "@/features/scoreManagementV2/hooks/useScore.ts";

export type CurrentDirection = 0 | 1 | 2 | 3;

type UseSetCurrentDirection = {
  set: (value: CurrentDirection) => void;
  rotate: () => void;
  toArray: () => Player[];
  rotateByWinResult: (winner: Player) => void;
};

type UseCurrentDirection = [CurrentDirection, UseSetCurrentDirection];

const INITIAL_DIRECTION = 0 as CurrentDirection;

// 現在の上側にいるdirection(number)を示す。setでrotateする。
export const useCurrentDirection = (): UseCurrentDirection => {
  const [currentDirection, setCurrentDirection] = useState(INITIAL_DIRECTION);

  const action: UseSetCurrentDirection = {
    set: (value) => setCurrentDirection(value),
    rotate: () =>
      setCurrentDirection((prev) =>
        prev === 3 ? 0 : ((prev + 1) as CurrentDirection),
      ),
    rotateByWinResult: (winner: Player) => {
      const isChildren = action.toArray().indexOf(0) !== winner;
      if (isChildren) {
        action.rotate();
      }
    },
    toArray: () => {
      const base = [0, 1, 2, 3];
      return base
        .slice(currentDirection)
        .concat(base.slice(0, currentDirection)) as Player[];
    },
  };

  return [currentDirection, action];
};
