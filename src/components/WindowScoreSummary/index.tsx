import { FC } from "react";
import { Box, Button, Flex, Grid, VStack } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { ScoreMap } from "@/hooks/useScore";
import { GameMaster } from "../ScoreSummary";

type WindowScoreSummaryProps = {
  selectedWinner: React.MouseEventHandler<HTMLButtonElement>;
  score: ScoreMap;
  handleReach: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleMoveDirection: () => void;
  gameMasterOrder: GameMaster[];
};

export const WindowScoreSummary: FC<WindowScoreSummaryProps> = ({
  selectedWinner,
  score,
  handleReach,
  handleMoveDirection,
  gameMasterOrder,
}) => {
  const uiPositions = [
    { gridColumn: 2, gridRow: 1, transform: "rotate(180deg)" },
    { gridColumn: 3, gridRow: 2, transform: "rotate(-90deg)" },
    { gridColumn: 2, gridRow: 3 },
    { gridColumn: 1, gridRow: 2, transform: "rotate(90deg)" },
  ];

  const palyerName = [
    { name: "east", value: "みくる" },
    { name: "north", value: "てつ" },
    { name: "west", value: "いだしん" },
    { name: "south", value: "山田どっぴゅ" },
  ];

  return (
    <Grid
      justifyContent="center"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(5, 1fr)"
      overflow={"hidden"}
      w="100vw"
      h="100vh"
      bg={COLOR.GREEN_PRIMARY}
    >
      {gameMasterOrder.map((item, index) => {
        const directionPosition = uiPositions[index];
        const player = palyerName[index];
        return (
          <VStack
            key={item.key}
            gridColumn={directionPosition.gridColumn}
            gridRow={directionPosition.gridRow}
            transform={directionPosition.transform}
          >
            {/* <Button
              w="15px"
              h="15px"
              p="4"
              color={item.label === "東家" ? COLOR.WHITE : COLOR.BLACK}
              fontWeight={"bold"}
              bg={item.label === "東家" ? COLOR.RED : COLOR.WHITE}
              borderRadius={"50%"}
              value={item.key}
            >
              親
            </Button> */}
            <Flex gap="20px">
              <Box
                w="200px"
                h="auto"
                p="2"
                color={item.label === "東家" ? COLOR.WHITE : COLOR.BLACK}
                textAlign="center"
                bg={item.label === "東家" ? COLOR.RED : COLOR.WHITE}
              >
                <Box fontWeight={"bold"}>{player.value}</Box>
                <Box textStyle={"5xl"}>{score[index]}</Box>
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
                  value={item.key}
                >
                  和了
                </Button>
                <Button
                  w="40px"
                  h="40px"
                  m="auto"
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
      <Button
        pos={"absolute"}
        top={"50%"}
        left={"50%"}
        transform="translate(-50%, -50%)"
        onClick={handleMoveDirection}
      >
        親流し
      </Button>
    </Grid>
  );
};
