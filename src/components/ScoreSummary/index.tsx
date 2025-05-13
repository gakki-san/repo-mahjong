import { ComponentProps, FC } from "react";
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
import { NumberInput } from "@chakra-ui/react";
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

  const [currentDirection, setCurrentDirection] = useCurrentDirection();
  const [selectedReachPlayer, setSelectedReachPlayer] = useCurrentDirection();
  const [selectedWinner, setSelectedWinner] = useCurrentDirection();
  const [winnerInfo, setWinnerInfo] = useWinnerInfo();
  const [childrenPoint, setChildrenPoint] = usePlayerPoint();
  const [parentPoint, setParentPoint] = usePlayerPoint();
  const [reachFlags, setReachFlags] = useReachFlags();

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
      setScore.set(calculateReachScore(selectedReachPlayer, reachFlags, score));
    }
  };

  const makeOnPointChange =
    (
      setter: (value: number) => void,
    ): ComponentProps<typeof NumberInput.Root>["onValueChange"] =>
    (details) => {
      setter(details.valueAsNumber);
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
      ) as ScoreMap,
    );

    closeAllModal(
      setWinnerInfo,
      setIsOpen.off,
      setIsShowInputScore.off,
      setReachFlags.replace,
    );
  };

  const handleComplete = () => {
    handleApplyScore(
      winnerInfo,
      setScore.set,
      players,
      score,
      reachFlags,
      arrayDirection,
    );
    closeAllModal(
      setWinnerInfo,
      setIsOpen.off,
      setIsShowInputScore.off,
      setReachFlags.replace,
    );
  };

  const handleMoveDirection = () => {
    setCurrentDirection.rotate();
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
    </>
  );
};
