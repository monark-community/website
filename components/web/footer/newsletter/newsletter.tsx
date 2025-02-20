import React, { useState } from "react";
import { z } from "zod";
import * as i18n from "./newsletter.i18n";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n.config";
import { ChevronRight } from "lucide-react";

type Props = {
  locale: Locale;
};

const emailSchema = z.string().email();

function Newsletter({ locale }: Props) {
  const t = i18n[locale].newsletter;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (result.success) {
      setError("");
      // Handle successful subscription logic here
    } else {
      setError(t.invalidEmail);
    }
  };

  return (
    <div className="newsletter mt-16">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center max-w-[350px]"
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
        />
        <Button
          size="icon"
          type="submit"
          variant="ghost"
          className="absolute right-0 hover:bg-foreground/20"
        >
          <ChevronRight className="text-foreground" />
        </Button>
      </form>
      {error && <small className="ml-4 text-destructive">{error}</small>}
    </div>
  );
}

export default Newsletter;
