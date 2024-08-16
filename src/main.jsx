import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CryptoProvider } from "./components/CryptoContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CryptoProvider>
      <App />
    </CryptoProvider>
  </StrictMode>
);
