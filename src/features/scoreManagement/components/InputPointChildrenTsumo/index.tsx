import { ComponentProps, FC } from "react";
import { Box, Flex, NumberInput } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagement/const/color.ts";
import { DecisionButton } from "@/features/scoreManagement/components/DecisionButton";
import { BackButton } from "@/features/scoreManagement/components/BackButton";

type InputChildrenTsumoProps = {
  handleChildrenPoint: ComponentProps<typeof NumberInput.Root>["onValueChange"];
  handleParentPoint: ComponentProps<typeof NumberInput.Root>["onValueChange"];
  handleSetScore: () => void;
  closeModal: () => void;
};

export const InputPointChildrenTsumo: FC<InputChildrenTsumoProps> = ({
  handleChildrenPoint,
  handleParentPoint,
  handleSetScore,
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
      子
      <NumberInput.Root
        onValueChange={handleChildrenPoint}
        w={"200px"}
        margin={"10px 0px 40px 0px"}
        max={48000}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      親
      <NumberInput.Root
        onValueChange={handleParentPoint}
        w={"200px"}
        max={48000}
        mt={"20px"}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      <Flex gap={"20px"}>
        <DecisionButton handleDecisionButton={handleSetScore} />
        <BackButton handleBack={handleBack} />
      </Flex>
    </Box>
  );
};
