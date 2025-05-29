import { Box, Button, HStack, RadioGroup } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { WinInfo } from "@/hooks/useWinnerinfo";
import { Player } from "@/hooks/useScore";
import { ComponentProps, FC } from "react";

type InputLoserProps = {
  selectedWinner: number;
  setWinnerInfo: (value: Partial<WinInfo>) => void;
  ShowInputScore: () => void;
  setIsOpen: () => void;
  playerName: string[];
};

export const InputLoser: FC<InputLoserProps> = ({
  selectedWinner,
  setWinnerInfo,
  ShowInputScore,
  setIsOpen,
  playerName,
}) => {
  const playersName = playerName.map((name, index) => ({
    label: name,
    value: index.toString(),
  }));

  const loserCandidate = playersName.filter(
    (item) => Number(item.value) !== selectedWinner,
  );

  const handleComplete = () => {
    setIsOpen();
    ShowInputScore();
  };

  const selectedLoser: ComponentProps<
    typeof RadioGroup.Root
  >["onValueChange"] = (event) => {
    const loser = Number(event.value) as Player;
    console.log("loser", loser);

    setWinnerInfo({
      loser: loser,
    });
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
        <Button
          textStyle="1xl"
          mt={"50px"}
          fontWeight="bold"
          border={"solid"}
          onClick={handleComplete}
          paddingInline={"50px"}
        >
          決定
        </Button>
      </Box>
    </Box>
  );
};
