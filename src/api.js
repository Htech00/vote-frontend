const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchPollingUnits() {
  const res = await fetch(`${BASE_URL}?action=getPollingUnits`);
  return res.json();
}

export async function fetchPollingUnitResult(id) {
  const res = await fetch(`${BASE_URL}?action=getPollingUnitResult&id=${id}`);
  return res.json();
}

export async function fetchLGAs() {
  const res = await fetch(`${BASE_URL}?action=getLGAs`);
  return res.json();
}

export async function fetchLGAResult(id) {
  const res = await fetch(`${BASE_URL}?action=getLGAResult&id=${id}`);
  return res.json();
}

export async function addPollingUnitResult(data) {
  const res = await fetch(`${BASE_URL}?action=addPollingUnitResult`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

