// Re-mounts on every navigation: a short CSS fade between pages, visible even before hydration.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
