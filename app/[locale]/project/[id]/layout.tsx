// A plain container, not <article>: the global `article` prose styles (for
// MDX pages) would restyle the project header, like on news articles. The
// project body is wrapped in <article> inside ProjectMdxContent.
export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="site-container">{children}</div>;
}
