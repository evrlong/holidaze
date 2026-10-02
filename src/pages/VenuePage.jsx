import { useParams, Link } from "react-router";

export function VenuePage() {
  const { id } = useParams();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Venue {id}</h1>
      <Link to="/" className="text-blue-600 underline">
        Tilbake
      </Link>
    </main>
  );
}
