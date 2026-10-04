import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../features/auth/api.js";
import { useAuthStore } from "../features/auth/authStore.js";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { accessToken, ...user } = data;
      login(user, accessToken);
      navigate("/");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    mutation.mutate({ email, password });
  }

  return (
    <main className="mx-auto max-w-sm p-8">
      <h1 className="mb-4 text-3xl font-bold">Logg inn</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          E-post
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-1 block w-full border p-2"
          />
        </label>

        <label className="block">
          Passord
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="mt-1 block w-full border p-2"
          />
        </label>

        {mutation.error && (
          <p className="text-red-600">{mutation.error.message}</p>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {mutation.isPending ? "Logger inn..." : "Logg inn"}
        </button>
        <p>
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600">
            Register here
          </a>
        </p>
      </form>
    </main>
  );
}
