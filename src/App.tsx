import { Input } from "@chakra-ui/react";
import { ScoreSelectPanel } from "./components/ScoreSelectPanel";
import { ScoreSummary } from "./components/ScoreSummary";
import { useIsBoolean } from "./hooks/useIsBoolean";
import { PlayerNames, usePlayerName } from "./hooks/usePlayerName";
import { useScore } from "./hooks/useScore";
import { ComponentProps } from "react";
import { InputPlayerName } from "./components/InputPlayerName";
import { playerList } from "./const/playerList";
import { useCount } from "./hooks/useCount";

function App() {
  const [isSelectedScorePanel, { on: isOpen, off: close }] = useIsBoolean();
  const [isOpenScoreSummary, { on: open }] = useIsBoolean();
  const [playersName, setPlayersName] = usePlayerName();
  const [score, action] = useScore();
  const [returnPoint, setReturnPoint] = useCount();
  const [umaRule, setUmaRule] = useCount();
  const [isInputName, { on: closeInputModal }] = useIsBoolean();

  const players = score ? Object.keys(score) : [];

  const playerArray = Object.values(playersName);

  const handleSetPlayerName: ComponentProps<typeof Input>["onChange"] = (
    event,
  ) => {
    const { name, value } = event.target;
    setPlayersName(name as keyof PlayerNames, value);
  };

  const closeModal = () => {
    closeInputModal();
    isOpen();
  };

  console.log("app", score);

  return (
    <>
      {/* InputPlayerNameは初期表示させるのでfalse時に表示 */}
      {isInputName || (
        <InputPlayerName
          playerList={playerList}
          handleSetPlayerName={handleSetPlayerName}
          closeModal={closeModal}
        />
      )}
      {isSelectedScorePanel && (
        <ScoreSelectPanel
          close={close}
          score={score}
          setScore={action.set}
          openScoreSummary={open}
          setReturnPoint={setReturnPoint.add}
          setUmaRule={setUmaRule.add}
          returnPoint={returnPoint}
        />
      )}
      {isOpenScoreSummary && (
        <ScoreSummary
          score={score}
          setScore={action}
          players={players}
          playersName={playerArray}
          returnPoint={returnPoint}
          umaRule={umaRule}
        />
      )}
    </>
  );
}
export default App;
