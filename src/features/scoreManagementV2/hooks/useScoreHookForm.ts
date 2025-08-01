// hooks/useScoreForm.ts
import { SCORE } from "@/features/scoreManagementV2/const/score.ts";
import { ScoreMap } from "@/features/scoreManagementV2/hooks/useScore.ts";
import { PlusScoreRule } from "@/features/scoreManagementV2/hooks/usePlusScoreRule.ts";
import { RankOrderRuleAtom } from "@/globalState/rankOrderRuleAtom.ts";

type Params = {
  inputStartPoint: string;
  inputReturnPoint: string;
  inputUmaRule: string;
  setScore: (value: ScoreMap) => void;
  setPlusScoreRule: (num: PlusScoreRule) => void;
  setRankOrderRule: (num: RankOrderRuleAtom) => void;
  close: () => void;
  setIsSubmit: { on: () => void };
};

export const handleScoreSubmit = ({
  inputStartPoint,
  inputReturnPoint,
  inputUmaRule,
  setScore,
  setPlusScoreRule,
  setRankOrderRule,
  close,
  setIsSubmit,
}: Params) => {
  const isEmptyInputField =
    inputStartPoint === "" || inputReturnPoint === "" || inputUmaRule === "";

  if (isEmptyInputField) {
    setIsSubmit.on();
    return false;
  }

  const selectScore = Number(inputStartPoint);
  const isRuleFour = selectScore === SCORE.FOUR_PLAYER_RULE;
  const seats = isRuleFour ? SCORE.FOUR_RULE : SCORE.THREE_RULR;
  const newScore = new Array(seats).fill(selectScore);
  const plusScoreRule = Number(inputReturnPoint) as PlusScoreRule;
  const rankOrderRule = Number(inputUmaRule) as RankOrderRuleAtom;

  setScore(newScore as ScoreMap);
  setPlusScoreRule(plusScoreRule);
  setRankOrderRule(rankOrderRule);
  close();
  return true;
};
