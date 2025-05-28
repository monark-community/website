// "use client";

// import React, { useCallback } from "react";
// import {
//   ReactFlow,
//   Background,
//   Node,
//   Edge,
//   useNodesState,
//   useEdgesState,
//   MarkerType,
//   ReactFlowProvider,
//   NodeProps,
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Locale } from "@/i18n.config";
// import * as i18n from "./roadmap.i18n";

// type RoadmapNodeData = {
//   title: string;
//   description: string;
//   status: string;
//   dueDate?: Date;
//   color: string;
// };

// // Custom node component for roadmap items
// interface RoadmapNodeProps extends NodeProps {
//   data: RoadmapNodeData;
//   locale: Locale;
// }

// const RoadmapNode: React.FC<RoadmapNodeProps> = ({ data, locale }) => {
//   const t = i18n[locale].roadmap;
//   return (
//     <Card className="min-w-64 border-2" style={{ borderColor: data.color }}>
//       <CardContent className="p-4">
//         <div className="flex items-center justify-between mb-2">
//           <h3 className="font-bold text-lg">{data.title}</h3>
//           <Badge
//             variant={
//               data.status === t.statuses.completed
//                 ? "default"
//                 : data.status === t.statuses.inProgress
//                 ? "secondary"
//                 : "outline"
//             }
//           >
//             {data.status}
//           </Badge>
//         </div>
//         <p className="text-sm text-muted-foreground">{data.description}</p>
//         {data.dueDate && (
//           <div className="mt-2 text-xs text-muted-foreground">
//             {t.due}: {data.dueDate.toLocaleDateString(locale)}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// // Define node types
// const nodeTypes = {
//   roadmapItem: RoadmapNode,
// };

// type Props = {
//   locale: Locale;
// };

// function Roadmap({ locale }: Props) {
//   const t = i18n[locale].roadmap;

//   // Initial nodes
//   const initialNodes: Node[] = [
//     // Short Term - Phase 1 (0-4 months)
//     {
//       id: "st-phase1",
//       type: "roadmapItem",
//       position: { x: 300, y: 50 },
//       data: {
//         title: t.shortTerm.phase1.title,
//         description: t.shortTerm.phase1.description,
//         status: t.statuses.inProgress,
//         dueDate: new Date("2025-04-01"),
//         color: "#a855f7",
//         locale,
//       },
//     },
//     {
//       id: "st-documentation",
//       type: "roadmapItem",
//       position: { x: 0, y: 200 },
//       data: {
//         title: t.shortTerm.documentation.title,
//         description: t.shortTerm.documentation.description,
//         status: t.statuses.inProgress,
//         dueDate: new Date("2025-02-01"),
//         color: "#a855f7",
//         locale,
//       },
//     },
//     {
//       id: "st-usecases",
//       type: "roadmapItem",
//       position: { x: 600, y: 200 },
//       data: {
//         title: t.shortTerm.usecases.title,
//         description: t.shortTerm.usecases.description,
//         status: t.statuses.planned,
//         dueDate: new Date("2025-03-01"),
//         color: "#d4d4d8",
//         locale,
//       },
//     },
//     {
//       id: "st-ecosystem",
//       type: "roadmapItem",
//       position: { x: 0, y: 350 },
//       data: {
//         title: t.shortTerm.ecosystem.title,
//         description: t.shortTerm.ecosystem.description,
//         status: t.statuses.planned,
//         dueDate: new Date("2025-04-01"),
//         color: "#d4d4d8",
//         locale,
//       },
//     },
//     {
//       id: "st-socialmedia",
//       type: "roadmapItem",
//       position: { x: 600, y: 350 },
//       data: {
//         title: t.shortTerm.socialmedia.title,
//         description: t.shortTerm.socialmedia.description,
//         status: t.statuses.planned,
//         dueDate: new Date("2025-02-01"),
//         color: "#d4d4d8",
//         locale,
//       },
//     },

//     // Mid Term - Phase 1 (5-12 months)
//     {
//       id: "mt-phase1",
//       type: "roadmapItem",
//       position: { x: 300, y: 650 },
//       data: {
//         title: t.midTerm.phase1.title,
//         description: t.midTerm.phase1.description,
//         status: t.statuses.planned,
//         dueDate: new Date("2025-12-01"),
//         color: "#d4d4d8",
//         locale,
//       },
//     },
//     {
//       id: "mt-ambassador",
//       type: "roadmapItem",
//       position: { x: 0, y: 800 },
//       data: {
//         title: t.midTerm.ambassador.title,
//         description: t.midTerm.ambassador.description,
//         status: t.statuses.planned,
//         dueDate: new Date("2025-07-01"),
//         color: "#d4d4d8",
//         locale,
//       },
//     },
//     {
//       id: "mt-initiatives",
//       type: "roadmapItem",
//       position: { x: 600, y: 800 },
//       data: {
//         title: t.midTerm.initiatives.title,
//         description: t.midTerm.initiatives.description,
//         status: t.statuses.planned,
//         dueDate: new Date("2025-08-01"),
//         color: "#d4d4d8",
//         locale,
//       },
//     },
//     {
//       id: "mt-university",
//       type: "roadmapItem",
//       position: { x: 0, y: 950 },
//       data: {
//         title: t.midTerm.university.title,
//         description: t.midTerm.university.description,
//         status: t.statuses.planned,
//         dueDate: new Date("2025-10-01"),
//         color: "#d4d4d8",
//         locale,
//       },
//     },
//     {
//       id: "mt-podcast",
//       type: "roadmapItem",
//       position: { x: 600, y: 950 },
//       data: {
//         title: t.midTerm.podcast.title,
//         description: t.midTerm.podcast.description,
//         status: t.statuses.planned,
//         dueDate: new Date("2025-09-01"),
//         color: "#d4d4d8",
//         locale,
//       },
//     },

