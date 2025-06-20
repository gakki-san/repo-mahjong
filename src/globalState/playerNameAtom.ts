import { atomWithStorage } from "jotai/utils";

export type PlayerNames = {
  player1: string;
  player2: string;
  player3: string;
  player4: string;
};

const initialName: PlayerNames = {
  player1: "東家",
  player2: "北家",
  player3: "西家",
  player4: "南家",
};

export const playerNameAtom = atomWithStorage<PlayerNames>(
  "playerNames",
  initialName,
);
