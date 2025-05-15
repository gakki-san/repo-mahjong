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
import { Box, Button, Checkbox, Stack } from "@chakra-ui/react";
import { COLOR } from "@/const/color";

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
  const [isTENPAI, setIsTENPAI] = useReachFlags();
  const [countHonba, { add: addHONBA, reset: resetHONBA }] = useCount();

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
      ) as ScoreMap,
    );

    closeAllModal(
      setWinnerInfo,
      setIsOpen.off,
      setIsShowInputScore.off,
      setReachFlags.replace,
    );
    resetHONBA();
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
    );
    closeAllModal(
      setWinnerInfo,
      setIsOpen.off,
      setIsShowInputScore.off,
      setReachFlags.replace,
    );
    handleHONBA(selectedWinner);
  };

  const toggleTenpai = (player: Player) => {
    setIsTENPAI.update((prev) => ({ ...prev, [player]: !prev[player] }));
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

  const handleCloseTENPAIModal = () => {
    const newScore = calculatePenalty();
    setScore.set(newScore);
    if (!isTENPAI[isTempaiAndWinner]) {
      setCurrentDirection.rotate();
    }
    hideTENPAIModal();
    setReachFlags.reset();
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
          誰がテンパイ？
          <Stack align="flex-start" flex="1" gap="4">
            {playersName.map((name, index) => {
              const player = index as Player;
              return (
                <Checkbox.Root
                  mt={"20px"}
                  key={index}
                  checked={isTENPAI[player]}
                  onChange={() => toggleTenpai(player)}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control color={COLOR.BLACK} />
                  <Checkbox.Label>{name}</Checkbox.Label>
                </Checkbox.Root>
              );
            })}
          </Stack>
          <Button
            color={COLOR.WHITE}
            fontWeight={"bold"}
            bg={COLOR.BLACK}
            onClick={handleCloseTENPAIModal}
          >
            完了
          </Button>
        </Box>
      )}
    </>
  );
};
