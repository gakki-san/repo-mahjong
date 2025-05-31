import { FC } from "react";
import { Box, Button } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import { SCORE } from "@/features/scoreManagementV2/const/score.ts";
import { ScoreMap } from "@/features/scoreManagementV2/hooks/useScore.ts";
import { RULE_OPTIONS } from "@/features/scoreManagementV2/const/rureOptions.ts";
import { InputSelectPoint } from "@/features/scoreManagementV2/components/InputSelectPoint";
import { useSetInputValue } from "@/features/scoreManagementV2/hooks/useSetInputValue.ts";
import { useIsBoolean } from "@/features/scoreManagementV2/hooks/useIsBoolean.ts";
import { InputSelectUmaRule } from "@/features/scoreManagementV2/components/InputSelectUmaRule";

type ScoreSelectPanelProps = {
  close: () => void;
  setScore: (value: ScoreMap) => void;
  openScoreSummary: () => void;
  setReturnPoint: (num: number) => void;
  setUmaRule: (num: number) => void;
};

export const SelectedRulePanel: FC<ScoreSelectPanelProps> = ({
  close,
  setScore,
  openScoreSummary,
  setReturnPoint,
  setUmaRule,
}) => {
  const [isSubmit, setIsSubmit] = useIsBoolean();
  const [inputStartPoint, handleStartPoint] = useSetInputValue();
  const [inputReturnPoint, handleReturnPoint] = useSetInputValue();
  const [inputUmaRule, handleUmaRule] = useSetInputValue();

  const setScoreForAllPlayers = (selectScore: number) => {
    if (!selectScore) return;
    const isRuleFour = Number(selectScore) === SCORE.FOUR_PLAYER_RULE;
    const seats = isRuleFour ? SCORE.FOUR_RULE : SCORE.THREE_RULR;
    const newScore = new Array(seats).fill(selectScore);
    setScore(newScore as ScoreMap);
  };

  const onSubmit = () => {
    const isEmptyInputField =
      inputStartPoint === "" || inputReturnPoint === "" || inputUmaRule === "";
    if (isEmptyInputField) {
      setIsSubmit.on();
      return;
    }
    setScoreForAllPlayers(Number(inputStartPoint));
    setReturnPoint(Number(inputReturnPoint));
    setUmaRule(Number(inputUmaRule));
    close();
    openScoreSummary();
  };

  return (
    <Box
      as="form"
      alignItems={"center"}
      flexDir={"column"}
      gap={"30px"}
      display={"flex"}
      w={"100vw"}
      h={"100vh"}
      pt={"30px"}
      bgColor={COLOR.GREEN_PRIMARY}
    >
      <InputSelectPoint
        input={inputStartPoint}
        handleInputValue={handleStartPoint}
        option={RULE_OPTIONS.START_SCORE}
        placeholder={"持ち点を選択してください"}
        isSubmit={isSubmit}
      />
      <InputSelectPoint
        input={inputReturnPoint}
        handleInputValue={handleReturnPoint}
        option={RULE_OPTIONS.RETURN_POINT}
        placeholder={"返す点数を選択してください"}
        isSubmit={isSubmit}
      />
      <InputSelectUmaRule
        input={inputUmaRule}
        handleInputValue={handleUmaRule}
        option={RULE_OPTIONS.UMA_RULE}
        placeholder={"ウマを選択してください"}
        isSubmit={isSubmit}
      />

      <Button w={"100px"} mt="4" onClick={onSubmit} type="button">
        完了
      </Button>
    </Box>
  );
};
