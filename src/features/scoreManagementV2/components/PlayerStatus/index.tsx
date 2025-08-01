import React, { FC } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import { CurrentDirection } from "@/features/scoreManagementV2/hooks/useCurrentDirection.ts";
import { WinInfo } from "@/features/scoreManagementV2/hooks/useWinnerinfo.ts";
import { ModalType } from "@/features/scoreManagementV2/hooks/useModalStack.ts";
import { handleWinPlayer } from "@/features/scoreManagementV2/logics/handleWinPlayer";
import {
  Player,
  ScoreMap,
} from "@/features/scoreManagementV2/hooks/useScore.ts";
import { calculateScoreDiff } from "@/features/scoreManagementV2/logics/scoreDiff/calculateScoreDiff.ts";
import { useScoreAtom } from "@/globalState/scoreAtom.ts";

type PlayerStatusProps = {
  player: string;
  direction: number;
  index: number;
  handleReach: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setSelectedDirection: (direction: CurrentDirection) => void;
  setWinnerInfo: (value: Partial<WinInfo>) => void;
  openModal: (type: Exclude<ModalType, null>) => void;
  isAppearanceScoreDiff: boolean;
  scoreDiff: ScoreMap;
  setScoreDiff: (value: ScoreMap) => void;
  onScoreDiff: () => void;
  offScoreDiff: () => void;
};

export const PlayerStatus: FC<PlayerStatusProps> = ({
  player,
  direction,
  index,
  handleReach,
  setSelectedDirection,
  setWinnerInfo,
  openModal,
  isAppearanceScoreDiff,
  scoreDiff,
  setScoreDiff,
  onScoreDiff,
  offScoreDiff,
}) => {
  const [score] = useScoreAtom();
  const handlePressStart = (playerIndex: Player) => {
    return () => {
      const scoreDiff = calculateScoreDiff(playerIndex, score);
      setScoreDiff(scoreDiff);
      onScoreDiff();
    };
  };

  const handlePressEnd = () => {
    offScoreDiff();
  };

  const parent = 0;
  return (
    <Flex gap="20px">
      <Box>
        <Box mb={"5px"} fontWeight={"bold"} textAlign={"center"}>
          {player}
        </Box>
        <Button
          textStyle={"5xl"}
          w="200px"
          h="auto"
          p="2"
          color={direction === parent ? COLOR.WHITE : COLOR.BLACK}
          textAlign="center"
          bg={direction === parent ? COLOR.RED : COLOR.WHITE}
          onPointerDown={handlePressStart(index as Player)}
          onPointerLeave={handlePressEnd}
          onPointerUp={handlePressEnd}
        >
          {isAppearanceScoreDiff ? scoreDiff[index] : score[index]}
        </Button>
      </Box>
      <Flex direction={"column"}>
        <Button
          w="40px"
          h="40px"
          m="auto"
          color={COLOR.BLACK}
          fontWeight="bold"
          bg={COLOR.WHITE}
          borderRadius="50%"
          onClick={(event) =>
            handleWinPlayer(
              event,
              index,
              setSelectedDirection,
              setWinnerInfo,
              openModal,
            )
          }
          value={direction}
        >
          和了
        </Button>
        <Button
          w="40px"
          h="40px"
          m="auto"
          color={COLOR.WHITE}
          fontWeight="bold"
          bg={COLOR.RED}
          borderRadius="50%"
          onClick={handleReach}
          value={index}
        >
          立直
        </Button>
      </Flex>
    </Flex>
  );
};
