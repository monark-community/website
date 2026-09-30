// A plain container, not <article>: the Brand page is built from designed
// sections, and the global `article` prose styles (for MDX pages) would
// restyle its lists, links and paragraphs.
export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="site-container">{children}</div>;
}
