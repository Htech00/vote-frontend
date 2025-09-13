import React, { useState } from "react";
import { addPollingUnitResult } from "../api";

export default function NewPollingUnit() {
  const [pollingUnitId, setPollingUnitId] = useState("");
  const [party, setParty] = useState("");
  const [score, setScore] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addPollingUnitResult({
      polling_unit_uniqueid: pollingUnitId,
      party_abbreviation: party,
      party_score: score,
    });
    setMsg(res.message);
    alert(msg)
  };

  return (
    <div>
      <h2>Add Polling Unit Result</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Polling Unit ID"
          value={pollingUnitId}
          onChange={(e) => setPollingUnitId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Party Abbreviation"
          value={party}
          onChange={(e) => setParty(e.target.value)}
        />
        <input
          type="number"
          placeholder="Party Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
