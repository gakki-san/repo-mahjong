import { FC } from "react";
import { Box, Button, Flex, Grid, VStack } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import {
  Player,
  ScoreMap,
  useScore,
} from "@/features/scoreManagementV2/hooks/useScore.ts";
import { useModalStack } from "@/features/scoreManagementV2/hooks/useModalStack.ts";
import { useWinnerInfo } from "@/features/scoreManagementV2/hooks/useWinnerinfo.ts";
import { InputWinType } from "@/features/scoreManagementV2/components/InputWinType";
import { SelectLoser } from "@/features/scoreManagementV2/components/SelectLoser";
import { useCurrentDirection } from "@/features/scoreManagementV2/hooks/useCurrentDirection.ts";
import { InputWinPoint } from "@/features/scoreManagementV2/components/InputParentPoint";
import { InputChildrenPoint } from "@/features/scoreManagementV2/components/InputChildrenPoint";
import { FinishGameModal } from "@/features/scoreManagementV2/components/FinishGameModal";
import { SelectTempaiModal } from "@/features/scoreManagementV2/components/SelectTempaiModal";
import { useReachFlags } from "@/features/scoreManagementV2/hooks/useReachFlags.ts";
import { ReachVideo } from "@/features/scoreManagementV2/components/ReachVideo";
import { AlreadyReachModal } from "@/features/scoreManagementV2/components/AlreadyReachModal";
import { PlayerStatus } from "@/features/scoreManagementV2/components/PlayerStatus";
import { useHandleReach } from "@/features/scoreManagementV2/hooks/useHandleReach.ts";
import { useIsBoolean } from "@/features/scoreManagementV2/hooks/useIsBoolean.ts";

type ScoreSummaryProps = {
  score: ScoreMap;
  playerName: string[];
  // setScore: (score: ScoreMap) => void;
};

export const ScoreSummary: FC<ScoreSummaryProps> = ({
  score,
  playerName,
  // setScore,
}) => {
  const [winnerInfo, setWinnerInfo] = useWinnerInfo();
  const [currentModal, { openModal, closeModal, reset }] = useModalStack();
  const [
    selectedDirection,
    {
      set: setSelectedDirection,
      // rotate: rotateDirection
    },
  ] = useCurrentDirection();
  const [reachFlags, setReachFlags] = useReachFlags();
  const [isAppearanceScoreDiff, { on: onScoreDiff, off: offScoreDiff }] =
    useIsBoolean();
  const [scoreDiff, setScoreDiff] = useScore();
  const WinType = currentModal === "winType";
  const isAfterWinType = currentModal === "finishWinType";
  const isRon = isAfterWinType && winnerInfo.winType === "ron";
  const isTsumo = isAfterWinType && winnerInfo.winType === "tsumo";
  const isWinPointForRon = currentModal === "winPoint";
  const isFinishModal = currentModal === "finish";
  const isTempaiModal = currentModal === "tempai";
  const isReach = currentModal === "reachVideo";
  const isAlreadyReach = currentModal === "reachConfirm";

  const uiPositions = [
    { gridColumn: 2, gridRow: 1, transform: "rotate(180deg)" },
    { gridColumn: 3, gridRow: 2, transform: "rotate(-90deg)" },
    { gridColumn: 2, gridRow: 3 },
    { gridColumn: 1, gridRow: 2, transform: "rotate(90deg)" },
  ];

  const parent = 0;
  const isParent = parent === selectedDirection;

  const handleBack = () => {
    closeModal();
  };

  // const oyaichi = [0, 1, 2, 3];
  const oyanan = [3, 2, 1, 0];

  const handleFinishGame = () => {
    openModal("finish");
  };

  const handleMoveDirection = () => {
    openModal("tempai");
  };

  const handleCloseTempaiModal = () => {
    reset();
  };

  const { handleReach } = useHandleReach({
    reachFlags,
    setReachFlags,
    openModal,
    closeModal,
  });

  const mockGameData = [
    { id: "1", name: "Alpha", score: "20" },
    { id: "2", name: "Bravo", score: "10" },
    { id: "3", name: "Charlie", score: "0" },
    { id: "4", name: "Delta", score: "-10" },
  ];

  const mockIsTempaiFlag = {
    0: true,
    1: false,
    2: false,
    3: false,
  };

  const handleScoreDiff = (playerIndex: Player, score: ScoreMap) => {
    const currentScore = [...score];
    return currentScore.map(
      (playerScore) => playerScore - currentScore[playerIndex],
    ) as ScoreMap;
  };

  const handlePressStart = (playerIndex: Player) => {
    return () => {
      const scoreDiff = handleScoreDiff(playerIndex, score);
      setScoreDiff.set(scoreDiff);
      onScoreDiff();
    };
  };

  const handlePressEnd = () => {
    offScoreDiff();
  };

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
              <PlayerStatus
                key={item}
                player={player}
                direction={item}
                index={index}
                score={score[index]}
                handleReach={handleReach}
                setSelectedDirection={setSelectedDirection}
                setWinnerInfo={setWinnerInfo}
                openModal={openModal}
                handlePressStart={handlePressStart}
                handlePressEnd={handlePressEnd}
                isAppearanceScoreDiff={isAppearanceScoreDiff}
                scoreDiff={scoreDiff}
              />
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
            onClick={handleFinishGame}
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
        <InputWinType
          winnerInfo={winnerInfo}
          setWinnerInfo={setWinnerInfo}
          openModal={openModal}
          handleBack={handleBack}
        />
      )}
      {isRon && (
        <SelectLoser
          winnerInfo={winnerInfo}
          setWinnerInfo={setWinnerInfo}
          playerName={playerName}
          openModal={openModal}
          handleBack={handleBack}
        />
      )}
      {isTsumo &&
        (isParent ? (
          <InputWinPoint handleBack={handleBack} reset={reset} />
        ) : (
          <InputChildrenPoint handleBack={handleBack} reset={reset} />
        ))}
      {isWinPointForRon && (
        <InputWinPoint handleBack={handleBack} reset={reset} />
      )}
      {isFinishModal && (
        <FinishGameModal gameData={mockGameData} handleBack={handleBack} />
      )}
      {isTempaiModal && (
        <SelectTempaiModal
          playersName={playerName}
          isTEMPAI={mockIsTempaiFlag}
          handleCloseTENPAIModal={handleCloseTempaiModal}
        />
      )}
      {isReach && <ReachVideo selectedReachPlayer={0} />}
      {isAlreadyReach && (
        <AlreadyReachModal noResetReach={handleCloseTempaiModal} />
      )}
    </>
  );
};
