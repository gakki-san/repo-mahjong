import { ComponentProps, FC } from "react";
import { Box, Button, NumberInput } from "@chakra-ui/react";
import { COLOR } from "@/const/color";

type InputWinPointProps = {
  handleComplete: () => void;
  handleWinPointChange: ComponentProps<
    typeof NumberInput.Root
  >["onValueChange"];
};

export const InputWinPoint: FC<InputWinPointProps> = ({
  handleComplete,
  handleWinPointChange,
}) => {
  return (
    <Box
      pos={"absolute"}
      top={0}
      alignItems={"center"}
      justifyContent={"center"}
      flexDir={"column"}
      display={"flex"}
      w={"100vw"}
      h={"100vh"}
      bg={COLOR.GREEN_PRIMARY}
    >
      点数入力
      <NumberInput.Root
        onValueChange={handleWinPointChange}
        w={"200px"}
        min={300}
        max={48000}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      <Button
        textStyle="1xl"
        mt={"50px"}
        fontWeight="bold"
        onClick={handleComplete}
        paddingInline={"50px"}
      >
        決定
      </Button>
    </Box>
  );
};

// const PLAYER = {
//   EAST: "east",
//   SOUTH: "south",
// } as const;

// type ValueOf<T> = T[keyof T]
// type Player = ValueOf<typeof PLAYER>

// const players = Object.values(PLAYER)
