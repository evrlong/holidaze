import { CreateVenueForm } from "../features/venues/CreateVenueForm";

export function CreateVenuePage() {
  return (
    <main className="mx-auto max-w-lg p-4 sm:p-8">
      <h1 className="mb-6 text-3xl font-bold text-neutral-400">
        List a new venue
      </h1>
      <CreateVenueForm />
    </main>
  );
}
