// app/[lang]/page.tsx
export default function Page({ params }: { params: { lang: string } }) {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1>yasu224</h1>
      <h2>Current language: {params.lang}</h2>
    </main>
  );
}