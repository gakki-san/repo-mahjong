import { FC } from "react";
import { Box, Button, Flex, Grid, VStack } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { ScoreMap } from "@/hooks/useScore";
import { CurrentDirection } from "@/hooks/useCurrentDirection";

type WindowScoreSummaryProps = {
  selectedWinner: React.MouseEventHandler<HTMLButtonElement>;
  score: ScoreMap;
  handleReach: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleMoveDirection: () => void;
  currentDirectionArray: CurrentDirection[];
  palyerName: string[];
  countHonba: number;
};

export const WindowScoreSummary: FC<WindowScoreSummaryProps> = ({
  selectedWinner,
  score,
  handleReach,
  handleMoveDirection,
  currentDirectionArray,
  palyerName,
  countHonba,
}) => {
  const uiPositions = [
    { gridColumn: 2, gridRow: 1, transform: "rotate(180deg)" },
    { gridColumn: 3, gridRow: 2, transform: "rotate(-90deg)" },
    { gridColumn: 2, gridRow: 3 },
    { gridColumn: 1, gridRow: 2, transform: "rotate(90deg)" },
  ];

  console.log(countHonba);

  const parent = 0;

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
              <Box
                w="200px"
                h="auto"
                p="2"
                color={item === parent ? COLOR.WHITE : COLOR.BLACK}
                textAlign="center"
                bg={item === parent ? COLOR.RED : COLOR.WHITE}
              >
                <Box fontWeight={"bold"}>{player}</Box>
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
        gap={"10px"}
        transform="translate(-50%, -50%)"
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
      </Flex>
    </Grid>
  );
};
