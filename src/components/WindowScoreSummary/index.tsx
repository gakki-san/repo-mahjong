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

  return (
    <Grid
      justifyContent="end"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(5, 1fr)"
      overflow={"hidden"}
      w="100vw"
      h="100vh"
      bg={COLOR.GREEN_PRIMARY}
    >
      {gameMasterOrder.map((item, index) => {
        const directionPosition = uiPositions[index];
        return (
          <VStack
            key={item.key}
            gridColumn={directionPosition.gridColumn}
            gridRow={directionPosition.gridRow}
            transform={directionPosition.transform}
          >
            <Button
              w="300px"
              h="50px"
              p="4"
              color={COLOR.BLACK}
              bg="white"
              onClick={selectedWinner}
              value={item.key}
            >
              {item.label}
            </Button>
            <Flex gap="20px">
              <Box
                w="200px"
                h="50px"
                p="2"
                color="white"
                textAlign="center"
                bg={COLOR.BLACK}
              >
                {score[index]}
              </Box>
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
