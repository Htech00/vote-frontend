import React, { useEffect, useState } from "react";
import { fetchLGAs, fetchLGAResult } from "../api";

export default function LGAResult() {
  const [lgas, setLGAs] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchLGAs().then(setLGAs);
  }, []);

  const handleSelect = async (id) => {
    const res = await fetchLGAResult(id);
    setResults(res);
  };

  return (
    <div>
      <h2>LGA Results</h2>
      <select onChange={(e) => handleSelect(e.target.value)}>
        <option value="">-- Select LGA --</option>
        {lgas.map((lga) => (
          <option key={lga.uniqueid} value={lga.uniqueid}>
            {lga.lga_name}
          </option>
        ))}
      </select>

      <ul>
        {results.map((r, idx) => (
          <li key={idx}>
            {r.party_abbreviation}: {r.total_score}
          </li>
        ))}
      </ul>
    </div>
  );
}
