import { Route, Routes } from "react-router";
import { ScoreSummary } from "@/features/scoreManagementV2/components/ScoreSummary";
import Home from "@/features/scoreManagementV2";
import { InputSetUp } from "@/features/scoreManagementV2/components/InputSetUp";

/**
 * Defines the main application component and sets up client-side routing for the Home, InputSetUp, and ScoreSummary pages.
 *
 * Renders the appropriate page component based on the current URL path.
 *
 * @returns The routed application UI.
 */
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
