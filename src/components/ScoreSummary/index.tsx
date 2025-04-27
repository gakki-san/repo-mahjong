import { FC, useEffect, useState } from "react";
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
  const [selectedWinType, setSelectedWinType] = useState<string | null>(null);
  const [isShowInputScore, setIsShowInputScore] = useIsBoolean();

  const [isShow, setIsShow] = useState<IsShowType>({
    tsumo: false,
    ron: false,
  });
  useEffect(() => {
    if (selectedWinType === "tsumo") {
      setIsShow({ tsumo: true, ron: false });
    } else if (selectedWinType === "ron") {
      setIsShow({ tsumo: false, ron: true });
    }
  }, [selectedWinType]);

  const selectedWinner: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    const winner = event.currentTarget.value as Player;
    setWinnerInfo({ winner: winner });
  };
  console.log(isShow);

  if (!score) return;
  const isClickedWinner = winnerInfo.winner;
  // const isTsumo = selectedWinType === "tsumo" ? setIsShow({ tsumo: true, ron: false });
  // const isRon = selectedWinType === "ron";

  const allClose = () => {
    setWinnerInfo({
      winType: null,
      winner: null,
      loser: null,
      winPoints: null,
    });
    setIsShow({ tsumo: false, ron: false });
    setSelectedWinType(null);
    setIsShowInputScore.off();
  };
  console.log("これがろん", isShow.ron);

  const handleComplete = () => {
    const winner = winnerInfo.winner as Player;
    const point = winnerInfo.winPoints as number;
    const loser = winnerInfo.loser as Player[];

    if (winnerInfo.winType === "tsumo") {
      const newScore = handleTsumo(winner, point, players, score) as ScoreMap;
      setScore(newScore);
    } else {
      console.log(loser[0]);
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
          setSelectedWinType={setSelectedWinType}
        />
      )}
      {isShow.tsumo && (
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
      {isShow.ron && (
        <InputLoser
          winnerInfo={winnerInfo}
          setWinnerInfo={setWinnerInfo}
          ShowInputScore={setIsShowInputScore.on}
          setIsShow={setIsShow}
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
