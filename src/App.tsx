import { Input } from "@chakra-ui/react";
import { ScoreSelectPanel } from "./components/ScoreSelectPanel";
import { ScoreSummary } from "./components/ScoreSummary";
import { useIsBoolean } from "./hooks/useIsBoolean";
import { PlayerNames, usePlayerName } from "./hooks/usePlayerName";
import { useScore } from "./hooks/useScore";
import { ComponentProps } from "react";
import { InputPlayerName } from "./components/InputPlayerName";
import { playerList } from "./const/playerList";

function App() {
  const [boolean, { on: close }] = useIsBoolean();
  const [isOpenScoreSummary, { on: open }] = useIsBoolean();
  const [playersName, setPlayersName] = usePlayerName();
  const [score, action] = useScore();
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
  };

  return (
    <>
      {isInputName || (
        <InputPlayerName
          playerList={playerList}
          handleSetPlayerName={handleSetPlayerName}
          closeModal={closeModal}
        />
      )}
      {/* ScoreSelectPanelは初期表示させるのでfalse時に表示。 */}
      {boolean || (
        <ScoreSelectPanel
          close={close}
          score={score}
          setScore={action.set}
          openScoreSummary={open}
        />
      )}
      {isOpenScoreSummary && (
        <ScoreSummary
          score={score}
          setScore={action}
          players={players}
          playersName={playerArray}
        />
      )}
    </>
  );
}
export default App;
