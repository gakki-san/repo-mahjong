import React, { FC } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color.ts";

type PlayerStatusProps = {
  player: string;
  direction: number;
  index: number;
  score: number;
  handleWin: (
    event: React.MouseEvent<HTMLButtonElement>,
    currentScore: number,
  ) => void;
  handleReach: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const PlayerStatus: FC<PlayerStatusProps> = ({
  player,
  direction,
  index,
  score,
  handleWin,
  handleReach,
}) => {
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
          // onPointerDown={handlePressStart(index as Player)}
          // onPointerLeave={handlePressEnd}
          // onPointerUp={handlePressEnd}
        >
          {/*{isAppearanceScoreDiff ? scoreDiff[index] : score[index]}*/}
          {score}
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
          onClick={(event) => handleWin(event, index)}
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
