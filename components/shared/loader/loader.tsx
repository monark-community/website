import React from "react";
import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";

function Loader({ isLoaded = false }: { isLoaded?: boolean }) {
  return (
    !isLoaded && (
      <div className="flex flex-col items-center justify-center h-screen text-primary">
        <Image
          src="/vectors/brand/standalone/logo-branded-standalone.svg"
          alt="Monark Standalone Logo"
          height={96}
          width={96}
        />
        <LoaderCircleIcon className="animate-spin" height={32} width={32} />
      </div>
    )
  );
}

export default Loader;
