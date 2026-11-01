import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-24 text-center sm:py-32">
      <p className="font-serif text-8xl text-blush sm:text-9xl">404</p>
      <h1 className="h-display mx-auto mt-4 !text-[clamp(2.5rem,4vw+1rem,4.5rem)]">Page not found</h1>
      <p className="lead mx-auto mt-4 max-w-md">This link doesn’t go anywhere. The menu and the home page are below.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">Back home</Link>
        <Link href="/menu" className="btn-outline">See the menu</Link>
      </div>
    </section>
  );
}
