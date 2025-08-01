import { Route, Routes } from "react-router-dom";
import { ScoreSummary } from "@/features/scoreManagementV2/components/ScoreSummary";
import Home from "@/features/scoreManagementV2";
import { InputSetUp } from "@/features/scoreManagementV2/components/InputSetUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<InputSetUp />} />
        <Route path="/scoresummary" element={<ScoreSummary />} />
      </Routes>
    </>
  );
}
export default App;
