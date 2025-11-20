import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context";
import App from "./App.jsx";
import "bootswatch/dist/cerulean/bootstrap.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
