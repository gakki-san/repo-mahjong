import { FC } from "react";
import { Box, Button, HStack, RadioGroup } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { Player } from "@/hooks/useScore";
import { WinInfo } from "@/hooks/useWinnerinfo";

type InputWinTypeProps = {
  winnerInfo: WinInfo;
  setWinnerInfo: (value: Partial<WinInfo>) => void;
  players: string[];
  // setSelectedWinType: (value: WinInfo["winType"]) => void;
  setIsOpen: () => void;
};

export const InputWinType: FC<InputWinTypeProps> = ({
  winnerInfo,
  setWinnerInfo,
  players,
  setIsOpen,
}) => {
  const items = [
    {
      label: "ロン",
      value: "ron",
    },
    {
      label: "ツモ",
      value: "tsumo",
    },
  ];

  const isClickedWinner = winnerInfo.winner;

  const handleDesideWinType = () => {
    if (winnerInfo.winType === "tsumo") {
      const loser = players.filter(
        (item) => item !== isClickedWinner,
      ) as Player[];
      console.log(loser);
      setWinnerInfo({
        loser: loser,
      });
    }
    const loser = players.filter(
      (item) => item !== isClickedWinner,
    ) as Player[];
    console.log(loser);
    setWinnerInfo({
      loser: loser,
    });
    setIsOpen();
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
        onValueChange={(event) => {
          const winType = event.value as "tsumo" | "ron";
          setWinnerInfo({
            winType: winType,
          });
        }}
      >
        <HStack flexDir={"column"} gap="6" display={"flex"}>
          {items.map((item) => (
            <RadioGroup.Item key={item.value} value={item.value}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </HStack>
      </RadioGroup.Root>
      <Button
        textStyle="1xl"
        mt={"50px"}
        fontWeight="bold"
        onClick={handleDesideWinType}
        paddingInline={"50px"}
      >
        決定
      </Button>
    </Box>
  );
};
