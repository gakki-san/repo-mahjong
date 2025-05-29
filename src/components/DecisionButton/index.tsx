import { FC } from "react";
import { Button } from "@chakra-ui/react";

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
      fontWeight="bold"
      onClick={handleDecisionButton}
      paddingInline={"50px"}
    >
      決定
    </Button>
  );
};
