import React, { useState } from "react";

export type UsePlayerNameReturn = [
  playersName: PlayerNames,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
];

export type PlayerNames = {
  player1: string;
  player2: string;
  player3: string;
  player4: string;
};

const initialName = {
  player1: "東家",
  player2: "北家",
  player3: "西家",
  player4: "南家",
};

export const usePlayerName = (): UsePlayerNameReturn => {
  const [playersName, setPlayerName] = useState<PlayerNames>(initialName);

  const action = (name: keyof PlayerNames, value: string) => {
    setPlayerName((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    action(name as keyof PlayerNames, value);
  };

  return [playersName, handleChange];
};
