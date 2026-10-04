import { API_BASE } from "../../lib/constants.js";

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  return response.json();
}

export async function registerUser({ email, password, name, venueManager }) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, venueManager }),
  });
  if (!response.ok) {
    throw new Error("Failed to register");
  }
  return response.json();
}
