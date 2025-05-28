import React from "react";
// import { Link } from "next-view-transitions";
// import { Badge } from "@/components/ui/badge";

type Props = {
  metadata: {
    title: string;
    accronym: string;
    status: string;
    industry_tags: string[];
    keyword_tags: string[];
    complexity_score: number;
    effort_score: number;
    adoption_score: number;
    blockchain_score: number;
    revenue_score: number;
  };
};

function ProjectMetadata({ metadata }: Props) {
  console.log(metadata)
  return <></>
  // return (
  //   <div className="space-y-4 sticky top-32 pt-7">
  //     {Object.entries({
  //       "Status": metadata.status,
  //       "Acronym": metadata.accronym,
  //       "Industry Tags": metadata.industry_tags,
  //       "Keyword Tags": metadata.keyword_tags,
  //     }).map(([label, value]) => (
  //       <div key={label}>
  //         <span className="font-bold">{label}</span>
  //         <div>
  //           {Array.isArray(value) ? (
  //             <ul className="list-none pl-0 ml-0 flex flex-wrap gap-2">
  //               {value.map((item, index) => (
  //                 <li key={index} className="my-0">
  //                   <Link
  //                     href={`/initiative/project?${label
  //                       .toLowerCase()
  //                       .replace(/ /g, "_")}=${encodeURIComponent(
  //                       item.toLowerCase()
  //                     )}`}
  //                   >
  //                     <Badge variant="secondary">{item}</Badge>
  //                   </Link>
  //                 </li>
  //               ))}
  //             </ul>
  //           ) : (
  //             <span className="text-muted-foreground">{value}</span>
  //           )}
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
}

export default ProjectMetadata;
