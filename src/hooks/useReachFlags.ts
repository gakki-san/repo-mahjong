import { useState } from "react";

export type ReachFlagsProps = {
  east: boolean;
  south: boolean;
  west: boolean;
  north: boolean;
};

const initialReachFlags: ReachFlagsProps = {
  east: false,
  south: false,
  west: false,
  north: false,
};

export type SetReachFlagsReturn = {
  update: (updater: (prev: ReachFlagsProps) => ReachFlagsProps) => void;
  replace: (list: ReachFlagsProps) => void;
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
  };

  return [reachFlags, actions] as const;
};
