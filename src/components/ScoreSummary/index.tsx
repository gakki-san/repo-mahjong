import { ComponentProps, FC, useState } from "react";
import { Player, ScoreMap } from "@/hooks/useScore";
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

type ScoreSummaryProps = {
  score: ScoreMap;
  setScore: (value: ScoreMap) => void;
  players: string[];
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
  const [winnerInfo, setWinnerInfo] = useWinnerInfo();
  const [isShowInputScore, setIsShowInputScore] = useIsBoolean();
  const [isOpen, setIsOpen] = useIsBoolean(false);
  const [childrenPoint, setChildrenPoint] = usePlayerPoint();
  const [parentPoint, setParentPoint] = usePlayerPoint();

  const [reachFlags, setReachFlags] = useReachFlags();
  const [isPopupOpen, setIsPopupOpen] = useIsBoolean();
  const [isShowReachModal, setIsShowReachModal] = useIsBoolean();
  const [selectedReachPlayer, setSelectedReachPlayer] = useState("");

  const resetReach = () => {
    setReachFlags.update((prev) => ({
      ...prev,
      [selectedReachPlayer]: false,
    }));
    setIsShowReachModal.off();
    calculateReachScore("minus", selectedReachPlayer);
  };

  const noResetReach = () => {
    setIsShowReachModal.off();
  };
  const calculateReachScore = (type: string, player: string) => {
    const reachPlayer = player as Player;
    if (score === null) return;
    const reachPoint = 1000;
    if (type === "plus") {
      setScore({
        ...score,
        [player]: score[reachPlayer] - reachPoint,
      });
    } else {
      setScore({
        ...score,
        [player]: score[reachPlayer] + reachPoint,
      });
    }
  };

  const handleReach = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventReachPlayer = event.currentTarget.value as Player;
    setSelectedReachPlayer(eventReachPlayer);

    if (reachFlags[eventReachPlayer]) {
      const audio = new Audio("public/dio.mp3");
      audio.play();
      setIsShowReachModal.on();
    } else {
      setReachFlags.update((prev) => ({
        ...prev,
        [eventReachPlayer]: true,
      }));

      setIsPopupOpen.on();

      const audio = new Audio("public/audio.mp3");
      audio.addEventListener("ended", () => {
        setIsPopupOpen.off();
      });

      if (eventReachPlayer !== "south") {
        audio.play();
      } else {
        setTimeout(() => {
          setIsPopupOpen.off();
        }, 3000);
      }
      calculateReachScore("plus", eventReachPlayer);
    }
  };

  const isTsumo = winnerInfo.winType === "tsumo";
  const isRon = winnerInfo.winType === "ron";

  const selectedWinner: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    const winner = event.currentTarget.value as Player;
    setWinnerInfo({ winner: winner });
  };

  if (!score) return;
  const isClickedWinner = winnerInfo.winner;

  const handleComplete = () => {
    handleApplyScore(winnerInfo, setScore, players, score);
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
    console.log(event.valueAsNumber);
    setChildrenPoint(event.valueAsNumber);
  };

  const handleSetScore = () => {
    if (!winnerInfo.winner) return;
    setScore(
      childrenTsumo(childrenPoint, parentPoint, winnerInfo.winner, score),
    );

    closeAllModal(setWinnerInfo, setIsOpen.off, setIsShowInputScore.off);
  };

  return (
    <>
      <WindowScoreSummary
        selectedWinner={selectedWinner}
        score={score}
        handleReach={handleReach}
      />
      {isClickedWinner && (
        <InputWinType
          winnerInfo={winnerInfo}
          setWinnerInfo={setWinnerInfo}
          players={players}
          setIsOpen={setIsOpen.on}
        />
      )}
      {isOpen &&
        isTsumo &&
        (winnerInfo.winner === "east" ? (
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
              {selectedReachPlayer === "south" ? (
                <iframe
                  src="public/atmic.mp4"
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
                  src="public/reach.mp4"
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
