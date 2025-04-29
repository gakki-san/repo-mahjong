import { FC } from "react";
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

  const handleComplete = () => {
    handleApplyScore(winnerInfo, setScore, players, score);
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
      {isOpen && isTsumo && (
        <InputWinPoint
          handleComplete={handleComplete}
          handleWinPointChange={handleWinPointChange(setWinnerInfo)}
        />
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
        <InputWinPoint
          handleComplete={handleComplete}
          handleWinPointChange={handleWinPointChange(setWinnerInfo)}
        />
      )}
      {/* <Box
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
        kodomotsumo
      </Box> */}
    </>
  );
};
