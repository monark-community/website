import React from "react";
import { articlePillClass } from "@/components/common/article-header/article-header";
import { cn } from "@/lib/utils";
import { uniqueTags } from "./news-data";

type Props = {
  tags: string[];
  className?: string;
};

/** A news item's tags as small outlined pills (labels, not links). */
function NewsTags({ tags, className }: Props) {
  const items = uniqueTags(tags);
  if (items.length === 0) return null;
  return (
    <ul className={cn("m-0 flex list-none flex-wrap gap-1.5 p-0", className)}>
      {items.map((tag) => (
        <li key={tag} className={articlePillClass}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default NewsTags;
