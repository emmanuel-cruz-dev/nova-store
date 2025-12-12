import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SWRConfig } from "swr";
import App from "./App";
import "bootswatch/dist/cerulean/bootstrap.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        dedupingInterval: 10000,
        errorRetryCount: 3,
      }}
    >
      <App />
    </SWRConfig>
  </StrictMode>
);
