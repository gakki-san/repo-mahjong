import { BackButton } from "@/features/scoreManagement/components/BackButton";
import { DecisionButton } from "@/features/scoreManagement/components/DecisionButton";
import { COLOR } from "@/features/scoreManagement/const/color";
import { ModalType } from "@/features/scoreManagement/hooks/useModalStack";
import { Player } from "@/features/scoreManagement/hooks/useScore";
import { WinInfo } from "@/features/scoreManagement/hooks/useWinnerinfo";
import { Box, Flex, HStack, RadioGroup } from "@chakra-ui/react";
import { ComponentProps, FC } from "react";

type InputLoserProps = {
  selectedWinner: number;
  setWinnerInfo: (value: Partial<WinInfo>) => void;
  playerName: string[];
  openModal: (type: Exclude<ModalType, null>) => void;
  closeModal: () => void;
};

export const InputLoser: FC<InputLoserProps> = ({
  selectedWinner,
  setWinnerInfo,
  playerName,
  openModal,
  closeModal,
}) => {
  const playersName = playerName.map((name, index) => ({
    label: name,
    value: index.toString(),
  }));

  const loserCandidate = playersName.filter(
    (item) => Number(item.value) !== selectedWinner,
  );

  const handleComplete = () => {
    openModal("loser");
  };

  const selectedLoser: ComponentProps<
    typeof RadioGroup.Root
  >["onValueChange"] = (event) => {
    const loser = Number(event.value) as Player;
    setWinnerInfo({
      loser: loser,
    });
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
      <Box
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
        display={"flex"}
        w={"80vw"}
        h={"80vh"}
        bg={COLOR.WHITE}
      >
        だれが放銃した？
        <RadioGroup.Root mt={"20px"} onValueChange={selectedLoser}>
          <HStack
            alignItems={"start"}
            flexDir={"column"}
            gap="6"
            display={"flex"}
          >
            {loserCandidate.map((item) => (
              <RadioGroup.Item key={item.value} value={item.value}>
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText textStyle="2xl">
                  {item.label}
                </RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </HStack>
        </RadioGroup.Root>
        <Flex gap={"20px"}>
          <DecisionButton handleDecisionButton={handleComplete} />
          <BackButton handleBack={handleBack} />
        </Flex>
      </Box>
    </Box>
  );
};
