import { ComponentProps, FC } from "react";
import { Box, Button, Flex, NumberInput } from "@chakra-ui/react";
import { COLOR } from "@/const/color";

type InputWinPointProps = {
  handleComplete: () => void;
  handleWinPointChange: ComponentProps<
    typeof NumberInput.Root
  >["onValueChange"];
  closeInputWinnerPoint: () => void;
};

export const InputWinPoint: FC<InputWinPointProps> = ({
  handleComplete,
  handleWinPointChange,
  closeInputWinnerPoint,
}) => {
  const handleBack = () => {
    closeInputWinnerPoint();
  };
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
        max={48000}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      <Flex gap={"20px"}>
        <Button
          textStyle="1xl"
          mt={"50px"}
          fontWeight="bold"
          onClick={handleComplete}
          paddingInline={"50px"}
        >
          決定
        </Button>
        <Button
          mt={"50px"}
          color={COLOR.WHITE}
          fontWeight={"bold"}
          bg={COLOR.BLACK}
          onClick={handleBack}
          paddingInline={"50px"}
        >
          戻る
        </Button>
      </Flex>
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
