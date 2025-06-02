import { ComponentProps, FC } from "react";
import { Box, Flex, HStack, RadioGroup } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import { DecisionButton } from "@/features/scoreManagementV2/components/DecisionButton";
import { BackButton } from "@/features/scoreManagementV2/components/BackButton";
import { Player } from "@/features/scoreManagementV2/hooks/useScore.ts";
import { WinInfo } from "@/features/scoreManagementV2/hooks/useWinnerinfo.ts";
import { useModalActions } from "@/features/scoreManagementV2/hooks/useModalStack.ts";

type SelectLoserProps = {
  winnerInfo: WinInfo;
  setWinnerInfo: (value: Partial<WinInfo>) => void;
  playerName: string[];
  openModal: useModalActions["openModal"];
  handleBack: useModalActions["closeModal"];
};

export const SelectLoser: FC<SelectLoserProps> = ({
  winnerInfo,
  setWinnerInfo,
  playerName,
  openModal,
  handleBack,
}) => {
  const selectedLoser: ComponentProps<
    typeof RadioGroup.Root
  >["onValueChange"] = (event) => {
    const loser = Number(event.value) as Player;
    setWinnerInfo({
      loser: loser,
    });
  };

  const playersName = playerName.map((name, index) => ({
    label: name,
    value: index.toString(),
  }));

  const loserCandidate = playersName.filter(
    (item) => Number(item.value) !== winnerInfo.winner,
  );

  const handleNextModal = () => {
    openModal("loser");
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
        <RadioGroup.Root
          mt={"20px"}
          onValueChange={selectedLoser}
          defaultValue="0"
        >
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
          <DecisionButton handleDecisionButton={handleNextModal} />
          <BackButton handleBack={handleBack} />
        </Flex>
      </Box>
    </Box>
  );
};
