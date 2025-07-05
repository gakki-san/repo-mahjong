import { FC } from "react";
import { Button } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color";

type DecisionButtonProps = {
  handleDecisionButton: () => void;
};

export const DecisionButton: FC<DecisionButtonProps> = ({
  handleDecisionButton,
}) => {
  return (
    <Button
      textStyle="1xl"
      mt={"50px"}
      color={COLOR.WHITE}
      fontWeight="bold"
      bg={COLOR.BLACK}
      onClick={handleDecisionButton}
      paddingInline={"50px"}
    >
      決定
    </Button>
  );
};
