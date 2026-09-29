// A plain container, not <article>: the participate pages are built from
// designed sections, and the global `article` prose styles (for MDX pages)
// would restyle their lists, links and paragraphs.
export default function ParticipateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="site-container">{children}</div>;
}
