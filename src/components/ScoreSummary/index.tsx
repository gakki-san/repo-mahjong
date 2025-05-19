import { FC, useRef } from "react";
import {
  Player,
  ScoreMap,
  useScore,
  UseScoreActionMap,
} from "@/hooks/useScore";
import { useWinnerInfo } from "@/hooks/useWinnerinfo";
import { WindowScoreSummary } from "../WindowScoreSummary";
import { InputWinType } from "../InputWinType";
import { InputLoser } from "../InputLoser";
import { useIsBoolean } from "@/hooks/useIsBoolean";
import { InputWinPoint } from "../InputWinPoint";
import { closeAllModal } from "@/logic/closeAllModal";
import { handleApplyScore } from "@/logic/handleApplyScore";
import { handleWinPointChange } from "@/logic/handleWinPointChange";
import { childrenTsumo } from "@/logic/childrenTsumo";
import { useReachFlags } from "@/hooks/useReachFlags";
import { usePlayerPoint } from "@/hooks/usePlayerPoint";
import { playReachAudio } from "@/logic/attemptReach";
import { useCurrentDirection } from "@/hooks/useCurrentDirection";
import { InputPointChildrenTsumo } from "@/components/InputPointChildrenTsumo";
import { AlreadyReachModal } from "../AlreadyReachModal";
import { ReachVideo } from "../ReachVideo";
import { genarateArrayDirection } from "@/logic/genarateArrayDirection";
import { getWinnerIndexInRotateDirection } from "@/logic/getWinnerIndexInRotateDirection";
import { calculateReachScore } from "@/logic/calculateReachScore";
import { makeOnPointChange } from "@/logic/makeOnPointChange";
import { useCount } from "@/hooks/useCount";
import { SelectTempaiModal } from "../SelectTempaiModal";
import { calculatePenalty } from "@/logic/calculatePenalty";
import { countReachPlayers } from "@/logic/countReachPlayers";
import { handleScoreDiff } from "@/logic/handleScoreDiff";
import { useDice } from "@/hooks/useDice";
import { Box, Button, Flex } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { calculateFinishScore } from "@/logic/calculateFinishScore";

type ScoreSummaryProps = {
  score: ScoreMap;
  setScore: UseScoreActionMap;
  players: string[];
  playersName: string[];
  returnPoint: number;
  umaRule: number;
};

export type IsShowType = {
  tsumo: boolean;
  ron: boolean;
};

