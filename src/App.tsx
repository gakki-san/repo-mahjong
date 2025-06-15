import { Route, Routes } from "react-router";
import { ScoreSummary } from "@/features/scoreManagementV2/components/ScoreSummary";
import Home from "@/features/scoreManagementV2";
import { InputPlayerName } from "@/features/scoreManagementV2/components/InputPlayerName";
import { InputRulePanel } from "@/features/scoreManagementV2/components/InputRulePanel";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup/inputname" element={<InputPlayerName />} />
        <Route path="/setup/inputrule" element={<InputRulePanel />} />
        <Route path="/scoresummary" element={<ScoreSummary />} />
      </Routes>
    </>
  );
}
export default App;
