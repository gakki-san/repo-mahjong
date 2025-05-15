import { useState } from "react";

type useCountReturn = [number, SetUseCountAction];

type SetUseCountAction = {
  increment: (prev: number) => void;
  reset: () => void;
  add: (num: number) => void;
};

const initialCount = 0;
export const useCount = (): useCountReturn => {
  const [count, setCount] = useState(initialCount);

  const action = {
    increment: (prev: number) => setCount(prev + 1),
    reset: () => setCount(initialCount),
    add: (num: number) => setCount(num),
  };

  return [count, action];
};
