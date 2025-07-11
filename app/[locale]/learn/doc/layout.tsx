export default function DeveloperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {children}
    </article>
  );
}
