// hooks/useScoreForm.ts
import { SCORE } from "@/features/scoreManagementV2/const/score.ts";
import { RankOrderRule } from "@/globalState/rankOrderRule.ts";
import { ScoreMap } from "@/globalState/scoreAtom.ts";
import { PlusScoreRule } from "@/globalState/plusScoreRuleAtom.ts";

type Params = {
  inputStartPoint: string;
  inputReturnPoint: string;
  inputUmaRule: string;
  setScore: (value: ScoreMap) => void;
  setPlusScoreRule: (num: PlusScoreRule) => void;
  setRankOrderRule: (num: RankOrderRule) => void;
  setIsSubmit: { on: () => void };
};

export const handleScoreSubmit = ({
  inputStartPoint,
  inputReturnPoint,
  inputUmaRule,
  setScore,
  setPlusScoreRule,
  setRankOrderRule,
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
  const seats = isRuleFour ? SCORE.FOUR_RULE : SCORE.THREE_RULE;
  const newScore = new Array(seats).fill(selectScore);
  const plusScoreRule = Number(inputReturnPoint) as PlusScoreRule;
  const rankOrderRule = inputUmaRule as RankOrderRule;

  setScore(newScore as ScoreMap);
  setPlusScoreRule(plusScoreRule);
  setRankOrderRule(rankOrderRule);
  return true;
};
