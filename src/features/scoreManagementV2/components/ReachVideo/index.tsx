import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";

export const ReachVideo: FC = () => {
  return (
    <Flex
      pos="absolute"
      zIndex={1000}
      top="0"
      left="0"
      align="center"
      justify="center"
      w="100vw"
      h="100vh"
      bg="rgba(0,0,0,0.5)"
    >
      <Box
        pos="relative"
        overflow="hidden"
        w="90%"
        maxW="600px"
        bg={COLOR.WHITE}
        borderRadius="md"
      >
        <Box pos="relative" pt="56.25%">
          <video
            src={"/reach.mp4"}
            autoPlay
            muted
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </Box>
      </Box>
    </Flex>
  );
};
