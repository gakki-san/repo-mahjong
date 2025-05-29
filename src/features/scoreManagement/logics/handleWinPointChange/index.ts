import { WinInfo } from "../../hooks/useWinnerinfo";
import { NumberInput } from "@chakra-ui/react";
import { ComponentProps } from "react";

type OnValueChange = ComponentProps<typeof NumberInput.Root>["onValueChange"];

type HandleWinPointChange = (
  setWinnerInfo: (value: Partial<WinInfo>) => void,
) => OnValueChange;

export const handleWinPointChange: HandleWinPointChange = (setWinnerInfo) => {
  return (event) => {
    const winnerPoint = event.valueAsNumber;
    setWinnerInfo({
      winPoints: winnerPoint,
    });
  };
};
