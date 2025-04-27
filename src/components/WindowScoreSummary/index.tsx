import { FC } from "react";
import { Box, Button, Flex, Grid, VStack } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { ScoreMap } from "@/hooks/useScore";

type WindowScoreSummaryProps = {
  selectedWinner: React.MouseEventHandler<HTMLButtonElement>;
  score: ScoreMap;
};

export const WindowScoreSummary: FC<WindowScoreSummaryProps> = ({
  selectedWinner,
  score,
}) => {
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
        <Button
          w="300px"
          p="4"
          color={COLOR.BLACK}
          textAlign="center"
          bg="white"
          onClick={selectedWinner}
          value="east"
        >
          東家
        </Button>
        <Box w="200px" p="4" color="white" textAlign="center" bg={COLOR.BLACK}>
          {score?.east}
        </Box>
      </VStack>

      <VStack gridColumn={3} gridRow={2} transform="rotate(-90deg)">
        <Button
          w="300px"
          h="50px"
          p="2"
          color={COLOR.BLACK}
          textAlign="center"
          bg="white"
          onClick={selectedWinner}
          value={"south"}
        >
          南場
        </Button>
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
        <Button
          w="300px"
          p="4"
          color={COLOR.BLACK}
          textAlign="center"
          bg="white"
          onClick={selectedWinner}
          value={"west"}
        >
          西場
        </Button>
        <Box w="200px" p="4" color="white" textAlign="center" bg={COLOR.BLACK}>
          {score?.west}
        </Box>
      </VStack>

      <VStack gridColumn={1} gridRow={2} transform="rotate(90deg)">
        <Flex align="center" justify="center">
          <Button
            w="300px"
            h="50px"
            p="2"
            color={COLOR.BLACK}
            bg="white"
            onClick={selectedWinner}
            value={"north"}
          >
            北家
          </Button>
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

      {/* <Button onClick={() => handleTsumo(houra, count, players, score)}>
        親が4000点のツモだ！！！
      </Button>
      <Button onClick={() => handleRon(hoju, houra, count, score)}>
        親が下家から4000の出上がりだ！！！
      </Button> */}
    </Grid>
  );
};
