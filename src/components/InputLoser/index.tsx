import { Dispatch, FC, SetStateAction } from "react";
import { Box, Button, HStack, RadioGroup } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { WinInfo } from "@/hooks/useWinnerinfo";
import { Player } from "@/hooks/useScore";
import { IsShowType } from "../ScoreSummary";

type InputLoserProps = {
  winnerInfo: WinInfo;
  setWinnerInfo: (value: Partial<WinInfo>) => void;
  ShowInputScore: () => void;
  setIsShow: Dispatch<SetStateAction<IsShowType>>;
};

export const InputLoser: FC<InputLoserProps> = ({
  winnerInfo,
  setWinnerInfo,
  ShowInputScore,
  setIsShow,
}) => {
  const items = [
    {
      label: "東家",
      value: "east",
    },
    {
      label: "南家",
      value: "south",
    },
    {
      label: "西家",
      value: "west",
    },
    {
      label: "北家",
      value: "north",
    },
  ];

  const loserCandidate = items.filter(
    (item) => item.value !== winnerInfo.winner,
  );

  const handleComplete = () => {
    if (winnerInfo.loser?.length === 2) return;
    setIsShow({ ron: false } as IsShowType);
    ShowInputScore();
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
          defaultValue="1"
          mt={"20px"}
          onValueChange={(event) => {
            const loser = [] as Player[];
            loser.push(event.value as Player);
            setWinnerInfo({
              loser: loser,
            });
          }}
        >
          <HStack flexDir={"column"} gap="6" display={"flex"}>
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
