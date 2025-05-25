import { CurrentDirection } from "../../hooks/useCurrentDirection";

// direction(number)を受け取り、currentDirectionが0番目にくる連番配列を返す
export const genarateArrayDirection = (
  currentDirection: 0 | 1 | 2 | 3,
): CurrentDirection[] => {
  const base = [0, 1, 2, 3];
  return [
    ...base.slice(currentDirection),
    ...base.slice(0, currentDirection),
  ] as CurrentDirection[];
};
