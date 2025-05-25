import { CurrentDirection } from "../../hooks/useCurrentDirection";
import { Player } from "../../hooks/useScore";

// rotateされたcurrentDirectionとwinnerを受け取り、今回の勝者を示すnumberを返す
export const getWinnerIndexInRotateDirection = (
  rotateDirection: CurrentDirection[],
  winner: Player,
): Player => {
  return rotateDirection.indexOf(winner) as Player;
};
