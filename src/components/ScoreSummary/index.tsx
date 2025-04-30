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
import { Box, Button, NumberInput } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { childrenTsumo } from "@/logic/childrenTsumo";

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
  const [childrenPoint, setChildrenPoint] = useState(0);
  const [parentPoint, setParentPoint] = useState(0);

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
    console.log(event.valueAsNumber);
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
      <WindowScoreSummary selectedWinner={selectedWinner} score={score} />
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
    </>
  );
};
