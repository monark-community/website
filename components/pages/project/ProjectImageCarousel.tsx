"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ProjectImage } from "@/types/project.types";

interface Props {
  images: ProjectImage[];
  labels: {
    region: string;
    previous: string;
    next: string;
    /** "Screenshot {n} of {total}" with {n} and {total} placeholders. */
    slide: string;
  };
}

const arrowClass =
  "absolute top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border bg-card/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-card";

/**
 * Scroll-snap carousel: swipe on touch, arrows, thumbnails and arrow keys
 * elsewhere. With one image it renders a plain framed image.
 */
export default function ProjectImageCarousel({ images, labels }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = images.length;

  // Sync the index after the user swipes. Waiting for scrolling to settle keeps
  // a smooth programmatic scroll from reporting the slides it passes through.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || count < 2) return;
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const i = Math.round(track.scrollLeft / track.clientWidth);
        setIndex(Math.min(Math.max(i, 0), count - 1));
      }, 120);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      track.removeEventListener("scroll", onScroll);
    };
  }, [count]);

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const target = (i + count) % count;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({ left: target * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
      setIndex(target);
    },
    [count]
  );

  const slideLabel = (n: number) =>
    labels.slide.replace("{n}", String(n)).replace("{total}", String(count));

  if (count === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={labels.region}
      onKeyDown={(e) => {
        if (count < 2) return;
        if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1); }
        if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
      }}
    >
      <div className="relative">
        <div className="overflow-hidden rounded-3xl border bg-secondary">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((image, i) => (
              <div
                key={image.src}
                role="group"
                aria-roledescription="slide"
                aria-label={slideLabel(i + 1)}
                aria-hidden={count > 1 && i !== index}
                className="relative aspect-[1321/924] w-full shrink-0 snap-start"
              >
                <Image
                  src={`/images/project/${image.src}`}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1200px) 1150px, 100vw"
                  priority={i === 0}
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>

        {count > 1 && (
          <>
            <button type="button" onClick={() => goTo(index - 1)} aria-label={labels.previous} className={`${arrowClass} left-3 sm:left-4`}>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </button>
            <button type="button" onClick={() => goTo(index + 1)} aria-label={labels.next} className={`${arrowClass} right-3 sm:right-4`}>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="m-0 min-w-0 max-w-none text-sm text-muted-foreground" aria-live="polite">
            <span className="mr-2 font-semibold tabular-nums text-foreground">{index + 1}/{count}</span>
            {images[index].alt}
          </p>
          <div className="flex shrink-0 gap-2 overflow-x-auto pb-1">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={slideLabel(i + 1)}
                aria-current={i === index ? "true" : undefined}
                className={`relative aspect-[1321/924] w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-opacity sm:w-20 ${
                  i === index ? "border-primary opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={`/images/project/${image.src}`} alt="" fill sizes="80px" className="object-cover object-top" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
