import React from "react";

type Props = {
  company: string;
};

function Copyrights({ company }: Props) {
  return (
    <span className="text-sm text-muted-foreground">
      © {new Date().getFullYear()} {company}, All rights reserved.
    </span>
  );
}

export default Copyrights;
