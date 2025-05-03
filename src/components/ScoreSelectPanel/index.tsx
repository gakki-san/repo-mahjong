import { FC } from "react";
import { Box, Text, Flex, NativeSelect, Button } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { SCORE } from "@/const/score";
import { ScoreMap } from "@/hooks/useScore";

type ScoreSelectPanelProps = {
  close: () => void;
  score: ScoreMap | null;
  setScore: (value: ScoreMap) => void;
};

export const ScoreSelectPanel: FC<ScoreSelectPanelProps> = ({
  close,
  score,
  setScore,
}) => {
  const handleSetScore = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectScore = Number(event.currentTarget.value);
    setScoreForAllPlayers(selectScore);
  };
  const setScoreForAllPlayers = (selectScore: number) => {
    if (!selectScore) return;
    const isRuleFour = selectScore === SCORE.FOUR_PLAYER_RULE;
    const seats = isRuleFour ? SCORE.FOUR_RULE : SCORE.THREE_RULR;
    const newScore = new Array(seats).fill(selectScore);
    setScore(newScore as ScoreMap);
  };

  const alertScoreNotSelected = () => {
    alert("点数を選択してください");
  };
  const completeButton = () => {
    if (score === null) {
      alertScoreNotSelected();
    } else {
      close();
    }
  };

  return (
    <Box w={"100vw"} h={"100vh"} bgColor={"#a4ffd0"}>
      <Box>
        <Text
          textStyle="3xl"
          pt={"50px"}
          fontWeight="bold"
          textAlign={"center"}
        >
          点数を入力してください
        </Text>
      </Box>
      <Flex justify="center" mt={"20px"}>
        <NativeSelect.Root
          w="240px"
          key={"num"}
          size={"md"}
          backgroundColor={COLOR.WHITE}
        >
          <NativeSelect.Field
            placeholder="点数を選択してください"
            onChange={handleSetScore}
          >
            <option value="25000" aria-setsize={20}>
              25000
            </option>
            <option value="35000" style={{ fontSize: "20px" }}>
              35000
            </option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Flex>
      <Flex justify={"center"} mt={"20px"}>
        <Button onClick={completeButton}>完了</Button>
      </Flex>
    </Box>
  );
};
