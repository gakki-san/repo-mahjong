import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";

const Home = lazy(() => import("@/features/scoreManagementV2"));
const InputSetUp = lazy(() =>
  import("@/features/scoreManagementV2/components/InputSetUp").then(
    ({ InputSetUp }) => ({ default: InputSetUp }),
  ),
);
const ScoreSummary = lazy(() =>
  import("@/features/scoreManagementV2/components/ScoreSummary").then(
    ({ ScoreSummary }) => ({ default: ScoreSummary }),
  ),
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<InputSetUp />} />
        <Route path="/scoresummary" element={<ScoreSummary />} />
      </Routes>
    </Suspense>
  );
}
export default App;
