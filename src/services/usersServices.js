const API_URL = "http://localhost:3000/users";

export async function getAllUsers() {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) throw new Error("Erro ao buscar usuários");
  return res.json();
}

export async function addUser(user) {
  const res = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Erro ao adicionar usuário");
  return res.json();
}

export async function editUser(id, user) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Erro ao atualizar usuário");
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar usuário");
  return res.json();
}
