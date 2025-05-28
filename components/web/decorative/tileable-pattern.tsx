import React from "react";

type Props = {
  src: string;
  className?: string;
};

function TileablePattern({ src, className }: Props) {
  return (
    <div
      style={{ backgroundImage: `url(${src})`, backgroundSize: "200%" }}
      className={`bg-repeat ${className}`}
    ></div>
  );
}

export default TileablePattern;