export const ScoreSummary: FC<ScoreSummaryProps> = ({
  score,
  setScore,
  players,
  playersName,
  returnPoint,
  umaRule,
}) => {
  // useBoolean。それぞれのモーダルの開閉を制御
  const [isShowInputScore, setIsShowInputScore] = useIsBoolean();
  const [isOpen, setIsOpen] = useIsBoolean();
  const [isPopupOpen, setIsPopupOpen] = useIsBoolean();
  const [isShowReachModal, setIsShowReachModal] = useIsBoolean();
  const [isClickedWinner, setIsClickedWinner] = useIsBoolean();
  const [isFinishGame, { on: finishGame, off: closeFinishModal }] =
    useIsBoolean();
  const [isTENPAIModal, { on: showTENPAIModal, off: hideTENPAIModal }] =
    useIsBoolean();
  const [isAppearanceScoreDiff, { on: onScoreDiff, off: offScoreDiff }] =
    useIsBoolean();

  const [currentDirection, setCurrentDirection] = useCurrentDirection();
  const [scoreDiff, setScoreDiff] = useScore();
  const [selectedReachPlayer, setSelectedReachPlayer] = useCurrentDirection();
  const [selectedWinner, setSelectedWinner] = useCurrentDirection();
  const [winnerInfo, setWinnerInfo] = useWinnerInfo();
  const [childrenPoint, setChildrenPoint] = usePlayerPoint();
  const [parentPoint, setParentPoint] = usePlayerPoint();
  const [reachFlags, setReachFlags] = useReachFlags();
  const [isTENPAI, { update: setTEMPAI, reset: resetTEMPAI }] = useReachFlags();
  const [countHonba, { increment: addHONBA, reset: resetHONBA }] = useCount();
  const [countKyotaku, { add: addKyotaku, reset: resetKyotaku }] = useCount();
  const [dice, rollBoth] = useDice();

  const arrayDirection = genarateArrayDirection(currentDirection);

  const handleSelectedWinner: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    const tappedWinner = Number(event.currentTarget.value) as Player;

    const winnerIndexForScore = getWinnerIndexInRotateDirection(
      arrayDirection,
      tappedWinner,
    );

    setIsClickedWinner.on();
    setSelectedWinner.set(tappedWinner);
    setWinnerInfo({ winner: winnerIndexForScore });
  };

  const resetReach = () => {
    setReachFlags.update((prev) => ({
      ...prev,
      [selectedReachPlayer]: false,
    }));
    setIsShowReachModal.off();
    setScore.set(calculateReachScore(selectedReachPlayer, reachFlags, score));
  };

  const noResetReach = () => {
    setIsShowReachModal.off();
  };

  const handleReach = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventReachPlayer = Number(event.currentTarget.value) as Player;
    setSelectedReachPlayer.set(eventReachPlayer);

    if (reachFlags[eventReachPlayer]) {
      const audio = new Audio("/dio.mp3");
      audio.play();
      setIsShowReachModal.on();
    } else {
      setIsPopupOpen.on();
      playReachAudio(
        eventReachPlayer,
        setIsPopupOpen.off,
        setReachFlags.update,
      );

      setScore.set(calculateReachScore(eventReachPlayer, reachFlags, score));
    }
  };

  const handleSetScore = () => {
    setScore.set(
      childrenTsumo(
        childrenPoint,
        parentPoint,
        winnerInfo.winner,
        score,
        currentDirection,
        reachFlags,
        countHonba,
        countKyotaku,
      ) as ScoreMap,
    );

    closeAllModal(
      setWinnerInfo,
      setIsOpen.off,
      setIsShowInputScore.off,
      setReachFlags.replace,
    );
    resetHONBA();
    resetKyotaku();
    setCurrentDirection.rotate();
  };

  const handleHONBA = (selectedWinner: Player) => {
    const isParent = selectedWinner === 0;
    if (isParent) {
      addHONBA(countHonba);
    } else {
      resetHONBA();
      setCurrentDirection.rotate();
    }
  };

  const handleComplete = () => {
    handleApplyScore(
      winnerInfo,
      setScore.set,
      players,
      score,
      reachFlags,
      arrayDirection,
      countHonba,
      countKyotaku,
    );
    closeAllModal(
      setWinnerInfo,
      setIsOpen.off,
      setIsShowInputScore.off,
      setReachFlags.replace,
    );
    handleHONBA(selectedWinner);
    resetKyotaku();
  };

  const toggleTenpai = (player: Player) => {
    setTEMPAI((prev) => ({ ...prev, [player]: !prev[player] }));
  };

  const handleMoveDirection = () => {
    showTENPAIModal();
    addHONBA(countHonba);
  };

  const calculatedPenaltyScore = () => {
    const currentScore = [...score] as ScoreMap;

    const tenpaiCount = Object.values(isTENPAI).filter(Boolean).length;

    return calculatePenalty(currentScore, tenpaiCount, isTENPAI);
  };

  const isParentTEMPAI =
    isTENPAI[arrayDirection.findIndex((item) => item === 0) as Player];

  const selectedLosers = arrayDirection.indexOf(selectedWinner);

  const handleCloseTENPAIModal = () => {
    if (!isParentTEMPAI) {
      setCurrentDirection.rotate();
    }
    const newScore = calculatedPenaltyScore();
    setScore.set(newScore);
    hideTENPAIModal();
    setReachFlags.reset();
    addKyotaku(countReachPlayers(reachFlags));
    resetTEMPAI();
  };

  const isTsumo = isOpen && winnerInfo.winType === "tsumo";
  const isRon = isOpen && winnerInfo.winType === "ron";
  const isParent = selectedWinner === 0;

  const timerRef = useRef<number | null>(null);
  const handlePressStart = (playerIndex: Player) => {
    return () => {
      onScoreDiff();
      setScoreDiff.set(handleScoreDiff(playerIndex, score));
      if (timerRef.current == null) {
        timerRef.current = window.setInterval(() => {}, 1000);
      }
    };
  };

  const handlePressEnd = () => {
    offScoreDiff();
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleFinishGame = () => {
    finishGame();
  };

  const handleBack = () => {
    closeFinishModal();
  };

  const newGameData = (playersName: string[], score: ScoreMap) => {
    return playersName.map((name, index) => {
      const raw = score[index] / 1000;
      const scoreValue = raw === 0 ? 0 : `${raw > 0 ? "+" : ""}${raw}`;
      return {
        id: (index + 1).toString(),
        name: name,
        score: scoreValue,
      };
    });
  };

  const gameData = newGameData(
    playersName,
    calculateFinishScore(score, returnPoint, umaRule),
  );

  return (
    <>
      <WindowScoreSummary
        selectedWinner={handleSelectedWinner}
        score={score}
        handleReach={handleReach}
        handleMoveDirection={handleMoveDirection}
        currentDirectionArray={arrayDirection}
        palyerName={playersName}
        countHonba={countHonba}
        countKyotaku={countKyotaku}
        handlePressStart={handlePressStart}
        handlePressEnd={handlePressEnd}
        isAppearanceScoreDiff={isAppearanceScoreDiff}
        scoreDiff={scoreDiff}
        dice={dice}
        rollBoth={rollBoth}
        handleFinishGame={handleFinishGame}
      />
      {isClickedWinner && (
        <InputWinType
          winnerInfo={winnerInfo}
          setWinnerInfo={setWinnerInfo}
          players={players}
          setIsOpen={setIsOpen.on}
          setIsClickedWinner={setIsClickedWinner.off}
        />
      )}
      {isTsumo &&
        (isParent ? (
          <InputWinPoint
            handleComplete={handleComplete}
            handleWinPointChange={handleWinPointChange(setWinnerInfo)}
          />
        ) : (
          <InputPointChildrenTsumo
            handleChildrenPoint={makeOnPointChange(setChildrenPoint)}
            handleParentPoint={makeOnPointChange(setParentPoint)}
            handleSetScore={handleSetScore}
          />
        ))}
      {isRon && (
        <InputLoser
          selectedWinner={selectedLosers}
          setWinnerInfo={setWinnerInfo}
          ShowInputScore={setIsShowInputScore.on}
          setIsOpen={setIsOpen.off}
          playerName={playersName}
        />
      )}
      {isShowInputScore && (
        <InputWinPoint
          handleComplete={handleComplete}
          handleWinPointChange={handleWinPointChange(setWinnerInfo)}
        />
      )}
      {isShowReachModal && (
        <AlreadyReachModal
          resetReach={resetReach}
          noResetReach={noResetReach}
        />
      )}
      {isPopupOpen && <ReachVideo selectedReachPlayer={selectedReachPlayer} />}
      {isTENPAIModal && (
        <SelectTempaiModal
          playersName={playersName}
          isTENPAI={isTENPAI}
          toggleTenpai={toggleTenpai}
          handleCloseTENPAIModal={handleCloseTENPAIModal}
        />
      )}
      {isFinishGame && (
        <Box
          pos={"absolute"}
          top={0}
          alignItems={"center"}
          justifyContent={"center"}
          flexDir={"column"}
          display={"flex"}
          w={"100vw"}
          h={"100vh"}
          p={"50px"}
          bg={COLOR.WHITE}
        >
          <Box mb={"20px"} fontSize={"30px"} fontWeight={"bold"}>
            終局結果
          </Box>
          {gameData.map((item) => (
            <Flex
              key={item.id}
              justify={"space-between"}
              gap={"10px"}
              w={"150px"}
              mt={"10px"}
              fontSize={"20px"}
              textAlign={"center"}
            >
              <Box>{item.name}</Box>
              <Box>{item.score}</Box>
            </Flex>
          ))}
          <Button
            mt={"20px"}
            color={COLOR.BLACK}
            fontWeight={"bold"}
            bg={"none"}
            border={"solid"}
            onClick={handleBack}
          >
            戻る
          </Button>
        </Box>
      )}
    </>
  );
};
