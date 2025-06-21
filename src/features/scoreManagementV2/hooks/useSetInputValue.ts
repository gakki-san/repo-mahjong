import React, { useState } from "react";

type UseSetInputValueReturn = [
  string,
  (event: React.ChangeEvent<HTMLSelectElement>) => void,
];
export const useSetInputValue = (): UseSetInputValueReturn => {
  const [input, setInput] = useState("");

  const handleSetInputValue = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setInput(event.currentTarget.value);

  return [input, handleSetInputValue];
};
