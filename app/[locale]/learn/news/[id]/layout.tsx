// A plain container, not <article>: the global `article` prose styles (for
// MDX pages) would restyle the article header, share row and news cards. The
// MDX body gets its own scoped typography (news-prose.module.scss).
export default function NewsArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="site-container">{children}</div>;
}
