import { ScoreSelectPanel } from "./components/ScoreSelectPanel";
import { useIsBoolean } from "./hooks/useIsBoolean";

function App() {
  const [boolean, { on: close }] = useIsBoolean();
  return (
    <>
      {/* ScoreSelectPanelは初期表示させるのでfalse時に表示。 */}
      {boolean || <ScoreSelectPanel close={close} />};
    </>
  );
}

export default App;
