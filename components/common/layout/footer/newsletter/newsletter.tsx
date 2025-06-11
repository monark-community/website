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
  const [loading, setLoading] = useState(false);
  const [emailResponse, setEmailResponse] = useState<boolean | undefined>(
    undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (result.success) {
      setError("");
      subscribe(email);
    } else {
      setError(t.invalidEmail);
    }
  };

  const subscribe = async (email: string) => {
    setEmailResponse(undefined);
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        setEmailResponse(true);
      } else {
        throw new Error("Unable to subscribe to newsletter");
      }
    } catch (err) {
      console.error(err);
      setEmailResponse(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter mt-4">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center max-w-[350px]"
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          disabled={loading}
        />
        <Button
          size="icon"
          type="submit"
          variant="ghost"
          className="absolute right-0 text-primary"
          disabled={loading}
        >
          <ChevronRight />
        </Button>
      </form>
      {error && <small className="ml-4 text-destructive">{error}</small>}
      {emailResponse === true && (
        <small className="ml-4 text-success">{t.successMessage}</small>
      )}
      {emailResponse === false && (
        <small className="ml-4 text-destructive">{t.errorMessage}</small>
      )}
    </div>
  );
}    

export default Newsletter;
