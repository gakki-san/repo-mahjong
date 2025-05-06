import { ComponentProps, FC, useState } from "react";
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

type ScoreSummaryProps = {
  score: ScoreMap;
  setScore: UseScoreActionMap;
  players: string[];
};
export type GameMaster = {
  key: Player;
  label: string;
};

export type IsShowType = {
  tsumo: boolean;
  ron: boolean;
};

export const ScoreSummary: FC<ScoreSummaryProps> = ({
  score,
  setScore,
  players,
}) => {
  // useBoolean。それぞれのモーダルの開閉を制御
  const [isShowInputScore, setIsShowInputScore] = useIsBoolean();
  const [isOpen, setIsOpen] = useIsBoolean();
  const [isPopupOpen, setIsPopupOpen] = useIsBoolean();
  const [isShowReachModal, setIsShowReachModal] = useIsBoolean();
  const [isClickedWinner, setIsClickedWinner] = useIsBoolean();

  // 現在の上側にいるdirection(number)を示す。setでrotateする。
  const [currentDirection, setCurrentDirection] = useCurrentDirection();
  const [winnerInfo, setWinnerInfo] = useWinnerInfo();
  const [childrenPoint, setChildrenPoint] = usePlayerPoint();
  const [parentPoint, setParentPoint] = usePlayerPoint();
  const [reachFlags, setReachFlags] = useReachFlags();

  const [selectedReachPlayer, setSelectedReachPlayer] = useState(0);
  const [selectedWinner, setSelectedWinner] = useState(0);

  // todo: player名を入力させるならここと統合させて画面に描画あり？その場合は、親だけ別で表示させるようにする
  const gameMaster = [
    { key: 0, label: "東家" },
    { key: 1, label: "北家" },
    { key: 2, label: "西家" },
    { key: 3, label: "南家" },
  ] as GameMaster[];

  // rotateされたkeyとlabelを定義
  // todo: genarateArrayDirectionと統合できないかな
  const rotatedGameMaster = [
    ...gameMaster.slice(currentDirection),
    ...gameMaster.slice(0, currentDirection),
  ];

  // direction(number)を受け取り、引数が0番目にくる連番配列を返す
  const genarateArrayDirection = (
    currentDirection: 0 | 1 | 2 | 3,
  ): number[] => {
    const base = [0, 1, 2, 3];
    return [
      ...base.slice(currentDirection),
      ...base.slice(0, currentDirection),
    ];
  };
  const arrayDirection = genarateArrayDirection(currentDirection);

  // rotateされたcurrentDirectionとwinnerを受け取り、今回の勝者を示すnumberを返す
  const getWinnerIndexInRotateDirection = (
    rotateDirection: number[],
    winner: Player,
  ) => {
    return rotateDirection.indexOf(winner);
  };

  const handleSelectedWinner: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    const tappedWinner = Number(event.currentTarget.value) as Player;

    const winnerIndexForScore = getWinnerIndexInRotateDirection(
      arrayDirection,
      tappedWinner,
    ) as Player;

    setIsClickedWinner.on();
    setSelectedWinner(tappedWinner);
    setWinnerInfo({ winner: winnerIndexForScore });
  };

  const resetReach = () => {
    setReachFlags.update((prev) => ({
      ...prev,
      [selectedReachPlayer]: false,
    }));
    setIsShowReachModal.off();
    calculateReachScore("unreach", selectedReachPlayer);
  };

  const noResetReach = () => {
    setIsShowReachModal.off();
  };

  const calculateReachScore = (type: string, player: number) => {
    if (score === null) return;
    const reachPoint = 1000;
    const newScore = [...score] as ScoreMap;
    if (type === "reach") {
      newScore[player] -= reachPoint;
      setScore.set(newScore);
    } else {
      newScore[player] += reachPoint;
      setScore.set(newScore);
    }
  };

  const handleReach = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventReachPlayer = Number(event.currentTarget.value) as Player;
    setSelectedReachPlayer(eventReachPlayer);

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
      calculateReachScore("reach", eventReachPlayer);
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
    setCurrentDirection();
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
        gameMasterOrder={rotatedGameMaster}
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
