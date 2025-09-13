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
  try {
    const res = await fetch(`${BASE_URL}?action=addResult`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      console.error("Server returned non-JSON:", text);
      return { success: false, message: "Server returned invalid JSON" };
    }
  } catch (err) {
    console.error("Fetch error:", err);
    return { success: false, message: "Network error" };
  }
}

export async function fetchParties() {
  try {
    const res = await fetch(`${BASE_URL}?action=getParties`);
    return await res.json();
  } catch {
    return [];
  }
}

// export async function fetchParties() {
//   const res = await fetch(`${BASE_URL}?action=getParties`);
//   return res.json();
// }


