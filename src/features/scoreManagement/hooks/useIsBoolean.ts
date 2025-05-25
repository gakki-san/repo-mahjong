import { useState } from "react";

type UseIsBooleanReturn = [
  boolean,
  {
    on: () => void;
    off: () => void;
    toggle: () => void;
  },
];

export const useIsBoolean = (
  initialValue: boolean = false,
): UseIsBooleanReturn => {
  const [isBoolean, setIsBoolean] = useState(initialValue);

  const action = {
    on: () => setIsBoolean(true),
    off: () => setIsBoolean(false),
    toggle: () => setIsBoolean((prev) => !prev),
  };

  return [isBoolean, action];
};
