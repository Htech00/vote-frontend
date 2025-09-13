import React, { useEffect, useState } from "react";
import { fetchLGAs, fetchLGAResult } from "../api";

export default function LGAResult() {
  const [lgas, setLGAs] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchLGAs().then(setLGAs);
  }, []);

  const handleSelect = async (id) => {
    if (!id) {
      setResults([]);
      return;
    }
    const res = await fetchLGAResult(id);
    setResults(res);
  };

  return (
    <div>
      <h2>LGA Results</h2>
      <select onChange={(e) => handleSelect(e.target.value)}>
        <option value="">-- Select LGA --</option>
        {lgas.map((lga) => (
          <option key={lga.lga_id} value={lga.lga_id}>
            {lga.lga_name}
          </option>
        ))}
      </select>
        <p></p>
      <table>
        <thead>
          <tr>
            <th>Party</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {!results ? 'No Result Found':
          results.map((r, idx) => (
            <tr key={idx}>
              <td>{r.party_abbreviation}</td>
              <td>{r.total_score}</td>
            </tr>
          ))
          }
          
        </tbody>
      </table>
    </div>
  );
}
