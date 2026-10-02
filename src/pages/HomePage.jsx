import { Link } from "react-router";

export function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Holidaze</h1>
      <Link to="/venues/123" className="text-blue-600 underline">
        Gå til venue 123
      </Link>
    </main>
  );
}
