import React from "react";
import { useAtom } from "jotai";
import { playerNameAtom } from "@/globalState/playerNameAtom.ts";

export type UsePlayerNameReturn = [
  playersName: string[],
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
];

export type PlayerNames = {
  player1: string;
  player2: string;
  player3: string;
  player4: string;
};

export const usePlayerName = (): UsePlayerNameReturn => {
  const [playersName, setPlayerName] = useAtom(playerNameAtom);

  const action = (name: keyof PlayerNames, value: string) => {
    setPlayerName((prev: PlayerNames) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    action(name as keyof PlayerNames, value);
  };

  const playerName = Object.values(playersName);

  return [playerName, handleChange];
};
