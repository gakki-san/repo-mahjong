import { ComponentProps, FC } from "react";
import { Flex, NumberInput } from "@chakra-ui/react";
import { DecisionButton } from "@/features/scoreManagementV2/components/DecisionButton";
import { BackButton } from "@/features/scoreManagementV2/components/BackButton";
import { WinInfo } from "@/features/scoreManagementV2/hooks/useWinnerinfo.ts";
import { ModalView } from "@/features/scoreManagementV2/components/ModalView";

type InputWinPointProps = {
  handleBack: () => void;
  setPoint: (value: Partial<WinInfo>) => void;
  handleCloseInputPoint: () => void;
};

export const InputWinPoint: FC<InputWinPointProps> = ({
  handleBack,
  setPoint,
  handleCloseInputPoint,
}) => {
  const handleWinPointChange: ComponentProps<
    typeof NumberInput.Root
  >["onValueChange"] = (event) => {
    const point = Number(event.value);
    setPoint({ winPoints: point });
  };

  return (
    <ModalView>
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
        <DecisionButton handleDecisionButton={handleCloseInputPoint} />
        <BackButton handleBack={handleBack} />
      </Flex>
    </ModalView>
  );
};
