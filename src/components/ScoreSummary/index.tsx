import { FC } from "react";
import { Player, ScoreMap } from "@/hooks/useScore";
import { useWinnerInfo } from "@/hooks/useWinnerinfo";
import { WindowScoreSummary } from "../WindowScoreSummary";
import { Box, Button, NumberInput } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { InputWinType } from "../InputWinType";
import { InputLoser } from "../InputLoser";
import { useIsBoolean } from "@/hooks/useIsBoolean";
import { handleTsumo } from "@/logic/tsumo";
import { handleRon } from "@/logic/ron";

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

  const allClose = () => {
    setWinnerInfo({
      winType: null,
      winner: null,
      loser: null,
      winPoints: null,
    });
    setIsOpen.off();
    setIsShowInputScore.off();
  };

  const handleComplete = () => {
    if (winnerInfo.winPoints === null) return;
    const winner = winnerInfo.winner as Player;
    const point = winnerInfo.winPoints;
    const loser = winnerInfo.loser as Player[];

    if (winnerInfo.winType === "tsumo") {
      const newScore = handleTsumo(winner, point, players, score) as ScoreMap;
      setScore(newScore);
    } else {
      const newScore = handleRon(loser[0], winner, point, score) as ScoreMap;
      setScore(newScore);
    }

    allClose();
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
      {isOpen && isTsumo && (
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
          点数入力
          <NumberInput.Root
            onValueChange={(event) => {
              const winnerPoint = event.valueAsNumber;
              setWinnerInfo({
                winPoints: winnerPoint,
              });
            }}
            w={"200px"}
            min={300}
            max={48000}
          >
            <NumberInput.Control />
            <NumberInput.Input />
          </NumberInput.Root>
          <Button
            textStyle="1xl"
            mt={"50px"}
            fontWeight="bold"
            onClick={handleComplete}
            paddingInline={"50px"}
          >
            決定
          </Button>
        </Box>
      )}
      {isOpen && isRon && (
        <InputLoser
          winnerInfo={winnerInfo}
          setWinnerInfo={setWinnerInfo}
          ShowInputScore={setIsShowInputScore.on}
          setIsOpen={setIsOpen.off}
        />
      )}
      {isShowInputScore && (
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
          点数入力
          <NumberInput.Root
            onValueChange={(event) => {
              const winnerPoint = event.valueAsNumber;
              setWinnerInfo({
                winPoints: winnerPoint,
              });
            }}
            w={"200px"}
            min={300}
            max={48000}
          >
            <NumberInput.Control />
            <NumberInput.Input />
          </NumberInput.Root>
          <Button
            textStyle="1xl"
            mt={"50px"}
            fontWeight="bold"
            onClick={handleComplete}
            paddingInline={"50px"}
          >
            決定
          </Button>
        </Box>
      )}
    </>
  );
};
