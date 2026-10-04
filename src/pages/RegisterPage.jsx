import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../features/auth/api.js";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/login");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    mutation.mutate({ email, name: username, password, venueManager });
  }
  return (
    <main className="mx-auto max-w-lg p-8">
      <h1 className="mb-4 text-3xl font-bold text-neutral-400">
        Create an account
      </h1>
      <h2 className="mb-4 text-xl text-neutral-300">
        Book unique stays or manage your own venues — all in one place
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={venueManager}
              onChange={(e) => setVenueManager(e.target.checked)}
              className="mr-2"
            />
            I also want to host on Holidaze
          </label>
        </div>
        <button
          className="bg-mint-900 rounded px-4 py-2 font-bold text-white"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create new account"}
        </button>
        {mutation.error && (
          <p className="text-red-600">{mutation.error.message}</p>
        )}
      </form>
    </main>
  );
}
