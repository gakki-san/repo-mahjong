import { ComponentProps, FC } from "react";
import { Box, Flex, NumberInput } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagement/const/color.ts";
import { DecisionButton } from "@/features/scoreManagement/components/DecisionButton";
import { BackButton } from "@/features/scoreManagement/components/BackButton";

type InputWinPointProps = {
  handleComplete: () => void;
  handleWinPointChange: ComponentProps<
    typeof NumberInput.Root
  >["onValueChange"];
  closeModal: () => void;
};

export const InputWinPoint: FC<InputWinPointProps> = ({
  handleComplete,
  handleWinPointChange,
  closeModal,
}) => {
  const handleBack = () => {
    closeModal();
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
