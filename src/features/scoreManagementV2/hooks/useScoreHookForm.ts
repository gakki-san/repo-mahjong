// hooks/useScoreForm.ts
import { SCORE } from "@/features/scoreManagementV2/const/score.ts";
import { ScoreMap } from "@/features/scoreManagementV2/hooks/useScore.ts";

type Params = {
  inputStartPoint: string;
  inputReturnPoint: string;
  inputUmaRule: string;
  setScore: (value: ScoreMap) => void;
  setReturnPoint: (num: number) => void;
  setUmaRule: (num: number) => void;
  close: () => void;
  openScoreSummary: () => void;
  setIsSubmit: { on: () => void };
};

export const handleScoreSubmit = ({
  inputStartPoint,
  inputReturnPoint,
  inputUmaRule,
  setScore,
  setReturnPoint,
  setUmaRule,
  close,
  openScoreSummary,
  setIsSubmit,
}: Params) => {
  const isEmptyInputField =
    inputStartPoint === "" || inputReturnPoint === "" || inputUmaRule === "";

  if (isEmptyInputField) {
    setIsSubmit.on();
    return;
  }

  const selectScore = Number(inputStartPoint);
  const isRuleFour = selectScore === SCORE.FOUR_PLAYER_RULE;
  const seats = isRuleFour ? SCORE.FOUR_RULE : SCORE.THREE_RULR;
  const newScore = new Array(seats).fill(selectScore);

  setScore(newScore as ScoreMap);
  setReturnPoint(Number(inputReturnPoint));
  setUmaRule(Number(inputUmaRule));
  close();
  openScoreSummary();
};
