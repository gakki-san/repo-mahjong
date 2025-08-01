import { FC } from "react";
import { Button } from "@chakra-ui/react";
import { RULE_OPTIONS } from "@/features/scoreManagementV2/const/rureOptions.ts";
import { useSetInputValue } from "@/features/scoreManagementV2/hooks/useSetInputValue.ts";
import { useIsBoolean } from "@/features/scoreManagementV2/hooks/useIsBoolean.ts";
import { InputSelectRule } from "@/features/scoreManagementV2/components/InputSelectRule";
import { handleScoreSubmit } from "@/features/scoreManagementV2/hooks/useScoreHookForm.ts";
import { useNavigate } from "react-router";
import { useScoreAtom } from "@/globalState/scoreAtom.ts";
import { useSetAtom } from "jotai/index";
import { rankScoreRuleAtom } from "@/globalState/rankOrderRuleAtom.ts";
import { plusScoreRuleAtom } from "@/globalState/plusScoreRuleAtom.ts";
import { ModalView } from "@/features/scoreManagementV2/components/ModalView";

export const InputRulePanel: FC = () => {
  const [isSubmit, setIsSubmit] = useIsBoolean();
  const [inputStartPoint, handleStartPoint] = useSetInputValue();
  const [inputReturnPoint, handleReturnPoint] = useSetInputValue();
  const [inputRankOrderRule, handleRankOrderRule] = useSetInputValue();
  const setRankOrderRule = useSetAtom(rankScoreRuleAtom);
  const setPlusScoreRule = useSetAtom(plusScoreRuleAtom);
  const [, { set: setScore }] = useScoreAtom();

  const navigate = useNavigate();

  const onSubmit = () => {
    const isSuccess = handleScoreSubmit({
      inputStartPoint,
      inputReturnPoint,
      inputUmaRule: inputRankOrderRule,
      setScore,
      setPlusScoreRule,
      setRankOrderRule,
      close,
      setIsSubmit,
    });
    if (!isSuccess) return;

    navigate("/scoresummary");
  };

  return (
    <ModalView as="form" onSubmit={onSubmit} gap={"30px"}>
      <InputSelectRule
        input={inputStartPoint}
        handleInputValue={handleStartPoint}
        options={RULE_OPTIONS.START_SCORE}
        placeholder={"持ち点を選択してください"}
        isSubmit={isSubmit}
      />
      <InputSelectRule
        input={inputReturnPoint}
        handleInputValue={handleReturnPoint}
        options={RULE_OPTIONS.RETURN_POINT}
        placeholder={"返す点数を選択してください"}
        isSubmit={isSubmit}
      />
      <InputSelectRule
        input={inputRankOrderRule}
        handleInputValue={handleRankOrderRule}
        options={RULE_OPTIONS.UMA_RULE}
        placeholder={"ウマを選択してください"}
        isSubmit={isSubmit}
      />
      <Button w={"100px"} mt="4" type="submit">
        完了
      </Button>
    </ModalView>
  );
};
