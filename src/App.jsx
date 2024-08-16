import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import CryptoPage from "./components/CryptoPage/CryptoPage";
import CryptoTable from "./components/CryptoTable/CryptoTable";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <header>
          <Header />
        </header>
        <Routes>
          <Route path="/" element={<CryptoTable />} />
          <Route path="/crypto/:cryptoId" element={<CryptoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
