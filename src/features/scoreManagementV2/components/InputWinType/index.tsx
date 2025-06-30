import { ComponentProps, FC } from "react";
import { Flex, HStack, RadioGroup } from "@chakra-ui/react";
import { DecisionButton } from "@/features/scoreManagementV2/components/DecisionButton";
import { BackButton } from "@/features/scoreManagementV2/components/BackButton";
import { WinInfo } from "@/features/scoreManagementV2/hooks/useWinnerinfo.ts";
import { ModalType } from "@/features/scoreManagementV2/hooks/useModalStack.ts";
import { ModalView } from "@/features/scoreManagementV2/components/ModalView";

type InputWinTypeProps = {
  winnerInfo: WinInfo;
  setWinnerInfo: (value: Partial<WinInfo>) => void;
  openModal: (type: Exclude<ModalType, null>) => void;
  handleBack: () => void;
};

export const InputWinType: FC<InputWinTypeProps> = ({
  winnerInfo,
  setWinnerInfo,
  openModal,
  handleBack,
}) => {
  const handleWinTypeChange: ComponentProps<
    typeof RadioGroup.Root
  >["onValueChange"] = (event) => {
    const winType = event.value as "tsumo" | "ron";
    setWinnerInfo({
      winType: winType,
    });
  };
  const handleDecideWinType = () => {
    openModal("finishWinType");
  };

  const winTypes = [
    {
      label: "ロン",
      value: "ron",
    },
    {
      label: "ツモ",
      value: "tsumo",
    },
  ];

  return (
    <ModalView>
      <RadioGroup.Root
        defaultValue={"0"}
        value={winnerInfo.winType}
        onValueChange={handleWinTypeChange}
      >
        <HStack flexDir={"column"} gap="6" display={"flex"}>
          {winTypes.map((item) => (
            <RadioGroup.Item key={item.value} value={item.value}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </HStack>
      </RadioGroup.Root>
      <Flex gap={"20px"}>
        <DecisionButton handleDecisionButton={handleDecideWinType} />
        <BackButton handleBack={handleBack} />
      </Flex>
    </ModalView>
  );
};
