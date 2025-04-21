import { ScoreSelectPanel } from "./components/ScoreSelectPanel";
import { useIsBoolean } from "./hooks/useIsBoolean";

function App() {
  const [boolean, { on: close }] = useIsBoolean();
  return <>{boolean || <ScoreSelectPanel close={close} />};</>;
}

export default App;
