import React, { ComponentProps, FC } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import {
  Player,
  ScoreMap,
} from "@/features/scoreManagementV2/hooks/useScore.ts";
import { useModalStack } from "@/features/scoreManagementV2/hooks/useModalStack.ts";
import { useWinnerInfo } from "@/features/scoreManagementV2/hooks/useWinnerinfo.ts";
import { DecisionButton } from "@/features/scoreManagementV2/components/DecisionButton";
import { BackButton } from "@/features/scoreManagementV2/components/BackButton";

type ScoreSummaryProps = {
  score: ScoreMap;
  playerName: string[];
};

export const ScoreSummary: FC<ScoreSummaryProps> = ({ score, playerName }) => {
  const [winnerInfo, setWinnerInfo] = useWinnerInfo();
  const [currentModal, { openModal, closeModal }] = useModalStack();
  const WinType = currentModal === "winType";
  const isAfterWinType = currentModal === "afterWinType";
  const isRon = isAfterWinType && winnerInfo.winType === "ron";
  const isTsumo = isAfterWinType && winnerInfo.winType === "tsumo";

  const uiPositions = [
    { gridColumn: 2, gridRow: 1, transform: "rotate(180deg)" },
    { gridColumn: 3, gridRow: 2, transform: "rotate(-90deg)" },
    { gridColumn: 2, gridRow: 3 },
    { gridColumn: 1, gridRow: 2, transform: "rotate(90deg)" },
  ];

  const parent = 0;

  const handleWin = (
    event: React.MouseEvent<HTMLButtonElement>,
    currentScore: number,
  ) => {
    console.log("oya", event.currentTarget.value);
    // const currentDirection = event.currentTarget.value;
    setWinnerInfo({ winner: currentScore as Player });
    openModal("winType");
  };

  const handleWinTypeChange: ComponentProps<
    typeof RadioGroup.Root
  >["onValueChange"] = (event) => {
    const winType = event.value as "tsumo" | "ron";
    setWinnerInfo({
      winType: winType,
    });
  };

  const winTypes = [
    {
      label: "ロン",
      value: "ron",
    },
    {
      label: "ツモ",
      value: "tsumo",
    },
  ];

  const handleDesideWinType = () => {
    openModal("afterWinType");
  };
  const handleBack = () => {
    closeModal();
  };

  // const oyaichi = [0, 1, 2, 3];
  const oyanan = [3, 2, 1, 0];

  return (
    <>
      <Grid
        justifyContent="center"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(3, 1fr)"
        overflow={"hidden"}
        w="100vw"
        h="100vh"
        bg={COLOR.GREEN_PRIMARY}
      >
        {oyanan.map((item, index) => {
          const directionPosition = uiPositions[index];
          const player = playerName[index];

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
                    // onPointerDown={handlePressStart(index as Player)}
                    // onPointerLeave={handlePressEnd}
                    // onPointerUp={handlePressEnd}
                  >
                    {/*{isAppearanceScoreDiff ? scoreDiff[index] : score[index]}*/}
                    {score[index]}
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
                    // onClick={handleReach}
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
            // onClick={handleMoveDirection}
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
            {/*{countHonba}本場*/}
            0本場
          </Box>
          <Box
            p={"10px"}
            color={COLOR.WHITE}
            fontWeight={"bold"}
            bg={COLOR.BLACK}
            borderRadius={"5px"}
          >
            {/*供託{countKyotaku}本*/}
            0本
          </Box>
          <Button
            color={COLOR.WHITE}
            fontWeight={"bold"}
            bg={COLOR.RED}
            // onClick={handleFinishGame}
          >
            終局
          </Button>
          <Button
            color={COLOR.WHITE}
            fontSize={"20px"}
            bg={COLOR.BLACK}
            // onClick={rollBoth}
          >
            {/*🎲 {dice[0]} 🎲 {dice[1]}*/}
          </Button>
        </Flex>
      </Grid>
      {WinType && (
        <Box
          pos={"absolute"}
          top={0}
          alignItems={"center"}
          justifyContent={"center"}
          flexDir={"column"}
          display={"flex"}
          w={"100vw"}
          h={"100vh"}
          bg={COLOR.GREEN_PRIMARY}
        >
          <RadioGroup.Root
            defaultValue={"ron"}
            value={winnerInfo.winType}
            onValueChange={handleWinTypeChange}
          >
            <HStack flexDir={"column"} gap="6" display={"flex"}>
              {winTypes.map((item) => (
                <RadioGroup.Item key={item.value} value={item.value}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>
          <Flex gap={"20px"}>
            <DecisionButton handleDecisionButton={handleDesideWinType} />
            <BackButton handleBack={handleBack} />
          </Flex>
        </Box>
      )}
      {isRon && (
        <Box
          pos={"absolute"}
          top={0}
          alignItems={"center"}
          justifyContent={"center"}
          flexDir={"column"}
          display={"flex"}
          w={"100vw"}
          h={"100vh"}
          bg={COLOR.GREEN_PRIMARY}
        >
          ロンだえ
          <Flex gap={"20px"}>
            <DecisionButton handleDecisionButton={handleDesideWinType} />
            <BackButton handleBack={handleBack} />
          </Flex>
        </Box>
      )}
      {isTsumo && (
        <Box
          pos={"absolute"}
          top={0}
          alignItems={"center"}
          justifyContent={"center"}
          flexDir={"column"}
          display={"flex"}
          w={"100vw"}
          h={"100vh"}
          bg={COLOR.GREEN_PRIMARY}
        >
          ツモだえ
          <Flex gap={"20px"}>
            <DecisionButton handleDecisionButton={handleDesideWinType} />
            <BackButton handleBack={handleBack} />
          </Flex>
        </Box>
      )}
    </>
  );
};
