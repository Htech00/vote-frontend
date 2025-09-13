import React, { useState } from "react";
import PollingUnitResult from "./components/PollingUnitResult";
import LGAResult from "./components/LGAResult";
import NewPollingUnit from "./components/NewPollingUnit";
import StorePUResult from "./components/StorePUResult";

export default function App() {
  const [page, setPage] = useState("polling");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Bincom Election Results</h1>
      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("polling")}>Polling Unit</button>
        <button onClick={() => setPage("lga")}>LGA</button>
        <button onClick={() => setPage("new")}>Add Polling Unit</button>
      </nav>

      {page === "polling" && <PollingUnitResult />}
      {page === "lga" && <LGAResult />}
      {page === "new" && <NewPollingUnit />}
    </div>
  );
}
