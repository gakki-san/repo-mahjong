import { FC } from "react";
import { Box, Button, NumberInput } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { WinInfo } from "@/hooks/useWinnerinfo";

type InputWinPointProps = {
  handleComplete: () => void;
  setWinnerInfo: (value: Partial<WinInfo>) => void;
};

export const InputWinPoint: FC<InputWinPointProps> = ({
  handleComplete,
  setWinnerInfo,
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
        onValueChange={(event) => {
          const winnerPoint = event.valueAsNumber;
          setWinnerInfo({
            winPoints: winnerPoint,
          });
        }}
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
