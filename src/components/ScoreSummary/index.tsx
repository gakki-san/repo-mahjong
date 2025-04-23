import { FC } from "react";
import { Box, Grid, VStack } from "@chakra-ui/react";
import { COLOR } from "@/const/color";

type ScoreSummaryProps = {
  score: number[];
};

export const ScoreSummary: FC<ScoreSummaryProps> = ({ score }) => {
  return (
    <Grid
      gap={4}
      templateRows="1fr 1fr 1fr"
      templateColumns="1fr 1fr 1fr"
      w="100vw"
      h="100vh"
      p={8}
      bg={COLOR.GREEN_PRIMARY}
    >
      <VStack gridColumn={2} gridRow={1}>
        <Box w="200px" p="4" textAlign="center" bg="white">
          東家
        </Box>
        <Box w="200px" p="4" color="white" textAlign="center" bg={COLOR.BLACK}>
          {score[0]}
        </Box>
      </VStack>

      <VStack gridColumn={3} gridRow={2}>
        <Box w="200px" p="4" textAlign="center" bg="white">
          南家
        </Box>
        <Box w="200px" p="4" color="white" textAlign="center" bg={COLOR.BLACK}>
          {score[1]}
        </Box>
      </VStack>

      <VStack gridColumn={2} gridRow={3}>
        <Box w="200px" p="4" textAlign="center" bg="white">
          西家
        </Box>
        <Box w="200px" p="4" color="white" textAlign="center" bg={COLOR.BLACK}>
          {score[2]}
        </Box>
      </VStack>

      <VStack gridColumn={1} gridRow={2}>
        <Box w="200px" p="4" textAlign="center" bg="white">
          北家
        </Box>
        <Box w="200px" p="4" color="white" textAlign="center" bg={COLOR.BLACK}>
          {score?.[3] ?? "👐"}
        </Box>
      </VStack>
    </Grid>
  );
};
