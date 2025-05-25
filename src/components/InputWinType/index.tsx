import { ComponentProps, FC } from "react";
import { Box, Flex, HStack, RadioGroup } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
// import { Player } from "@/hooks/useScore";
import { WinInfo } from "@/hooks/useWinnerinfo";
import { DecisionButton } from "../DecisionButton";
import { BackButton } from "../BackButton";

type InputWinTypeProps = {
  winnerInfo: WinInfo;
  setWinnerInfo: (value: Partial<WinInfo>) => void;
  players: string[];
  setIsOpen: () => void;
  setOffIsClickWinner: () => void;
};

export const InputWinType: FC<InputWinTypeProps> = ({
  winnerInfo,
  setWinnerInfo,
  // players,
  setIsOpen,
  setOffIsClickWinner,
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
    // setOffIsClickWinner();
    setIsOpen();
    // if (winnerInfo.winType === "tsumo") {
    //   const loser = Number(
    //     players.find((item) => Number(item) !== isClickedWinner),
    //   );
    //   setWinnerInfo({
    //     loser: loser as Player,
    //   });
    // }
  };

  const handleBack = () => {
    setOffIsClickWinner();
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
