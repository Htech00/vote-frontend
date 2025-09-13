import React, { useEffect, useState } from "react";
import { addPollingUnitResult, fetchParties, fetchPollingUnits } from "../api";

export default function NewPollingUnit() {
  const [pollingUnits, setPollingUnits] = useState([]);
  const [pollingUnitId, setPollingUnitId] = useState("");
  const [enteredBy, setEnteredBy] = useState("");
  const [parties, setParties] = useState([]);
  const [scores, setScores] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchParties().then(setParties);
    fetchPollingUnits().then(setPollingUnits);
  }, []);

  const handleChange = (party, value) => {
    setScores((prev) => ({
      ...prev,
      [party]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = parties.map((p) => ({
      polling_unit_uniqueid: pollingUnitId,
      party_abbreviation: p.partyid.slice(0, 4),
      party_score: scores[p.partyid] || 0,
      entered_by_user: enteredBy,
    }));

    const res = await addPollingUnitResult(payload);

    setMsg(res.message || "Results saved successfully");
    if (res.success) {
      setScores({});
      setPollingUnitId("");
      setEnteredBy("");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Add New Polling Unit Results</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="border p-2 rounded w-full"
          value={pollingUnitId}
          onChange={(e) => setPollingUnitId(e.target.value)}
          required
        >
          <option value="">-- Select Polling Unit --</option>
          {pollingUnits.map((pu) => (
            <option key={pu.uniqueid} value={pu.uniqueid}>
              {pu.polling_unit_name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Entered by (Name)"
          value={enteredBy}
          onChange={(e) => setEnteredBy(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />

        {parties.map((p) => (
          <div key={p.partyid} className="flex gap-2 items-center">
            <label className="w-20">{p.partyid}</label>
            <input
              type="number"
              value={scores[p.partyid] || ""}
              onChange={(e) => handleChange(p.partyid, e.target.value)}
              className="border p-2 rounded flex-1"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Results
        </button>
      </form>

      {msg && <p className="mt-4 text-green-600">{msg}</p>}
    </div>
  );
}
