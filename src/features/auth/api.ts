import { API_BASE } from "../../lib/constants";
import type { ApiResponse } from "../../lib/types";
import type { LoginResponse, User } from "./types";

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ApiResponse<LoginResponse>> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.errors?.[0]?.message ?? "Failed to login");
  }
  return response.json();
}

export async function registerUser({
  email,
  password,
  name,
  venueManager,
}: {
  email: string;
  password: string;
  name: string;
  venueManager: boolean;
}): Promise<ApiResponse<User>> {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, venueManager }),
  });
  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.errors?.[0]?.message ?? "Failed to register");
  }
  return response.json();
}
