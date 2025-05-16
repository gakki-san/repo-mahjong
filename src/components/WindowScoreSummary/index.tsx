import { FC } from "react";
import { Box, Button, Flex, Grid, VStack } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { Player, ScoreMap } from "@/hooks/useScore";
import { CurrentDirection } from "@/hooks/useCurrentDirection";

type WindowScoreSummaryProps = {
  selectedWinner: React.MouseEventHandler<HTMLButtonElement>;
  score: ScoreMap;
  handleReach: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleMoveDirection: () => void;
  currentDirectionArray: CurrentDirection[];
  palyerName: string[];
  countHonba: number;
  countKyotaku: number;
  handlePressStart: (
    playerIndex: Player,
  ) => React.PointerEventHandler<HTMLButtonElement>;
  handlePressEnd: () => void;
  isAppearanceScoreDiff: boolean;
  scoreDiff: ScoreMap;
  dice: number[];
  rollBoth: () => void;
};

export const WindowScoreSummary: FC<WindowScoreSummaryProps> = ({
  selectedWinner,
  score,
  handleReach,
  handleMoveDirection,
  currentDirectionArray,
  palyerName,
  countHonba,
  countKyotaku,
  handlePressStart,
  handlePressEnd,
  isAppearanceScoreDiff,
  scoreDiff,
  dice,
  rollBoth,
}) => {
  const uiPositions = [
    { gridColumn: 2, gridRow: 1, transform: "rotate(180deg)" },
    { gridColumn: 3, gridRow: 2, transform: "rotate(-90deg)" },
    { gridColumn: 2, gridRow: 3 },
    { gridColumn: 1, gridRow: 2, transform: "rotate(90deg)" },
  ];

  const parent = 0;

  return (
    <Grid
      justifyContent="center"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(3, 1fr)"
      overflow={"hidden"}
      w="100vw"
      h="100vh"
      bg={COLOR.GREEN_PRIMARY}
    >
      {currentDirectionArray.map((item, index) => {
        const directionPosition = uiPositions[index];
        const player = palyerName[index];

        return (
          <VStack
            key={item}
            gridColumn={directionPosition.gridColumn}
            gridRow={directionPosition.gridRow}
            transform={directionPosition.transform}
          >
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
                  color={item === parent ? COLOR.WHITE : COLOR.BLACK}
                  textAlign="center"
                  bg={item === parent ? COLOR.RED : COLOR.WHITE}
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
                  onClick={selectedWinner}
                  value={item}
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
          </VStack>
        );
      })}
      <Flex
        pos={"absolute"}
        top={"50%"}
        left={"50%"}
        align={"center"}
        justify={"center"}
        wrap={"wrap"}
        gap={"10px"}
        maxW={"250px"}
        transform="translate(-50%, -50%)"
        whiteSpace={"pre-wrap"}
      >
        <Button
          color={COLOR.WHITE}
          fontWeight={"bold"}
          bg={COLOR.RED}
          onClick={handleMoveDirection}
        >
          流局
        </Button>
        <Box
          p={"10px"}
          color={COLOR.WHITE}
          fontWeight={"bold"}
          bg={COLOR.BLACK}
          borderRadius={"5px"}
        >
          {countHonba}本場
        </Box>
        <Box
          p={"10px"}
          color={COLOR.WHITE}
          fontWeight={"bold"}
          bg={COLOR.BLACK}
          borderRadius={"5px"}
        >
          供託{countKyotaku}本
        </Box>
        <Button
          color={COLOR.WHITE}
          fontSize={"20px"}
          bg={COLOR.BLACK}
          onClick={rollBoth}
        >
          🎲 {dice[0]} 🎲 {dice[1]}
        </Button>
      </Flex>
    </Grid>
  );
};
