import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-24 text-center sm:py-32">
      <p className="font-serif text-8xl text-gold/70 sm:text-9xl">404</p>
      <h1 className="h-display mt-4 text-4xl sm:text-5xl">This slice is missing</h1>
      <p className="lead mx-auto mt-4 max-w-md">The page you're looking for has been eaten, moved or never existed. Let's get you back to something sweet.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">Back home</Link>
        <Link href="/menu" className="btn-outline">Browse the menu</Link>
      </div>
    </section>
  );
}
