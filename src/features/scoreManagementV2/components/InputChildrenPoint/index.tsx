import { FC } from "react";
import { Box, Flex, NumberInput } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import { DecisionButton } from "@/features/scoreManagementV2/components/DecisionButton";
import { BackButton } from "@/features/scoreManagementV2/components/BackButton";
import { useCount } from "@/features/scoreManagementV2/hooks/useCount.ts";

type InputChildrenPointProps = {
  handleBack: () => void;
  handleCloseInputPoint: (children: number, parent: number) => void;
};

export const InputChildrenPoint: FC<InputChildrenPointProps> = ({
  handleBack,
  handleCloseInputPoint,
}) => {
  const [childrenPoint, { add: setChildrenPoint }] = useCount();
  const [parentPoint, { add: setParentPoint }] = useCount();

  const handlePointChange =
    (setter: (point: number) => void) => (event: { value: string }) => {
      const point = Number(event.value);
      setter(point);
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
        onValueChange={handlePointChange(setChildrenPoint)}
        w={"200px"}
        margin={"10px 0px 40px 0px"}
        max={48000}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      親
      <NumberInput.Root
        onValueChange={handlePointChange(setParentPoint)}
        w={"200px"}
        max={48000}
        mt={"20px"}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      <Flex gap={"20px"}>
        <DecisionButton
          handleDecisionButton={() =>
            handleCloseInputPoint(childrenPoint, parentPoint)
          }
        />
        <BackButton handleBack={handleBack} />
      </Flex>
    </Box>
  );
};
