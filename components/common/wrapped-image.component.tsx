"use client";
import Image, { ImageProps as NextImageProps } from "next/image";
import React, { useState } from "react";
import { XIcon } from "lucide-react";

type WrappedImageProps = NextImageProps & {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  caption?: string;
};

export default function WrappedImage({
  src,
  alt,
  width,
  height,
  className,
  caption,
}: WrappedImageProps) {
  const [zoomed, setZoomed] = useState(false);

  // Add escape key handler to close zoom
  React.useEffect(() => {
    if (!zoomed) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomed]);

  return (
    <>
      <figure
        className="flex flex-col items-center cursor-zoom-in"
        onClick={() => setZoomed(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`rounded-lg overflow-hidden ${className}`}
        />
        {caption && (
          <figcaption className="mt-2 text-sm text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setZoomed(false)}
        >
          <button
            className="absolute top-6 right-6 rounded-full p-2 hover:bg-foreground/10 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(false);
            }}
            aria-label="Close image"
          >
            <XIcon size={24} className="text-primary" />
          </button>
          <div className="flex flex-col items-center">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                width: width > height ? "min(100%, " + width + "px)" : "auto",
                height:
                  height >= width ? "min(100%, " + height + "px)" : "auto",
                objectFit: "contain",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
                cursor: "default", // Remove zoom-out cursor on image
              }}
              className="bg-white"
              onClick={(e) => e.stopPropagation()}
              priority
            />
            {caption && (
              <figcaption className="mt-4 text-base text-muted-foreground text-center max-w-2xl">
                {caption}
              </figcaption>
            )}
          </div>
        </div>
      )}
    </>
  );
}
