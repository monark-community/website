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
    {
      id: "1",
      type: "roadmapItem",
      position: { x: 250, y: 50 },
      data: {
        title: "Project Kickoff",
        description: "Initial planning and team onboarding",
        status: "Completed",
        dueDate: "Jan 1, 2025",
        color: "#10b981",
      },
    },
    {
      id: "2",
      type: "roadmapItem",
      position: { x: 250, y: 200 },
      data: {
        title: "Design Phase",
        description: "UI/UX design and prototype development",
        status: "Completed",
        dueDate: "Feb 15, 2025",
        color: "#10b981",
      },
    },
    {
      id: "3",
      type: "roadmapItem",
      position: { x: 250, y: 350 },
      data: {
        title: "MVP Development",
        description: "Building core functionality and features",
        status: "In Progress",
        dueDate: "Mar 30, 2025",
        color: "#8b5cf6",
      },
    },
    {
      id: "4",
      type: "roadmapItem",
      position: { x: 100, y: 500 },
      data: {
        title: "Testing Phase",
        description: "QA testing and bug fixes",
        status: "Planned",
        dueDate: "Apr 15, 2025",
        color: "#d4d4d8",
      },
    },
    {
      id: "5",
      type: "roadmapItem",
      position: { x: 400, y: 500 },
      data: {
        title: "Feature Expansion",
        description: "Adding additional features and improvements",
        status: "Planned",
        dueDate: "Apr 15, 2025",
        color: "#d4d4d8",
      },
    },
    {
      id: "6",
      type: "roadmapItem",
      position: { x: 250, y: 650 },
      data: {
        title: "Launch",
        description: "Public release and marketing campaign",
        status: "Planned",
        dueDate: "May 1, 2025",
        color: "#d4d4d8",
      },
    },
  ];

  // Initial edges connecting the nodes
  const initialEdges: Edge[] = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      animated: true,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e3-5",
      source: "3",
      target: "5",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e4-6",
      source: "4",
      target: "6",
      animated: false,
      style: { stroke: "#94a3b8" },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e5-6",
      source: "5",
      target: "6",
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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">DEMO: Project Roadmap</h1>
        <p className="text-muted-foreground mb-6">
          Interactive visualization of our project milestones and timeline
        </p>

        <div className="h-[600px] border rounded-md bg-background">
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

        <div className="mt-8">
          <NavLink href="/">
            <Button>Back Home</Button>
          </NavLink>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default RoadmapPage;