//     // Long Term - Phase 2 (1-5 years)
//     {
//       id: "lt-phase2",
//       type: "roadmapItem",
//       position: { x: 300, y: 1250 },
//       data: {
//         title: t.longTerm.phase2.title,
//         description: t.longTerm.phase2.description,
//         status: t.statuses.planned,
//         dueDate: new Date("2029-01-01"),
//         color: "#d4d4d8",
//         locale,
//       },
//     },
//     {
//       id: "lt-platform",
//       type: "roadmapItem",
//       position: { x: 0, y: 1400 },
//       data: {
//         title: t.longTerm.platform.title,
//         description: t.longTerm.platform.description,
//         status: t.statuses.planned,
//         dueDate: new Date("2027-01-01"),
//         color: "#d4d4d8",
//         locale,
//       },
//     },
//     {
//       id: "lt-merging",
//       type: "roadmapItem",
//       position: { x: 600, y: 1400 },
//       data: {
//         title: t.longTerm.merging.title,
//         description: t.longTerm.merging.description,
//         status: t.statuses.planned,
//         dueDate: new Date("2028-01-01"),
//         color: "#d4d4d8",
//         locale,
//       },
//     },
//     {
//       id: "lt-modules",
//       type: "roadmapItem",
//       position: { x: 300, y: 1550 },
//       data: {
//         title: t.longTerm.modules.title,
//         description: t.longTerm.modules.description,
//         status: t.statuses.planned,
//         dueDate: new Date("2029-01-01"),
//         color: "#d4d4d8",
//         locale,
//       },
//     },
//   ];

//   // Initial edges connecting the nodes
//   const initialEdges: Edge[] = [
//     // Short Term Connections
//     {
//       id: "e-st-phase1-documentation",
//       source: "st-phase1",
//       target: "st-documentation",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-st-phase1-usecases",
//       source: "st-phase1",
//       target: "st-usecases",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-st-phase1-ecosystem",
//       source: "st-phase1",
//       target: "st-ecosystem",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-st-phase1-socialmedia",
//       source: "st-phase1",
//       target: "st-socialmedia",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-st-documentation-ecosystem",
//       source: "st-documentation",
//       target: "st-ecosystem",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-st-usecases-ecosystem",
//       source: "st-usecases",
//       target: "st-ecosystem",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-st-documentation-socialmedia",
//       source: "st-documentation",
//       target: "st-socialmedia",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-st-phase1-mt-phase1",
//       source: "st-phase1",
//       target: "mt-phase1",
//       animated: true,
//       style: { stroke: "#94a3b8", strokeWidth: 2 },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },

//     // Mid Term Connections
//     {
//       id: "e-mt-phase1-ambassador",
//       source: "mt-phase1",
//       target: "mt-ambassador",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-mt-phase1-initiatives",
//       source: "mt-phase1",
//       target: "mt-initiatives",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-mt-phase1-university",
//       source: "mt-phase1",
//       target: "mt-university",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-mt-phase1-podcast",
//       source: "mt-phase1",
//       target: "mt-podcast",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-mt-ambassador-initiatives",
//       source: "mt-ambassador",
//       target: "mt-initiatives",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-mt-initiatives-university",
//       source: "mt-initiatives",
//       target: "mt-university",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-mt-ambassador-university",
//       source: "mt-ambassador",
//       target: "mt-university",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-mt-university-podcast",
//       source: "mt-university",
//       target: "mt-podcast",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-mt-phase1-lt-phase2",
//       source: "mt-phase1",
//       target: "lt-phase2",
//       animated: true,
//       style: { stroke: "#94a3b8", strokeWidth: 2 },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },

//     // Long Term Connections
//     {
//       id: "e-lt-phase2-platform",
//       source: "lt-phase2",
//       target: "lt-platform",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-lt-phase2-merging",
//       source: "lt-phase2",
//       target: "lt-merging",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-lt-platform-merging",
//       source: "lt-platform",
//       target: "lt-merging",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-lt-platform-modules",
//       source: "lt-platform",
//       target: "lt-modules",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//     {
//       id: "e-lt-merging-modules",
//       source: "lt-merging",
//       target: "lt-modules",
//       animated: false,
//       style: { stroke: "#94a3b8" },
//       markerEnd: { type: MarkerType.ArrowClosed },
//     },
//   ];

//   // Set up state with React Flow hooks
//   const [nodes] = useNodesState(initialNodes);
//   const [edges] = useEdgesState(initialEdges);

//   // Handle when a node is clicked
//   const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
//     console.log("Node clicked:", node);
//     // You could implement functionality here like opening a modal with details
//   }, []);

//   return (
//     <ReactFlowProvider>
//       <div className="px-4 sm:px-6 lg:px-8 py-8">
//         <div className="h-[1000px] border rounded-md bg-background">
//           <h2 className="absolute p-4 z-10 bg-background/80 rounded-md rounded-t-none">
//             {t.title}
//           </h2>
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             onNodeClick={onNodeClick}
//             nodeTypes={nodeTypes}
//             fitView
//           >
//             <Background />
//           </ReactFlow>
//         </div>

//         <div className="mt-6 flex items-center space-x-4">
//           <div className="flex items-center">
//             <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
//             <span className="text-sm">{t.statuses.completed}</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
//             <span className="text-sm">{t.statuses.inProgress}</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-3 h-3 rounded-full bg-zinc-300 mr-2"></div>
//             <span className="text-sm">{t.statuses.planned}</span>
//           </div>
//         </div>
//       </div>
//     </ReactFlowProvider>
//   );
// }

// export default Roadmap;