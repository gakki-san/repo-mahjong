import { FC } from "react";
import { Box, Button } from "@chakra-ui/react";
import { COLOR } from "../../const/color";
import { SCORE } from "../../const/score";
import { ScoreMap } from "../../hooks/useScore";
import { useForm } from "react-hook-form";
import { InputSelectField } from "../InputSelectField";

type ScoreSelectPanelProps = {
  close: () => void;
  score: ScoreMap;
  setScore: (value: ScoreMap) => void;
  openScoreSummary: () => void;
  setReturnPoint: (num: number) => void;
  setUmaRule: (num: number) => void;
  returnPoint: number;
};

export type FormValues = {
  startingScore: number;
  returnPoint: number;
  umaRule: number;
};

export const ScoreSelectPanel: FC<ScoreSelectPanelProps> = ({
  close,
  setScore,
  openScoreSummary,
  setReturnPoint,
  setUmaRule,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const startingScoreOptions = [25000, 35000];
  const returnPointOptions = [25000, 30000];
  const umaRuleOptions = [
    { value: 0, label: "5-10" },
    { value: 1, label: "10-20" },
    { value: 2, label: "10-30" },
    { value: 3, label: "20-30" },
  ];

  const setScoreForAllPlayers = (selectScore: number) => {
    if (!selectScore) return;
    const isRuleFour = Number(selectScore) === SCORE.FOUR_PLAYER_RULE;
    const seats = isRuleFour ? SCORE.FOUR_RULE : SCORE.THREE_RULR;
    const newScore = new Array(seats).fill(selectScore);
    setScore(newScore as ScoreMap);
  };

  const onSubmit = (data: FormValues) => {
    setScoreForAllPlayers(Number(data.startingScore));
    setReturnPoint(data.returnPoint);
    setUmaRule(data.umaRule);
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
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputSelectField
        errors={errors}
        register={register}
        options={startingScoreOptions}
        placeholder={"持ち点を選択してください"}
        name={"startingScore"}
      />
      <InputSelectField
        errors={errors}
        register={register}
        options={returnPointOptions}
        placeholder="返す点数を選択してください"
        name={"returnPoint"}
      />
      <InputSelectField
        errors={errors}
        register={register}
        options={umaRuleOptions}
        placeholder="ウマを選択してください"
        name={"umaRule"}
      />

      <Button w={"100px"} mt="4" type="submit">
        完了
      </Button>
    </Box>
  );
};
