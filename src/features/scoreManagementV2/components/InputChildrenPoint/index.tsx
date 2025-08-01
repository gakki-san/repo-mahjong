import { FC } from "react";
import { Flex, NumberInput } from "@chakra-ui/react";
import { DecisionButton } from "@/features/scoreManagementV2/components/DecisionButton";
import { BackButton } from "@/features/scoreManagementV2/components/BackButton";
import { useCount } from "@/features/scoreManagementV2/hooks/useCount.ts";
import { ModalView } from "@/features/scoreManagementV2/components/ModalView";

type InputChildrenPointProps = {
  handleBack: () => void;
  handleCloseInputPoint: (children: number, parent: number) => void;
};

export const InputChildrenPoint: FC<InputChildrenPointProps> = ({
  handleBack,
  handleCloseInputPoint,
}) => {
  const [childrenPoint, { set: setChildrenPoint }] = useCount();
  const [parentPoint, { set: setParentPoint }] = useCount();

  const handlePointChange =
    (setter: (point: number) => void) => (event: { value: string }) => {
      const point = Number(event.value);
      setter(point);
    };

  return (
    <ModalView>
      子
      <NumberInput.Root
        onValueChange={handlePointChange(setChildrenPoint)}
        w={"200px"}
        margin={"10px 0px 40px 0px"}
        max={48000}
        min={0}
        aria-label={"子供の点数入力"}
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
        min={0}
        aria-label={"親の点数入力"}
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
    </ModalView>
  );
};
