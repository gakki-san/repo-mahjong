import { ScoreSelectPanel } from "./components/ScoreSelectPanel";
import { ScoreSummary } from "./components/ScoreSummary";
import { useIsBoolean } from "./hooks/useIsBoolean";
import { useScore } from "./hooks/useScore";

function App() {
  const [boolean, { on: close }] = useIsBoolean();
  const [score, action] = useScore();

  const players = score ? Object.keys(score) : [];

  return (
    <>
      {/* ScoreSelectPanelは初期表示させるのでfalse時に表示。 */}
      {boolean || (
        <ScoreSelectPanel close={close} score={score} setScore={action.set} />
      )}
      {score && (
        <ScoreSummary score={score} setScore={action} players={players} />
      )}
    </>
  );
}
export default App;
