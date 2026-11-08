import type { ReactNode } from "react";

type InfoPageLayoutProps = {
  title: string;
  intro?: string;
  children: ReactNode;
};

export function InfoPageLayout({ title, intro, children }: InfoPageLayoutProps) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <h1 className="text-mint-900 mb-3 text-3xl font-bold md:text-4xl">
        {title}
      </h1>
      {intro && <p className="mb-10 text-gray-600">{intro}</p>}
      <div className="space-y-8 text-gray-700">{children}</div>
    </main>
  );
}
