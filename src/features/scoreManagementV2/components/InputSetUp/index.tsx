import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import { Box } from "@chakra-ui/react";
import { useIsBoolean } from "@/features/scoreManagementV2/hooks/useIsBoolean.ts";
import { InputPlayerName } from "@/features/scoreManagementV2/components/InputPlayerName";
import { SelectedRulePanel } from "@/features/scoreManagementV2/components/SelectedRulePanel";
import { useScore } from "@/features/scoreManagementV2/hooks/useScore.ts";
import { useCount } from "@/features/scoreManagementV2/hooks/useCount.ts";
import { ScoreSummary } from "@/features/scoreManagementV2/components/ScoreSummary";

export const InputSetUp = () => {
  const [isSelectedScorePanel, { on: openRuleModal, off: closeRuleModal }] =
    useIsBoolean();
  const [isOpenScoreSummary, { on: open }] = useIsBoolean();

  const [score, action] = useScore();
  const [returnPoint, setReturnPoint] = useCount();
  const [umaRule, setUmaRule] = useCount();
  const [isInputName, { on: closeInputModal }] = useIsBoolean();

  const closeModal = () => {
    closeInputModal();
    openRuleModal();
  };

  console.log(umaRule, returnPoint);

  return (
    <Box
      pos={"absolute"}
      top={0}
      alignItems={"center"}
      justifyContent={"center"}
      flexDir={"column"}
      display={"flex"}
      w={"100vw"}
      h={"100vh"}
      bg={COLOR.GREEN_PRIMARY}
    >
      {isInputName || <InputPlayerName closeModal={closeModal} />}
      {isSelectedScorePanel && (
        <SelectedRulePanel
          close={closeRuleModal}
          setScore={action.set}
          openScoreSummary={open}
          setReturnPoint={setReturnPoint.add}
          setUmaRule={setUmaRule.add}
        />
      )}
      {isOpenScoreSummary && (
        <ScoreSummary
          score={score}
          // setScore={action.set}
        />
      )}
    </Box>
  );
};
