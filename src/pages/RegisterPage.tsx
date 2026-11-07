import { useState, type SubmitEvent } from "react";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../features/auth/api";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validation";
import { FieldFeedback } from "../components/ui/FieldFeedback";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const errors = {
    username: validateName(username),
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
  };
  const hasErrors = Object.values(errors).some((error) => error !== "");

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      showToast("Account created successfully", "success");
      navigate("/login");
    },
  });

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (hasErrors) return;
    mutation.mutate({ email, name: username, password, venueManager });
    console.log({ email, name: username, venueManager });
  }
  const inputClass =
    "w-full rounded border border-gray-300 p-3 text-base sm:p-2";

  return (
    <main className="mx-auto w-full max-w-md px-4 py-8 sm:max-w-lg sm:px-8 sm:py-12">
      <h1 className="mb-2 text-2xl font-bold text-neutral-400 sm:mb-4 sm:text-3xl">
        Create an account
      </h1>
      <h2 className="mb-6 text-base text-neutral-300 sm:text-xl">
        Book unique stays or manage your own venues — all in one place
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div>
          <input
            type="text"
            placeholder="Username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClass}
            required
          />
          <FieldFeedback value={username} error={errors.username} />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            required
          />
          <FieldFeedback value={email} error={errors.email} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              required
            />
            <FieldFeedback value={password} error={errors.password} />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
              required
            />
            <FieldFeedback
              value={confirmPassword}
              error={errors.confirmPassword}
            />
          </div>
        </div>
        <label className="flex cursor-pointer items-center gap-3 py-1">
          <input
            type="checkbox"
            checked={venueManager}
            onChange={(e) => setVenueManager(e.target.checked)}
            className="accent-mint-600 h-5 w-5 shrink-0"
          />
          <span>I also want to host on Holidaze</span>
        </label>
        <button
          className="bg-mint-900 w-full rounded px-4 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60 sm:py-2"
          type="submit"
          disabled={mutation.isPending || hasErrors}
        >
          {mutation.isPending ? "Creating..." : "Create new account"}
        </button>
        {mutation.error && (
          <p className="text-error-600">{mutation.error.message}</p>
        )}
        <p className="text-center text-neutral-300 sm:text-right">
          Already have an account?{" "}
          <a href="/login" className="text-mint-700 font-bold">
            Sign in
          </a>
        </p>
      </form>
    </main>
  );
}
