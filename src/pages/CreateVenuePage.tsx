import { CreateVenueForm } from "../features/venues/components/CreateVenueForm";

export function CreateVenuePage() {
  return (
    <section className="mx-auto w-full max-w-lg">
      <h2 className="mb-6 text-3xl font-bold text-neutral-400">
        List a new venue
      </h2>
      <CreateVenueForm />
    </section>
  );
}
