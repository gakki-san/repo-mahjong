import { ScoreSelectPanel } from "./components/ScoreSelectPanel";
import { useIsBoolean } from "./hooks/useIsBoolean";

function App() {
  const [boolean, { on }] = useIsBoolean();
  return <>{boolean || <ScoreSelectPanel close={on} />};</>;
}

export default App;
