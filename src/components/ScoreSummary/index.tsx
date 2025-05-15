import { FC } from "react";
import { Player, ScoreMap, UseScoreActionMap } from "@/hooks/useScore";
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

type ScoreSummaryProps = {
  score: ScoreMap;
  setScore: UseScoreActionMap;
  players: string[];
  playersName: string[];
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
}) => {
  // useBoolean。それぞれのモーダルの開閉を制御
  const [isShowInputScore, setIsShowInputScore] = useIsBoolean();
  const [isOpen, setIsOpen] = useIsBoolean();
  const [isPopupOpen, setIsPopupOpen] = useIsBoolean();
  const [isShowReachModal, setIsShowReachModal] = useIsBoolean();
  const [isClickedWinner, setIsClickedWinner] = useIsBoolean();
  const [isTENPAIModal, { on: showTENPAIModal, off: hideTENPAIModal }] =
    useIsBoolean();

  const [currentDirection, setCurrentDirection] = useCurrentDirection();
  const [selectedReachPlayer, setSelectedReachPlayer] = useCurrentDirection();
  const [selectedWinner, setSelectedWinner] = useCurrentDirection();
  const [winnerInfo, setWinnerInfo] = useWinnerInfo();
  const [childrenPoint, setChildrenPoint] = usePlayerPoint();
  const [parentPoint, setParentPoint] = usePlayerPoint();
  const [reachFlags, setReachFlags] = useReachFlags();
  const [isTENPAI, { update: setTEMPAI, reset: resetTEMPAI }] = useReachFlags();
  const [countHonba, { increment: addHONBA, reset: resetHONBA }] = useCount();
  const [countKyotaku, { add: addKyotaku, reset: resetKyotaku }] = useCount();

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

  const isTempaiAndWinner = arrayDirection.findIndex(
    (item) => item === 0,
  ) as Player;

  const handleMoveDirection = () => {
    showTENPAIModal();
    addHONBA(countHonba);
  };

  const calculatePenalty = () => {
    const penaltyPoint = 1000;

    const peneltySecondPoint = 1500;

    const currentScore = [...score];

    const tenpaiCount = Object.values(isTENPAI).filter(Boolean).length;

    if (tenpaiCount === 0 || tenpaiCount === 4) {
      return currentScore as ScoreMap;
    }
    currentScore.forEach((_, index) => {
      const isTenpai = isTENPAI[index as Player];
      if (tenpaiCount === 1) {
        currentScore[index] += isTenpai ? penaltyPoint * 3 : -penaltyPoint;
      } else if (tenpaiCount === 2) {
        currentScore[index] += isTenpai
          ? peneltySecondPoint
          : -peneltySecondPoint;
      } else if (tenpaiCount === 3) {
        currentScore[index] += isTenpai ? penaltyPoint : -penaltyPoint * 3;
      }
    });

    return currentScore as ScoreMap;
  };

  const currentCountKyotaku = () => {
    const countReachPlayer = Object.values(reachFlags).filter(
      (player) => player === true,
    ).length;
    return countReachPlayer;
  };

  const handleCloseTENPAIModal = () => {
    if (!isTENPAI[isTempaiAndWinner]) {
      setCurrentDirection.rotate();
    }
    const newScore = calculatePenalty();
    setScore.set(newScore);
    hideTENPAIModal();
    setReachFlags.reset();
    addKyotaku(currentCountKyotaku());
    resetTEMPAI();
  };

  const isTsumo = isOpen && winnerInfo.winType === "tsumo";
  const isRon = isOpen && winnerInfo.winType === "ron";
  const isParent = selectedWinner === 0;

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
          selectedWinner={selectedWinner}
          setWinnerInfo={setWinnerInfo}
          ShowInputScore={setIsShowInputScore.on}
          setIsOpen={setIsOpen.off}
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
    </>
  );
};
