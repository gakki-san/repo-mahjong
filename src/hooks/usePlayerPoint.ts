import { useState } from "react";

type usePlayerPointReturn = [
  playerPoint: number,
  setPoint: (point: number) => void,
];

export const usePlayerPoint = (): usePlayerPointReturn => {
  const [playerPoint, setPlayerPoint] = useState(0);

  const setPoint = (point: number) => setPlayerPoint(point);

  return [playerPoint, setPoint];
};
