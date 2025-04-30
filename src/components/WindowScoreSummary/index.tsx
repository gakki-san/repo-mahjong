import { FC, useState } from "react";
import { Box, Button, Flex, Grid, VStack } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { Player, ScoreMap } from "@/hooks/useScore";
import { useIsBoolean } from "@/hooks/useIsBoolean";

type WindowScoreSummaryProps = {
  selectedWinner: React.MouseEventHandler<HTMLButtonElement>;
  score: ScoreMap;
};

export const WindowScoreSummary: FC<WindowScoreSummaryProps> = ({
  selectedWinner,
  score,
}) => {
  const playerList = {
    east: false,
    south: false,
    west: false,
    north: false,
  };
  const [isReachList, setIsReachList] = useState<typeof playerList>(playerList);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isShowReachModal, setIsShowReachModal] = useIsBoolean();
  const [selectedReachPlayer, setSelectedReachPlayer] = useState("");

  const resetReach = () => {
    setIsReachList((prev) => ({
      ...prev,
      [selectedReachPlayer]: false,
    }));
    setIsShowReachModal.off();
  };

  const noResetReach = () => {
    setIsShowReachModal.off();
  };

  const handleReach = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventReachPlayer = event.currentTarget.value as Player;
    setSelectedReachPlayer(eventReachPlayer);

    if (isReachList[eventReachPlayer]) {
      alert("貴様すでに立直をしているなぁ！！！");
      setIsShowReachModal.on();
    } else {
      setIsReachList((prev) => ({
        ...prev,
        [eventReachPlayer]: true,
      }));
      setIsPopupOpen(true);
      const audio = new Audio("public/audio.mp3");
      audio.addEventListener("ended", () => {
        setIsPopupOpen(false);
      });

      audio.play();
    }
  };

  return (
    <Grid
      justifyContent="start"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(5, 1fr)"
      overflow={"hidden"}
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
        <Flex gap={"20px"}>
          <Box
            w="200px"
            p="4"
            color="white"
            textAlign="center"
            bg={COLOR.BLACK}
          >
            {score?.east}
          </Box>
          <Button
            w="40px"
            h="40px"
            m={"auto"}
            fontWeight={"bold"}
            bg={COLOR.RED}
            borderRadius={"50%"}
            onClick={handleReach}
            value={"east"}
          >
            立直
          </Button>
        </Flex>
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
        <Flex gap={"20px"}>
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
          <Button
            w="40px"
            h="40px"
            m={"auto"}
            fontWeight={"bold"}
            bg={COLOR.RED}
            borderRadius={"50%"}
            onClick={handleReach}
            value={"south"}
          >
            立直
          </Button>
        </Flex>
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
        <Flex gap={"20px"}>
          <Box
            w="200px"
            p="4"
            color="white"
            textAlign="center"
            bg={COLOR.BLACK}
          >
            {score?.west}
          </Box>
          <Button
            w="40px"
            h="40px"
            m={"auto"}
            fontWeight={"bold"}
            bg={COLOR.RED}
            borderRadius={"50%"}
            onClick={handleReach}
            value={"west"}
          >
            立直
          </Button>
        </Flex>
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
        <Flex gap={"20px"}>
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
          <Button
            w="40px"
            h="40px"
            m={"auto"}
            fontWeight={"bold"}
            bg={COLOR.RED}
            borderRadius={"50%"}
            onClick={handleReach}
            value={"north"}
          >
            立直
          </Button>
        </Flex>
      </VStack>

      {isPopupOpen && (
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
            bg="white"
            borderRadius="md"
          >
            <Box pos="relative" pt="56.25%">
              <iframe
                src="public/reach.mp4"
                title="動画タイトル"
                allowFullScreen
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
      )}
      {isShowReachModal && (
        <>
          <Box
            pos={"absolute"}
            top={0}
            alignItems={"center"}
            justifyContent={"center"}
            flexDir={"column"}
            display={"flex"}
            w={"100vw"}
            h={"100vh"}
            bg={COLOR.WHITE}
          >
            立直取り消す？
            <Button mt={"20px"} onClick={resetReach}>
              はい
            </Button>
            <Button mt={"20px"} onClick={noResetReach}>
              いいえ
            </Button>
          </Box>
        </>
      )}
      {/* {isShowReachModal && (
        <Box
          pos={"absolute"}
          top={0}
          alignItems={"center"}
          justifyContent={"center"}
          flexDir={"column"}
          display={"flex"}
          w={"100vw"}
          h={"100vh"}
          bg={COLOR.WHITE}
        >
          だれの無限立直？
          <RadioGroup.Root
            defaultValue="1"
            mt={"20px"}
            onValueChange={handleOnchange}
          >
            <HStack flexDir={"column"} gap="6" display={"flex"}>
              {players.map((item, index) => (
                <RadioGroup.Item key={index} value={item.name}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText textStyle="2xl">
                    {item.name}
                  </RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>
          <Button mt={"20px"} onClick={handlePopReachMovie}>
            完了
          </Button>
        </Box>
      )} */}

      {/* <Button onClick={() => handleTsumo(houra, count, players, score)}>
        親が4000点のツモだ！！！
      </Button>
      <Button onClick={() => handleRon(hoju, houra, count, score)}>
        親が下家から4000の出上がりだ！！！
      </Button> */}
    </Grid>
  );
};
