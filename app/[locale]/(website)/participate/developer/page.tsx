import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/shared/navlink/navlink";
import React from "react";

function DeveloperPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1>Developer Page</h1>
      <p>Work in progress...</p>
      <div className="mt-8">
        <NavLink href="/">
          <Button>Back Home</Button>
        </NavLink>
      </div>
    </div>
  );
}

export default DeveloperPage;
