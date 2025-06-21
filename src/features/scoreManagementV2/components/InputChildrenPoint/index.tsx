import { FC } from "react";
import { Box, Flex, NumberInput } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import { DecisionButton } from "@/features/scoreManagementV2/components/DecisionButton";
import { BackButton } from "@/features/scoreManagementV2/components/BackButton";
import { useCount } from "@/features/scoreManagementV2/hooks/useCount.ts";
import { WinInfo } from "@/features/scoreManagementV2/hooks/useWinnerinfo.ts";
import {
  Player,
  ScoreMap,
} from "@/features/scoreManagementV2/hooks/useScore.ts";
import { calculateScore } from "@/features/scoreManagementV2/logics/calculateScore";

type InputChildrenPointProps = {
  handleBack: () => void;
  reset: () => void;
  setPoint: (value: Partial<WinInfo>) => void;
  setScore: (score: ScoreMap) => void;
  score: ScoreMap;
  winner: Player | null;
  toArray: () => number[];
};

export const InputChildrenPoint: FC<InputChildrenPointProps> = ({
  handleBack,
  reset,
  setPoint,
  setScore,
  score,
  winner,
  toArray,
}) => {
  const [childrenPoint, { add: setChildrenPoint }] = useCount();
  const [parentPoint, { add: setParentPoint }] = useCount();

  const handleCloseInputPoint = () => {
    reset();
    setPoint({ winPoints: childrenPoint * 2 + parentPoint });
    setScore(
      calculateScore(
        winner,
        score,
        childrenPoint * 2 + parentPoint,
        toArray().indexOf(0) as Player,
      ) as ScoreMap,
    );
  };

  const handlePointChange =
    (setter: (point: number) => void) => (event: { value: string }) => {
      const point = Number(event.value);
      setter(point);
    };

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
      子
      <NumberInput.Root
        onValueChange={handlePointChange(setChildrenPoint)}
        w={"200px"}
        margin={"10px 0px 40px 0px"}
        max={48000}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      親
      <NumberInput.Root
        onValueChange={handlePointChange(setParentPoint)}
        w={"200px"}
        max={48000}
        mt={"20px"}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      <Flex gap={"20px"}>
        <DecisionButton handleDecisionButton={handleCloseInputPoint} />
        <BackButton handleBack={handleBack} />
      </Flex>
    </Box>
  );
};
