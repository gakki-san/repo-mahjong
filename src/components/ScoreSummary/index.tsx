import { FC } from "react";
import { Box, Button, Grid, VStack, Flex } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { Player, ScoreMap } from "@/hooks/useScore";

type ScoreSummaryProps = {
  score: ScoreMap;
  setScore: (value: ScoreMap) => void;
  players: string[];
};

export const ScoreSummary: FC<ScoreSummaryProps> = ({
  score,
  setScore,
  players,
}) => {
  if (!score) return;
  const hoju = "south";
  const houra = "east";
  const count = 4000;

  const handleTsumo = (
    winner: Player,
    points: number,
    players: string[],
    score: ScoreMap,
  ) => {
    const newScore: ScoreMap = {} as ScoreMap;
    if (!score || !newScore) return;
    const losePointPerson = players.length - 1;
    for (const player of players) {
      const person = player as Player;
      if (person === winner) {
        newScore[person] = score[person] + points * losePointPerson;
      } else {
        newScore[person] = score[person] - points;
      }
    }
    setScore(newScore);
  };

  const handleRon = (
    loser: Player,
    winner: Player,
    points: number,
    score: ScoreMap,
  ) => {
    if (!score) return;
    const newScore = {
      ...score,
      [winner]: score[winner] + points,
      [loser]: score[loser] - points,
    };

    setScore(newScore);
  };

  return (
    <Grid
      justifyContent="start"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(3, 1fr)"
      w="100vw"
      h="100vh"
      bg={COLOR.GREEN_PRIMARY}
    >
      <VStack gridColumn={2} gridRow={1} transform="rotate(180deg)">
        <Box w="300px" p="4" textAlign="center" bg="white">
          東家
        </Box>
        <Box w="200px" p="4" color="white" textAlign="center" bg={COLOR.BLACK}>
          {score?.east}
        </Box>
      </VStack>

      <VStack gridColumn={3} gridRow={2} transform="rotate(-90deg)">
        <Box w="300px" h="50px" p="2" textAlign="center" bg="white">
          南家
        </Box>
        <Box
          w="200px"
          h="50px"
          p="2"
          color="white"
          textAlign="center"
          bg={COLOR.BLACK}
        >
          {score?.south}
        </Box>
      </VStack>

      <VStack gridColumn={2} gridRow={3}>
        <Box w="300px" p="4" textAlign="center" bg="white">
          西家
        </Box>
        <Box w="200px" p="4" color="white" textAlign="center" bg={COLOR.BLACK}>
          {score?.west}
        </Box>
      </VStack>

      <VStack gridColumn={1} gridRow={2} transform="rotate(90deg)">
        <Flex
          align="center"
          justify="center"
          w="300px"
          h="50px"
          p="2"
          bg="white"
        >
          北家
        </Flex>
        <Flex
          align="center"
          justify="center"
          w="200px"
          h="50px"
          p="2"
          color="white"
          bg={COLOR.BLACK}
        >
          {score?.north ?? "👐"}
        </Flex>
      </VStack>

      <Button onClick={() => handleTsumo(houra, count, players, score)}>
        親が4000点のツモだ！！！
      </Button>
      <Button onClick={() => handleRon(hoju, houra, count, score)}>
        親が下家から4000の出上がりだ！！！
      </Button>
    </Grid>
  );
};
