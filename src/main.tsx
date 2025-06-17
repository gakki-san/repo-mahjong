import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./css/index.css";
import { Provider } from "@/features/scoreManagement/components/ui/provider.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>
  </BrowserRouter>,
);
