import { FC, useState } from "react";
import { Player, ScoreMap } from "@/hooks/useScore";
import { useWinnerInfo } from "@/hooks/useWinnerinfo";
import { WindowScoreSummary } from "../WindowScoreSummary";
import { Box } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { InputWinType } from "../InputWinType";

type ScoreSummaryProps = {
  score: ScoreMap;
  setScore: (value: ScoreMap) => void;
  players: string[];
};

export const ScoreSummary: FC<ScoreSummaryProps> = ({
  score,
  // setScore,
  players,
}) => {
  const [winnerInfo, setWinnerInfo] = useWinnerInfo();
  const [selectedWinType, setSelectedWinType] = useState<string | null>(null);

  const selectedWinner: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    console.log(event.currentTarget.value);
    const winner = event.currentTarget.value as Player;
    setWinnerInfo({ winner: winner });
  };
  console.log(winnerInfo);

  if (!score) return;
  // const hoju = "south";
  // const houra = "east";
  // const count = 4000;

  // const handleTsumo = (
  //   winner: Player,
  //   points: number,
  //   players: string[],
  //   score: ScoreMap,
  // ) => {
  //   const newScore: ScoreMap = {} as ScoreMap;
  //   if (!score || !newScore) return;
  //   const losePointPerson = players.length - 1;
  //   for (const player of players) {
  //     const person = player as Player;
  //     if (person === winner) {
  //       newScore[person] = score[person] + points * losePointPerson;
  //     } else {
  //       newScore[person] = score[person] - points;
  //     }
  //   }
  //   setScore(newScore);
  // };

  // const handleRon = (
  //   loser: Player,
  //   winner: Player,
  //   points: number,
  //   score: ScoreMap,
  // ) => {
  //   if (!score) return;
  //   const newScore = {
  //     ...score,
  //     [winner]: score[winner] + points,
  //     [loser]: score[loser] - points,
  //   };

  //   setScore(newScore);
  // };
  const isClickedWinner = winnerInfo.winner;
  const isTsumo = selectedWinType === "tsumo";
  const isRon = selectedWinType === "ron";

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
      {isTsumo ? (
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
          tsumo
        </Box>
      ) : isRon ? (
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
          ron
        </Box>
      ) : null}
    </>
  );
};
