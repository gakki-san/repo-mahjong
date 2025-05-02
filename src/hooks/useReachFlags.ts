import { useState } from "react";

type ReachFlagsProps = {
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

export const useReachFlags = () => {
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
