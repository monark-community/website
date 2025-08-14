export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </article>
  );
}
