import { FC } from "react";
import { Box, Text, Flex, NativeSelect, Button } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { SCORE } from "@/const/score";
import { ScoreMap } from "@/hooks/useScore";
import { useCount } from "@/hooks/useCount";

type ScoreSelectPanelProps = {
  close: () => void;
  score: ScoreMap;
  setScore: (value: ScoreMap) => void;
  openScoreSummary: () => void;
};

export const ScoreSelectPanel: FC<ScoreSelectPanelProps> = ({
  close,
  score,
  setScore,
  openScoreSummary,
}) => {
  const [returnPoint, setReturnPoint] = useCount();
  const [umaRule, setUmaRule] = useCount();
  const handleSetScore = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectScore = Number(event.currentTarget.value);
    setScoreForAllPlayers(selectScore);
  };

  const handleSetReturnPoint = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedPoint = Number(event.currentTarget.value);
    setReturnPoint.add(selectedPoint);
  };
  const handleSetUmaRule = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRuleNumber = Number(event.currentTarget.value);
    setUmaRule.add(selectedRuleNumber);
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
    if (score[0] === 0) {
      alertScoreNotSelected();
    } else {
      close();
      openScoreSummary();
    }
  };

  console.log("返す点数", returnPoint);
  console.log("uma", umaRule);

  return (
    <Box w={"100vw"} h={"100vh"} bgColor={COLOR.GREEN_PRIMARY}>
      <Box pt={"30px"}>
        <Text textStyle="1xl" fontWeight="bold" textAlign={"center"}>
          持ち点を選択してください
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
      <Box mt={"30px"}>
        <Text textStyle="1xl" fontWeight="bold" textAlign={"center"}>
          返す点数(オカ)を選択
        </Text>
      </Box>
      <Flex justify="center" mt={"10px"}>
        <NativeSelect.Root
          w="240px"
          key={"num"}
          size={"md"}
          backgroundColor={COLOR.WHITE}
        >
          <NativeSelect.Field
            onChange={handleSetReturnPoint}
            placeholder="点数を選択してください"
          >
            <option value="25000" aria-setsize={20}>
              25000
            </option>
            <option value="30000" style={{ fontSize: "20px" }}>
              30000
            </option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Flex>
      <Box mt={"30px"}>
        <Text textStyle="1xl" fontWeight="bold" textAlign={"center"}>
          ウマを選択してください
        </Text>
      </Box>
      <Flex justify="center" mt={"10px"}>
        <NativeSelect.Root
          w="240px"
          key={"num"}
          size={"md"}
          backgroundColor={COLOR.WHITE}
        >
          <NativeSelect.Field
            placeholder="点数を選択してください"
            onChange={handleSetUmaRule}
          >
            <option value="0" aria-setsize={20}>
              5-10
            </option>
            <option value="1" style={{ fontSize: "20px" }}>
              10-20
            </option>
            <option value="2" style={{ fontSize: "20px" }}>
              10-30
            </option>
            <option value="3" style={{ fontSize: "20px" }}>
              20-30
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
