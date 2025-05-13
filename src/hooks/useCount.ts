import { useState } from "react";

type useCountReturn = [number, SetUseCountAction];

type SetUseCountAction = {
  add: (prev: number) => void;
  reset: () => void;
};

const initialCount = 0;
export const useCount = (): useCountReturn => {
  const [count, setCount] = useState(initialCount);

  const action = {
    add: (prev: number) => setCount(prev + 1),
    reset: () => setCount(initialCount),
  };

  return [count, action];
};
