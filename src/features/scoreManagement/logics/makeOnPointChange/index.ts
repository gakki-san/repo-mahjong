import { NumberInput } from "@chakra-ui/react";
import { ComponentProps } from "react";

export const makeOnPointChange =
  (
    setter: (value: number) => void,
  ): ComponentProps<typeof NumberInput.Root>["onValueChange"] =>
  (details) => {
    setter(details.valueAsNumber);
  };
