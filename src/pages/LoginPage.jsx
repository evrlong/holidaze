import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../features/auth/api.js";
import { useAuthStore } from "../features/auth/authStore.js";
import FieldFeedback from "../components/FieldFeedback.jsx";
import { validateEmail } from "../utils/validation.js";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const errors = {
    email: validateEmail(email),
  };
  const hasErrors = Object.values(errors).some(Boolean);

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
      <h1 className="mb-4 text-3xl font-bold text-neutral-400">
        Sign in to your account
      </h1>
      <h2 className="mb-4 text-xl text-neutral-300">
        Book unique stays or manage your own venues — all in one place
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          E-post
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded border border-gray-300 p-2"
          />
          <FieldFeedback value={email} error={errors.email} />
        </label>

        <label className="block">
          Passord
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full rounded border border-gray-300 p-2"
          />
        </label>

        {mutation.error && (
          <FieldFeedback
            value={mutation.error.message}
            error={mutation.error.message}
          />
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-mint-900 w-full rounded px-4 py-2 font-bold text-white"
        >
          {mutation.isPending ? "Logger inn..." : "Logg inn"}
        </button>
        <p className="text-right text-neutral-300">
          Or create a{" "}
          <a href="/register" className="text-mint-700 font-bold">
            new account
          </a>
        </p>
      </form>
    </main>
  );
}
