import React from "react";
import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";

function Loader({ isLoaded = false }: { isLoaded?: boolean }) {
  return (
    !isLoaded && (
      <div className="flex flex-col items-center justify-center gap-4 h-screen bg-background text-primary">
        <Image
          src="/vectors/brand/standalone/logo-branded-standalone.svg"
          alt="Monark Standalone Logo"
          height={64}
          width={64}
        />
        <LoaderCircleIcon className="motion-safe:animate-spin" height={24} width={24} aria-hidden="true" />
      </div>
    )
  );
}

export default Loader;
