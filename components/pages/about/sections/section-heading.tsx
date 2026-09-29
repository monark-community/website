import React from "react";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
};

/** Eyebrow, H2 and optional intro shared by the About page sections. */
function SectionHeading({ id, eyebrow, title, intro }: Props) {
  return (
    <div className="max-w-[42rem]">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {intro && <p className="mt-4 text-muted-foreground">{intro}</p>}
    </div>
  );
}

export default SectionHeading;
