import { FC } from "react";
import { Box, Button } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import { useForm } from "react-hook-form";
import { SCORE } from "@/features/scoreManagementV2/const/score.ts";
import { ScoreMap } from "@/features/scoreManagementV2/hooks/useScore.ts";
import { InputSelectField } from "@/features/scoreManagementV2/components/InputSelectField";
import { SELECT_FIELDS_CONFIG } from "@/features/scoreManagementV2/const/rureOptions.ts";

type ScoreSelectPanelProps = {
  close: () => void;
  setScore: (value: ScoreMap) => void;
  openScoreSummary: () => void;
  setReturnPoint: (num: number) => void;
  setUmaRule: (num: number) => void;
};

export type FormValues = {
  startingScore: number;
  returnPoint: number;
  umaRule: number;
};

export const SelectedRulePanel: FC<ScoreSelectPanelProps> = ({
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
      {SELECT_FIELDS_CONFIG.map(({ id, options, placeholder, name }) => (
        <InputSelectField
          key={id}
          errors={errors}
          register={register}
          options={options}
          placeholder={placeholder}
          name={name}
        />
      ))}

      <Button w={"100px"} mt="4" type="submit">
        完了
      </Button>
    </Box>
  );
};
