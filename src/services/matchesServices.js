import { API_URL } from "../config/api";

export async function getAllMatches() {
  const res = await fetch(`${API_URL}/matches/all`);
  if (!res.ok) throw new Error("Erro ao buscar partidas");

  const data = await res.json();
  return data.matches || [];
}

export async function addMatch(match) {
  const res = await fetch(`${API_URL}/matches/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(match),
  });
  if (!res.ok) throw new Error("Erro ao adicionar partida");

  const data = await res.json();
  return data.match;
}

export async function editMatch(id, match) {
  const res = await fetch(`${API_URL}/matches/edit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(match),
  });
  if (!res.ok) throw new Error("Erro ao editar partida");
}

export async function deleteMatch(id) {
  const res = await fetch(`${API_URL}/matches/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar partida");
}
