import React from "react";
import { Badge } from "@/components/ui/badge";
import { DatedNewsMetadata } from "@/types/news.types";

type Props = {
    categories: DatedNewsMetadata["tags"];
};

function NewsArticleCategories({ categories }: Props) {
    const uniqueCategories = [...new Set(categories)].sort((a, b) =>
        a.localeCompare(b)
    );
    
    return uniqueCategories.sort().map((category, idx) => (
        <Badge key={idx} className="w-fit whitespace-nowrap pointer-events-none" variant="secondary">
            {category}
        </Badge>
    ));
}

export default NewsArticleCategories;