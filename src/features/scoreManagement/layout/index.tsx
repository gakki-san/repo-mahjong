import { AlreadyReachModal } from "@/features/scoreManagement/components/AlreadyReachModal";
import { FinishGameModal } from "@/features/scoreManagement/components/FinishGameModal";
import { InputLoser } from "@/features/scoreManagement/components/InputLoser";
import { InputPointChildrenTsumo } from "@/features/scoreManagement/components/InputPointChildrenTsumo";
import { InputWinPoint } from "@/features/scoreManagement/components/InputWinPoint";
import { InputWinType } from "@/features/scoreManagement/components/InputWinType";
import { ReachVideo } from "@/features/scoreManagement/components/ReachVideo";
import { SelectTempaiModal } from "@/features/scoreManagement/components/SelectTempaiModal";
import { WindowScoreSummary } from "@/features/scoreManagement/components/WindowScoreSummary";
import { useCount } from "@/features/scoreManagement/hooks/useCount";
import { useCurrentDirection } from "@/features/scoreManagement/hooks/useCurrentDirection";
import { useDice } from "@/features/scoreManagement/hooks/useDice";
import { useIsBoolean } from "@/features/scoreManagement/hooks/useIsBoolean";
import { useModalStack } from "@/features/scoreManagement/hooks/useModalStack";
import { usePlayerPoint } from "@/features/scoreManagement/hooks/usePlayerPoint";
import { useReachFlags } from "@/features/scoreManagement/hooks/useReachFlags";
import {
  Player,
  ScoreMap,
  useScore,
  UseScoreActionMap,
} from "@/features/scoreManagement/hooks/useScore";
import { useWinnerInfo } from "@/features/scoreManagement/hooks/useWinnerinfo";
import { playReachAudio } from "@/features/scoreManagement/logic/attemptReach";
import { calculateFinishScore } from "@/features/scoreManagement/logic/calculateFinishScore";
import { calculatePenalty } from "@/features/scoreManagement/logic/calculatePenalty";
import { calculateReachScore } from "@/features/scoreManagement/logic/calculateReachScore";
import { childrenTsumo } from "@/features/scoreManagement/logic/childrenTsumo";
import { closeAllModal } from "@/features/scoreManagement/logic/closeAllModal";
import { countReachPlayers } from "@/features/scoreManagement/logic/countReachPlayers";
import { genarateArrayDirection } from "@/features/scoreManagement/logic/genarateArrayDirection";
import { getWinnerIndexInRotateDirection } from "@/features/scoreManagement/logic/getWinnerIndexInRotateDirection";
import { handleApplyScore } from "@/features/scoreManagement/logic/handleApplyScore";
import { handleScoreDiff } from "@/features/scoreManagement/logic/handleScoreDiff";
import { handleWinPointChange } from "@/features/scoreManagement/logic/handleWinPointChange";
import { makeOnPointChange } from "@/features/scoreManagement/logic/makeOnPointChange";
import { FC, useRef } from "react";

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
  // それぞれのモーダルの開閉を制御
  const [
    currentModal,
    { openModal: openModal, closeModal: closeModal, reset: resetModal },
  ] = useModalStack();
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

  const isTsumo = currentModal === "winPoint" && winnerInfo.winType === "tsumo";
  const isRon = currentModal === "winPoint" && winnerInfo.winType === "ron";
  const isWinnerTypeModal = currentModal === "winType";
  const isInputWinPoint = currentModal === "loser";
  const isAlreadyReachModal = currentModal === "reachConfirm";
  const isReachVideoModal = currentModal === "reachVideo";
  const isTempaiModal = currentModal === "tempai";
  const isFinishGameModal = currentModal === "finish";

  const arrayDirection = genarateArrayDirection(currentDirection);

  const handleSelectedWinner: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    const tappedWinner = Number(event.currentTarget.value) as Player;

    const winnerIndexForScore = getWinnerIndexInRotateDirection(
      arrayDirection,
      tappedWinner,
    );

    openModal("winType");
    setSelectedWinner.set(tappedWinner);
    setWinnerInfo({ winner: winnerIndexForScore });
  };

  const resetReach = () => {
    setReachFlags.update((prev) => ({
      ...prev,
      [selectedReachPlayer]: false,
    }));
    resetModal();
    setScore.set(calculateReachScore(selectedReachPlayer, reachFlags, score));
  };

  const noResetReach = () => {
    resetModal();
  };

  const handleReach = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventReachPlayer = Number(event.currentTarget.value) as Player;
    setSelectedReachPlayer.set(eventReachPlayer);

    if (reachFlags[eventReachPlayer]) {
      const audio = new Audio("/dio.mp3");
      audio.play();
      openModal("reachConfirm");
    } else {
      openModal("reachVideo");
      playReachAudio(eventReachPlayer, resetModal, setReachFlags.update);

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

    closeAllModal(setWinnerInfo, setReachFlags.replace);
    resetModal();
    resetHONBA();
    resetKyotaku();
    setCurrentDirection.rotate();
  };

  const isParent = selectedWinner === 0;
  const handleHONBA = (isParent: boolean) => {
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
      countHonba,
      countKyotaku,
    );
    closeAllModal(setWinnerInfo, setReachFlags.replace);
    resetModal();
    handleHONBA(isParent);
    resetKyotaku();
  };

  const toggleTenpai = (player: Player) => {
    setTEMPAI((prev) => ({ ...prev, [player]: !prev[player] }));
  };

  const handleMoveDirection = () => {
    openModal("tempai");
    addHONBA(countHonba);
  };

  const calculatedPenaltyScore = () => {
    const currentScore = [...score] as ScoreMap;

    const tenpaiCount = Object.values(isTENPAI).filter(Boolean).length;

    return calculatePenalty(currentScore, tenpaiCount, isTENPAI);
  };

  const isParentTEMPAI =
    isTENPAI[arrayDirection.findIndex((item) => item === 0) as Player];

  const selectedWinerPlayer = arrayDirection.indexOf(selectedWinner);

  const handleCloseTENPAIModal = () => {
    if (!isParentTEMPAI) {
      setCurrentDirection.rotate();
    }
    const newScore = calculatedPenaltyScore();
    setScore.set(newScore);
    resetModal();
    setReachFlags.reset();
    addKyotaku(countReachPlayers(reachFlags));
    resetTEMPAI();
  };

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
    openModal("finish");
  };

  const handleBack = () => {
    resetModal();
  };

  const newGameData = (playersName: string[], score: ScoreMap) => {
    return playersName.map((name, index) => {
      const raw = score[index] / 1000;
      const scoreValue = raw === 0 ? "0" : `${raw > 0 ? "+" : ""}${raw}`;
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
      {isWinnerTypeModal && (
        <InputWinType
          winnerInfo={winnerInfo}
          setWinnerInfo={setWinnerInfo}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
      {isTsumo &&
        (isParent ? (
          <InputWinPoint
            handleComplete={handleComplete}
            handleWinPointChange={handleWinPointChange(setWinnerInfo)}
            closeModal={closeModal}
          />
        ) : (
          <InputPointChildrenTsumo
            handleChildrenPoint={makeOnPointChange(setChildrenPoint)}
            handleParentPoint={makeOnPointChange(setParentPoint)}
            handleSetScore={handleSetScore}
            closeModal={closeModal}
          />
        ))}
      {isRon && (
        <InputLoser
          selectedWinner={selectedWinerPlayer}
          setWinnerInfo={setWinnerInfo}
          playerName={playersName}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
      {isInputWinPoint && (
        <InputWinPoint
          handleComplete={handleComplete}
          handleWinPointChange={handleWinPointChange(setWinnerInfo)}
          closeModal={closeModal}
        />
      )}
      {isAlreadyReachModal && (
        <AlreadyReachModal
          resetReach={resetReach}
          noResetReach={noResetReach}
        />
      )}
      {isReachVideoModal && (
        <ReachVideo selectedReachPlayer={selectedReachPlayer} />
      )}
      {isTempaiModal && (
        <SelectTempaiModal
          playersName={playersName}
          isTENPAI={isTENPAI}
          toggleTenpai={toggleTenpai}
          handleCloseTENPAIModal={handleCloseTENPAIModal}
        />
      )}
      {isFinishGameModal && (
        <FinishGameModal gameData={gameData} handleBack={handleBack} />
      )}
    </>
  );
};
