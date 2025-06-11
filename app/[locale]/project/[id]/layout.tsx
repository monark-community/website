import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {children}
      <Link href="mailto:contact+project@monark.io">
        {/* TODO: Localize */}
        <Button>Apply for project</Button>
      </Link>
    </article>
  );
}