let token = null;

const tokenStringified = localStorage.getItem("token");

if (tokenStringified) token = JSON.parse(tokenStringified).accessToken;

export const set_token = (new_token) => {
  token = new_token;
  window.localStorage.setItem("token", JSON.stringify({ accessToken: token }));
};

export async function sign_in(credentials) {
  const response = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  return await response.json();
}

export async function sign_out() {
  const response = await fetch("/api/auth/sign-out", {
    method: "POST",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  return await response.json();
}

export async function get_notes() {
  const response = await fetch("/api/notes", {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  return await response.json();
}

export async function create_note(note) {
  const response = await fetch("/api/notes/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  return await response.json();
}

export async function update_prop(id, note) {
  const response = await fetch(`/api/notes/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  return await response.json();
}

export async function delete_note(id) {
  const response = await fetch(`/api/notes/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  return await response.json();
}
