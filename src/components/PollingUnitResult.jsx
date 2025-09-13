import React, { useEffect, useState } from "react";
import { fetchPollingUnits, fetchPollingUnitResult } from "../api";

export default function PollingUnitResult() {
  const [units, setUnits] = useState([]);
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchPollingUnits().then(setUnits);
  }, []);

  const handleSelect = async (id) => {
    setSelected(id);
    const res = await fetchPollingUnitResult(id);
    setResults(res);
  };

  return (
    <div>
      <h2>Polling Unit Results</h2>
      <select onChange={(e) => handleSelect(e.target.value)}>
        <option value="">-- Select Polling Unit --</option>
        {units.map((u) => (
          <option key={u.uniqueid} value={u.uniqueid}>
            {u.polling_unit_name}
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
              <td>{r.party_score}</td>
            </tr>
          ))
          }
          
        </tbody>
      </table>
    </div>
  );
}
