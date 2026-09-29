// A plain wrapper, not <article>: the participate pages are built from
// designed sections, and the global `article` prose styles (for MDX pages)
// would restyle their lists, links and paragraphs. No .site-container here:
// ParticipatePage runs its hero full width and contains the other sections.
export default function ParticipateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
