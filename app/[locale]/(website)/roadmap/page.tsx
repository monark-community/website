"use client";

import React, { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  MarkerType,
  ReactFlowProvider,
  NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/shared/navlink/navlink";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type RoadmapNodeData = {
  title: string;
  description: string;
  status: string;
  dueDate?: string;
  color: string;
};

// Custom node component for roadmap items
interface RoadmapNodeProps extends NodeProps {
  data: RoadmapNodeData;
}

const RoadmapNode: React.FC<RoadmapNodeProps> = ({ data }) => {
  return (
    <Card className="min-w-64 border-2" style={{ borderColor: data.color }}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">{data.title}</h3>
          <Badge
            variant={
              data.status === "Completed"
                ? "default"
                : data.status === "In Progress"
                ? "secondary"
                : "outline"
            }
          >
            {data.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{data.description}</p>
        {data.dueDate && (
          <div className="mt-2 text-xs text-muted-foreground">
            Due: {data.dueDate}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Define node types
const nodeTypes = {
  roadmapItem: RoadmapNode,
};

function RoadmapPage() {
  // Initial nodes
  const initialNodes: Node[] = [
    // Short Term - Phase 1 (0-4 months)
    {
      id: "st-phase1",
      type: "roadmapItem",
      position: { x: 300, y: 50 },
      data: {
        title: "Phase 0: Community building",
        description: "Initial phase focused on community building",
        status: "In Progress",
        dueDate: "0-4 months",
        color: "#a855f7", // Orange
      },
    },
    {
      id: "st-documentation",
      type: "roadmapItem",
      position: { x: 0, y: 200 },
      data: {
        title: "Documentation",
        description:
          "Ensure uniformity in documentation and templates for university initiatives",
        status: "In Progress",
        dueDate: "Month 2",
        color: "#a855f7",
      },
    },
    {
      id: "st-usecases",
      type: "roadmapItem",
      position: { x: 600, y: 200 },
      data: {
        title: "Use cases and projects",
        description:
          "Define, document and present potential use cases and projects",
        status: "Planned",
        dueDate: "Month 3",
        color: "#d4d4d8",
      },
    },
    {
      id: "st-ecosystem",
      type: "roadmapItem",
      position: { x: 0, y: 350 },
      data: {
        title: "Local ecosystem development",
        description:
          "Establish partnerships with universities, schools, and cities",
        status: "Planned",
        dueDate: "Month 4",
        color: "#d4d4d8",
      },
    },
    {
      id: "st-socialmedia",
      type: "roadmapItem",
      position: { x: 600, y: 350 },
      data: {
        title: "Social media program",
        description:
          "Increase awareness and visibility of Monark through strategic social media efforts",
        status: "Planned",
        dueDate: "Month 2",
        color: "#d4d4d8",
      },
    },

    // Mid Term - Phase 1 (5-12 months)
    {
      id: "mt-phase1",
      type: "roadmapItem",
      position: { x: 300, y: 650 },
      data: {
        title: "Phase 1: Community building (continued)",
        description: "Continuing community building efforts",
        status: "Planned",
        dueDate: "5-12 months",
        color: "#d4d4d8", // Amber
      },
    },
    {
      id: "mt-ambassador",
      type: "roadmapItem",
      position: { x: 0, y: 800 },
      data: {
        title: "Ambassador program",
        description:
          "Empower community members to represent and contribute to Monark's mission",
        status: "Planned",
        dueDate: "Month 7",
        color: "#d4d4d8",
      },
    },
    {
      id: "mt-initiatives",
      type: "roadmapItem",
      position: { x: 600, y: 800 },
      data: {
        title: "Local initiatives",
        description:
          "Expand adoption by fostering engagement through local events and collaborations",
        status: "Planned",
        dueDate: "Month 8",
        color: "#d4d4d8",
      },
    },
    {
      id: "mt-university",
      type: "roadmapItem",
      position: { x: 0, y: 950 },
      data: {
        title: "University Initiatives",
        description:
          "Establish Monark's presence in universities through various programs",
        status: "Planned",
        dueDate: "Month 10",
        color: "#d4d4d8",
      },
    },
    {
      id: "mt-podcast",
      type: "roadmapItem",
      position: { x: 600, y: 950 },
      data: {
        title: "Podcast Initiative",
        description:
          "Share insights, stories, and experiences to engage developers, students, and entrepreneurs",
        status: "Planned",
        dueDate: "Month 9",
        color: "#d4d4d8",
      },
    },

    // Long Term - Phase 2 (1-5 years)
    {
      id: "lt-phase2",
      type: "roadmapItem",
      position: { x: 300, y: 1250 },
      data: {
        title: "Phase 2: Expanding Web3",
        description: "Long-term expansion of Web3 capabilities",
        status: "Planned",
        dueDate: "1-5 years",
        color: "#d4d4d8", // Red
      },
    },
    {
      id: "lt-platform",
      type: "roadmapItem",
      position: { x: 0, y: 1400 },
      data: {
        title: "Monark Platform Development",
        description:
          "Establish the Monark technology platform for interactions",
        status: "Planned",
        dueDate: "Year 2",
        color: "#d4d4d8",
      },
    },
    {
      id: "lt-merging",
      type: "roadmapItem",
      position: { x: 600, y: 1400 },
      data: {
        title: "Merging Physical & Digital",
        description: "Integrate real-world assets with Web3 applications",
        status: "Planned",
        dueDate: "Year 3",
        color: "#d4d4d8",
      },
    },
    {
      id: "lt-modules",
      type: "roadmapItem",
      position: { x: 300, y: 1550 },
      data: {
        title: "Building Core Modules",
        description: "Develop essential modules to support Monark's ecosystem",
        status: "Planned",
        dueDate: "Year 4",
        color: "#d4d4d8",
      },
    },
  ];

  // Initial edges connecting the nodes
  const initialEdges: Edge[] = [
    // Short Term Connections
    {
      id: "e-st-phase1-documentation",
      source: "st-phase1",
      target: "st-documentation",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-st-phase1-usecases",
      source: "st-phase1",
      target: "st-usecases",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-st-phase1-ecosystem",
      source: "st-phase1",
      target: "st-ecosystem",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-st-phase1-socialmedia",
      source: "st-phase1",
      target: "st-socialmedia",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-st-documentation-ecosystem",
      source: "st-documentation",
      target: "st-ecosystem",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-st-usecases-ecosystem",
      source: "st-usecases",
      target: "st-ecosystem",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-st-documentation-socialmedia",
      source: "st-documentation",
      target: "st-socialmedia",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-st-phase1-mt-phase1",
      source: "st-phase1",
      target: "mt-phase1",
      animated: true,
      style: { stroke: "#94a3b8", strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed },
    },

    // Mid Term Connections
    {
      id: "e-mt-phase1-ambassador",
      source: "mt-phase1",
      target: "mt-ambassador",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-mt-phase1-initiatives",
      source: "mt-phase1",
      target: "mt-initiatives",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-mt-phase1-university",
      source: "mt-phase1",
      target: "mt-university",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-mt-phase1-podcast",
      source: "mt-phase1",
      target: "mt-podcast",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-mt-ambassador-initiatives",
      source: "mt-ambassador",
      target: "mt-initiatives",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-mt-initiatives-university",
      source: "mt-initiatives",
      target: "mt-university",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-mt-ambassador-university",
      source: "mt-ambassador",
      target: "mt-university",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-mt-university-podcast",
      source: "mt-university",
      target: "mt-podcast",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-mt-phase1-lt-phase2",
      source: "mt-phase1",
      target: "lt-phase2",
      animated: true,
      style: { stroke: "#94a3b8", strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed },
    },

    // Long Term Connections
    {
      id: "e-lt-phase2-platform",
      source: "lt-phase2",
      target: "lt-platform",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-lt-phase2-merging",
      source: "lt-phase2",
      target: "lt-merging",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-lt-platform-merging",
      source: "lt-platform",
      target: "lt-merging",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-lt-platform-modules",
      source: "lt-platform",
      target: "lt-modules",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e-lt-merging-modules",
      source: "lt-merging",
      target: "lt-modules",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
  ];

  // Set up state with React Flow hooks
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  // Handle when a node is clicked
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log("Node clicked:", node);
    // You could implement functionality here like opening a modal with details
  }, []);

  return (
    <ReactFlowProvider>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-[1000px] border rounded-md bg-background">
          <h2 className="absolute p-4 z-10 bg-background/80 rounded-md rounded-t-none">
            Roadmap
          </h2>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
          </ReactFlow>
        </div>

        <div className="mt-6 flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-sm">In Progress</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-zinc-300 mr-2"></div>
            <span className="text-sm">Planned</span>
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default RoadmapPage;
