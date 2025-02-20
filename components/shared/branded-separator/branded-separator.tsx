import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  orientation?: "horizontal" | "vertical";
  circlePosition?: "before" | "after" | "both";
  width?: string;
  className?: string;
};

function BrandedSeparator({
  orientation = "horizontal",
  circlePosition = "both",
  width = "1px",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        {
          "flex-col": orientation === "vertical",
          "flex-row": orientation === "horizontal",
        },
        className
      )}
    >
      {(circlePosition === "before" || circlePosition === "both") && (
        <div className="w-4 h-4 border-2 border-primary rounded-full flex-shrink-0"></div>
      )}
      <div
        className={cn("bg-primary flex-shrink-0", {
          "w-full my-2": orientation === "horizontal",
          "h-full mx-2": orientation === "vertical",
        })}
        style={{
          width: orientation === "horizontal" ? width : "1px",
          height: orientation === "vertical" ? width : "1px",
        }}
      ></div>
      {(circlePosition === "after" || circlePosition === "both") && (
        <div className="w-4 h-4 border-2 border-primary rounded-full flex-shrink-0"></div>
      )}
    </div>
  );
}

export default BrandedSeparator;
