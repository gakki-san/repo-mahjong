import { useState } from "react";

export type ReachFlagsProps = {
  0: boolean;
  1: boolean;
  2: boolean;
  3: boolean;
};

export const initialReachFlags: ReachFlagsProps = {
  0: false,
  1: false,
  2: false,
  3: false,
};

export type PlayerIndex = 0 | 1 | 2 | 3;

export type SetReachFlagsReturn = {
  update: (updater: (prev: ReachFlagsProps) => ReachFlagsProps) => void;
  replace: (list: ReachFlagsProps) => void;
  toggle: (player: PlayerIndex) => void;
  reset: () => void;
};

export type useReachFlagsReturn = [
  reachFlags: ReachFlagsProps,
  actions: SetReachFlagsReturn,
];

export const useReachFlags = (): useReachFlagsReturn => {
  const [reachFlags, setReachFlags] =
    useState<ReachFlagsProps>(initialReachFlags);

  const actions = {
    update: (updater: (prev: ReachFlagsProps) => ReachFlagsProps) => {
      setReachFlags(updater);
    },
    replace: (list: ReachFlagsProps) => setReachFlags(list),
    toggle: (player: PlayerIndex) =>
      setReachFlags((prev) => ({
        ...prev,
        [player]: !prev[player],
      })),
    reset: () => setReachFlags(initialReachFlags),
  };

  return [reachFlags, actions] as const;
};
