import { useState } from "react";

type useCountReturn = [number, SetUseCountAction];

type SetUseCountAction = {
  increment: () => void;
  reset: () => void;
  add: (num: number) => void;
};

const initialCount = 0;
export const useCount = (): useCountReturn => {
  const [count, setCount] = useState(initialCount);

  const action = {
    increment: () => {
      setCount(count + 1);
    },
    reset: () => setCount(initialCount),
    add: (num: number) => setCount(num),
  };

  return [count, action];
};
