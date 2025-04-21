import { FC } from "react";
import { Box, Text, Flex, NativeSelect, Button } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { SCORE } from "@/const/score";
import { useScore } from "@/hooks/useScore";

type ScoreSelectPanelProps = {
  close: () => void;
};

export const ScoreSelectPanel: FC<ScoreSelectPanelProps> = ({ close }) => {
  const [score, setScore] = useScore();

  const handleSetScore = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectScore = Number(event.currentTarget.value);
    setDefaultScore(selectScore);
  };
  const setDefaultScore = (selectScore: number) => {
    if (!selectScore) return;
    const isRuleFour = selectScore === SCORE.FOUR_PLAYER_RULE;
    const playerCount = isRuleFour ? 4 : 3;
    setScore.set(Array(playerCount).fill(selectScore));
  };

  const completeButton = () => {
    if (score === null) {
      return alert("点数を選択してください");
    }
    close();
  };

  return (
    <Box>
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
            onChange={(event) => handleSetScore(event)}
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
