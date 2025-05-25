import { ComponentProps, FC } from "react";
import { Box, Flex, HStack, RadioGroup } from "@chakra-ui/react";
import { DecisionButton } from "../DecisionButton";
import { BackButton } from "../BackButton";
import { WinInfo } from "../../hooks/useWinnerinfo";
import { ModalType } from "../../hooks/useModalStack";
import { COLOR } from "../../const/color";

type InputWinTypeProps = {
  winnerInfo: WinInfo;
  setWinnerInfo: (value: Partial<WinInfo>) => void;
  openModal: (type: Exclude<ModalType, null>) => void;
  closeModal: () => void;
};

export const InputWinType: FC<InputWinTypeProps> = ({
  winnerInfo,
  setWinnerInfo,
  openModal,
  closeModal,
}) => {
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

  // const isClickedWinner = winnerInfo.winner;

  const handleWinTypeChange: ComponentProps<
    typeof RadioGroup.Root
  >["onValueChange"] = (event) => {
    const winType = event.value as "tsumo" | "ron";
    setWinnerInfo({
      winType: winType,
    });
  };

  const handleDecideWinType = () => {
    openModal("winPoint");
  };

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
      <RadioGroup.Root
        defaultValue="tsumo"
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
    </Box>
  );
};
