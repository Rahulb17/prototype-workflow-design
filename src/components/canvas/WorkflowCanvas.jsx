import React, { useCallback, useRef, useState } from "react";
// add these imports
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  MarkerType,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";

import { useWorkflow } from "../../context/WorkflowContext";
import { nodeTypes } from "./nodes/nodeTypes";

const WorkflowCanvas = () => {
  const wrapperRef = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);

  const {
    nodes,
    setNodes,
    edges,
    setEdges,
    setSelectedNode,
    setSelectedEdge,
  } = useWorkflow();

  /** -------------------------
   *  REACT FLOW CONTROLLED MODE
   *  ------------------------- */

  // REPLACE current onNodesChange with this:
  const onNodesChange = useCallback(
    (changes) => {
      // applyNodeChanges knows how to handle move/select/remove/etc change objects from React Flow
      setNodes((nds) => {
        const next = applyNodeChanges(changes, nds);
        return next;
      });
    },
    [setNodes]
  );

  // REPLACE current onEdgesChange with this:
  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => {
        const next = applyEdgeChanges(changes, eds);
        return next;
      });
    },
    [setEdges]
  );


  const onConnect = useCallback(
    (connection) => {
      const newEdge = {
        ...connection,
        id: `e-${connection.source}-${connection.target}-${Date.now()}`,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onNodeClick = (_, node) => {
    setSelectedEdge(null);
    setSelectedNode(node);
  };

  const onEdgeClick = (_, edge) => {
    setSelectedNode(null);
    setSelectedEdge(edge);
  };

  const onSelectionChange = ({ nodes: selN = [], edges: selE = [] }) => {
    if (selN.length === 0 && selE.length === 0) {
      setSelectedNode(null);
      setSelectedEdge(null);
    }
  };

  /** -------------------------
   *  DRAG + DROP
   *  ------------------------- */
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type =
        event.dataTransfer.getData("application/reactflow") ||
        event.dataTransfer.getData("text/plain");

      if (!type) return;

      const bounds = wrapperRef.current.getBoundingClientRect();

      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      let position = { x, y };

      try {
        if (rfInstance?.project) {
          position = rfInstance.project({ x, y });
        } else if (rfInstance?.screenToFlowPosition) {
          position = rfInstance.screenToFlowPosition({ x, y });
        }
      } catch {}

      const id = `${type}-${Date.now()}`;

      const defaultData = {
        start: { title: "Start" },
        task: { title: "New Task", description: "" },
        approval: { title: "Approval", role: "" },
        automated: { title: "Automation", action: "", params: {} },
        end: { title: "End", message: "" },
      }[type];

      const newNode = { id, type, position, data: defaultData };

      setNodes((nds) => nds.concat(newNode));
    },
    [rfInstance, setNodes]
  );

  return (
    <div
      ref={wrapperRef}
      style={{ width: "100%", height: "100%" }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onSelectionChange={onSelectionChange}
        onInit={setRfInstance}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;
