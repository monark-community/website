import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/shared/navlink/navlink";
import React from "react";

function PrivacyPolicyPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1>Privacy Policy Page</h1>
      <p>Work in progress...</p>
      <div className="mt-8">
        <NavLink href="/">
          <Button>Back Home</Button>
        </NavLink>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
