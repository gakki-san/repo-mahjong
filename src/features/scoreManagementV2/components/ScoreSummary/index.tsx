import { FC } from "react";
import { Box, Button, Flex, Grid, VStack } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import { useScore } from "@/features/scoreManagementV2/hooks/useScore.ts";
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
import { usePlayerName } from "@/features/scoreManagementV2/hooks/usePlayerName.ts";
import { usePlusScoreRule } from "@/features/scoreManagementV2/hooks/usePlusScoreRule.ts";
import { useRankOrderRule } from "@/features/scoreManagementV2/hooks/useRankOrderRule.ts";
import { useScoreAtom } from "@/globalState/scoreAtom.ts";

export const ScoreSummary: FC = () => {
  const [score] = useScoreAtom();
  const [playerName] = usePlayerName();
  const [rankOrderRule] = useRankOrderRule();
  const [plusScoreRule] = usePlusScoreRule();
  console.log(rankOrderRule, plusScoreRule);
  const [winnerInfo, setWinnerInfo] = useWinnerInfo();
  console.log("勝利条件", winnerInfo);
  const [currentModal, { openModal, closeModal, reset }] = useModalStack();
  const [selectedDirection, { set: setSelectedDirection }] =
    useCurrentDirection();
  const [
    ,
    {
      // rotate: rotateDirection,
      toArray: currentDirectionToArray,
      rotateByWinResult,
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

  const handleRotate = () => {
    const winner = 0;
    rotateByWinResult(winner);
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
        {currentDirectionToArray().map((item, index) => {
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
                score={score}
                handleReach={handleReach}
                setSelectedDirection={setSelectedDirection}
                setWinnerInfo={setWinnerInfo}
                openModal={openModal}
                isAppearanceScoreDiff={isAppearanceScoreDiff}
                scoreDiff={scoreDiff}
                setScoreDiff={setScoreDiff.set}
                onScoreDiff={onScoreDiff}
                offScoreDiff={offScoreDiff}
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
            onClick={handleRotate}
          >
            {/*{countHonba}本場*/}
            rotate
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
          <InputWinPoint
            handleBack={handleBack}
            reset={reset}
            setPoint={setWinnerInfo}
          />
        ) : (
          <InputChildrenPoint
            handleBack={handleBack}
            reset={reset}
            setPoint={setWinnerInfo}
          />
        ))}
      {isWinPointForRon && (
        <InputWinPoint
          handleBack={handleBack}
          reset={reset}
          setPoint={setWinnerInfo}
        />
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
