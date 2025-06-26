import { useState } from "react";

export type ReachFlags = {
  0: boolean;
  1: boolean;
  2: boolean;
  3: boolean;
};

export const initialReachFlags: ReachFlags = {
  0: false,
  1: false,
  2: false,
  3: false,
};

export type PlayerIndex = 0 | 1 | 2 | 3;

export type SetReachFlagsReturn = {
  update: (updater: (prev: ReachFlags) => ReachFlags) => void;
  replace: (list: ReachFlags) => void;
  toggle: (player: PlayerIndex) => void;
  reset: () => void;
};

export type useReachFlagsReturn = [
  reachFlags: ReachFlags,
  actions: SetReachFlagsReturn,
];

export const useReachFlags = (): useReachFlagsReturn => {
  const [reachFlags, setReachFlags] = useState<ReachFlags>(initialReachFlags);

  const actions = {
    update: (updater: (prev: ReachFlags) => ReachFlags) => {
      setReachFlags(updater);
    },
    replace: (list: ReachFlags) => setReachFlags(list),
    toggle: (player: PlayerIndex) =>
      setReachFlags((prev) => ({
        ...prev,
        [player]: !prev[player],
      })),
    reset: () => setReachFlags(initialReachFlags),
  };

  return [reachFlags, actions] as const;
};
