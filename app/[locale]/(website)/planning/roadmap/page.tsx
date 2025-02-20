import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function RoadmapPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1>Roadmap Page</h1>
      <p>Work in progress...</p>
      <div className="mt-8">
        <Link href="/">
          <Button>Back Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default RoadmapPage;
