import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="px-4 py-8">
      {children}
      <Link href="mailto:intership@monark.io">
        <Button>Postuler pour un stage</Button>
      </Link>
    </article>
  );
}
