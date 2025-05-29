import { ReachFlagsProps } from "@/hooks/useReachFlags";

export const countReachPlayers = (reachPlayer: ReachFlagsProps) => {
  const countReachPlayer = Object.values(reachPlayer).filter(
    (player) => player === true,
  ).length;
  return countReachPlayer;
};
