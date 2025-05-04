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
import { Box, Button, Flex, NumberInput } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { childrenTsumo } from "@/logic/childrenTsumo";
import { useReachFlags } from "@/hooks/useReachFlags";
import { usePlayerPoint } from "@/hooks/usePlayerPoint";
import { playReachAudio } from "@/logic/attemptReach";
import { useCurrentDirection } from "@/hooks/useCurrentDirection";

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
  const [currentDirection, setCurrentDirection] = useCurrentDirection();
  const [winnerInfo, setWinnerInfo] = useWinnerInfo();
  const [isShowInputScore, setIsShowInputScore] = useIsBoolean();
  const [isOpen, setIsOpen] = useIsBoolean(false);
  const [childrenPoint, setChildrenPoint] = usePlayerPoint();
  const [parentPoint, setParentPoint] = usePlayerPoint();

  const [reachFlags, setReachFlags] = useReachFlags();
  const [isPopupOpen, setIsPopupOpen] = useIsBoolean();
  const [isShowReachModal, setIsShowReachModal] = useIsBoolean();
  const [selectedReachPlayer, setSelectedReachPlayer] = useState(0);
  const [selectedWinner, setSelectedWinner] = useState(0);
  const [isClickedWinner, setIsClickedWinner] = useIsBoolean();

  const gameMaster = [
    { key: 0, label: "東家" },
    { key: 1, label: "北家" },
    { key: 2, label: "西家" },
    { key: 3, label: "南家" },
  ] as GameMaster[];

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

  // rotateされたcurrentDirectionとwinnerを受け取り、今回の勝者を示すnumberを返す
  const getWinnerIndexInRotateDirection = (
    rotateDirection: number[],
    winner: Player,
  ) => {
    return rotateDirection.indexOf(winner);
  };

  const genaratedArrayDirection = genarateArrayDirection(currentDirection);

  const rotatedGameMaster = [
    ...gameMaster.slice(currentDirection),
    ...gameMaster.slice(0, currentDirection),
  ];

  const handleMoveDirection = () => {
    setCurrentDirection();
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
      setReachFlags.update((prev) => ({
        ...prev,
        [eventReachPlayer]: true,
      }));

      setIsPopupOpen.on();

      playReachAudio(eventReachPlayer, setIsPopupOpen.off);

      calculateReachScore("reach", eventReachPlayer);
    }
  };

  const isTsumo = winnerInfo.winType === "tsumo";
  const isRon = winnerInfo.winType === "ron";

  const handleSelectedWinner: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    const winner = Number(event.currentTarget.value) as Player;
    const regenarateWinner = getWinnerIndexInRotateDirection(
      genaratedArrayDirection,
      winner,
    ) as Player;

    setIsClickedWinner.on();
    setSelectedWinner(winner);
    setWinnerInfo({ winner: regenarateWinner });
  };

  if (!score) return;
  console.log("currentDirection", currentDirection);
  console.log("selectedReachPlayer", selectedReachPlayer);

  const handleComplete = () => {
    handleApplyScore(winnerInfo, setScore.set, players, score);
    closeAllModal(setWinnerInfo, setIsOpen.off, setIsShowInputScore.off);
  };

  const handleParentPoint: ComponentProps<
    typeof NumberInput.Root
  >["onValueChange"] = (event) => {
    setParentPoint(event.valueAsNumber);
  };

  const handleChildrenPoint: ComponentProps<
    typeof NumberInput.Root
  >["onValueChange"] = (event) => {
    setChildrenPoint(event.valueAsNumber);
  };

  const handleSetScore = () => {
    setScore.set(
      childrenTsumo(
        childrenPoint,
        parentPoint,
        winnerInfo.winner,
        score,
        currentDirection,
      ) as ScoreMap,
    );

    closeAllModal(setWinnerInfo, setIsOpen.off, setIsShowInputScore.off);
  };

  console.log("winnerInfo.winner ", winnerInfo.winner);

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
      {isOpen &&
        isTsumo &&
        (selectedWinner === 0 ? (
          <InputWinPoint
            handleComplete={handleComplete}
            handleWinPointChange={handleWinPointChange(setWinnerInfo)}
          />
        ) : (
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
            子
            <NumberInput.Root
              onValueChange={handleChildrenPoint}
              w={"200px"}
              margin={"10px 0px 40px 0px"}
              min={300}
              max={48000}
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
            親
            <NumberInput.Root
              onValueChange={handleParentPoint}
              w={"200px"}
              min={500}
              max={48000}
              mt={"20px"}
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
            <Button
              textStyle="1xl"
              mt={"50px"}
              fontWeight="bold"
              onClick={handleSetScore}
              paddingInline={"50px"}
            >
              決定
            </Button>
          </Box>
        ))}
      {isOpen && isRon && (
        <InputLoser
          winnerInfo={winnerInfo}
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
            貴様、既に立直しているな？ 立直取り消す？
            <Button
              mt={"20px"}
              color={COLOR.WHITE}
              bg={COLOR.BLACK}
              onClick={resetReach}
            >
              はい
            </Button>
            <Button
              mt={"20px"}
              color={COLOR.WHITE}
              bg={COLOR.BLACK}
              onClick={noResetReach}
            >
              いいえ
            </Button>
          </Box>
        </>
      )}

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
              {selectedReachPlayer === 1 ? (
                <iframe
                  src="/atmic.mp4"
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
              ) : (
                <iframe
                  src="/reach.mp4"
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
              )}
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
};
