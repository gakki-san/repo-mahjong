import { ComponentProps, FC } from "react";
import { Box, Flex, NumberInput } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { DecisionButton } from "../DecisionButton";
import { BackButton } from "../BackButton";

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
        <DecisionButton handleDecisionButton={handleComplete} />
        <BackButton handleBack={handleBack} />
      </Flex>
    </Box>
  );
};
