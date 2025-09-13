import React, { useEffect, useState } from "react";
import { fetchPollingUnits, fetchParties, storePUResult } from "../api";

export default function StorePUResult() {
  const [pollingUnits, setPollingUnits] = useState([]);
  const [parties, setParties] = useState([]);
  const [selectedPU, setSelectedPU] = useState("");
  const [scores, setScores] = useState({});

  useEffect(() => {
    fetchPollingUnits().then(setPollingUnits);
    fetchParties().then(setParties);
  }, []);

  const handleScoreChange = (party, value) => {
    setScores((prev) => ({ ...prev, [party]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPU) {
      alert("Please select a polling unit");
      return;
    }

    const payload = {
      polling_unit_id: selectedPU,
      results: parties.map((p) => ({
        party_abbreviation: p.partyid || p.party_abbreviation,
        score: parseInt(scores[p.partyid || p.party_abbreviation] || 0),
      })),
    };

    const res = await storePUResult(payload);
    alert(res.message);
    setScores({});
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Store Polling Unit Results</h2>

      <form onSubmit={handleSubmit}>
        {/* Polling Unit Select */}
        <select
          className="border p-2 rounded mb-4 w-full"
          value={selectedPU}
          onChange={(e) => setSelectedPU(e.target.value)}
        >
          <option value="">-- Select Polling Unit --</option>
          {pollingUnits.map((pu) => (
            <option key={pu.uniqueid} value={pu.uniqueid}>
              {pu.polling_unit_name}
            </option>
          ))}
        </select>

        {/* Party Scores */}
        <div className="space-y-2 mb-4">
          {parties.map((p) => (
            <div key={p.partyid || p.party_abbreviation} className="flex gap-2">
              <label className="w-24">{p.partyid || p.party_abbreviation}</label>
              <input
                type="number"
                value={scores[p.partyid || p.party_abbreviation] || ""}
                onChange={(e) => handleScoreChange(p.partyid || p.party_abbreviation, e.target.value)}
                className="border p-2 rounded flex-1"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Results
        </button>
      </form>
    </div>
  );
}
