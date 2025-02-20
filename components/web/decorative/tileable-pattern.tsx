import React from "react";

type Props = {
  src: string;
  className?: string;
};

function TileablePattern({ src, className }: Props) {
  return (
    <div
      style={{ background: `url(${src})` }}
      className={`bg-repeat ${className}`}
    ></div>
  );
}

export default TileablePattern;
