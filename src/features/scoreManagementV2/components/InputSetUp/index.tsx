import { FC } from "react";
import { InputRulePanel } from "@/features/scoreManagementV2/components/InputRulePanel";
import { useIsBoolean } from "@/features/scoreManagementV2/hooks/useIsBoolean.ts";
import { InputPlayerName } from "@/features/scoreManagementV2/components/InputPlayerName";

export const InputSetUp: FC = () => {
  const [showRulePanel, { on: setShowRulePanel }] = useIsBoolean();
  return (
    <>
      <InputPlayerName onSubmit={setShowRulePanel} />
      {showRulePanel && <InputRulePanel />}
    </>
  );
};
