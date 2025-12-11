import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "@xyflow/react";

import { useWorkflow } from "../../context/WorkflowContext";
import { nodeTypes } from "./nodes/nodeTypes";

const WorkflowCanvas = () => {
  const wrapperRef = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);

  const {
    nodes: ctxNodes,
    setNodes: setCtxNodes,
    edges: ctxEdges,
    setEdges: setCtxEdges,
    setSelectedNode,
    setSelectedEdge,
  } = useWorkflow();

  const [nodes, setNodes, onNodesChange] = useNodesState(ctxNodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(ctxEdges || []);

  // sync local -> context
  useEffect(() => setCtxNodes(nodes), [nodes, setCtxNodes]);
  useEffect(() => setCtxEdges(edges), [edges, setCtxEdges]);

  const onInit = useCallback((instance) => {
    setRfInstance(instance);
  }, []);

  const onConnect = useCallback(
    (connection) => {
      // default to smoothstep with arrow
      const newEdge = {
        ...connection,
        id: `e${connection.source}-${connection.target}-${Date.now()}`,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onNodeClick = useCallback((_, node) => {
    setSelectedEdge(null);
    setSelectedNode(node);
  }, [setSelectedNode, setSelectedEdge]);

  const onEdgeClick = useCallback((_, edge) => {
    // edge is the edge object
    setSelectedEdge(edge);
  }, [setSelectedEdge]);

  const onSelectionChange = useCallback(({ nodes: selNodes = [], edges: selEdges = [] }) => {
    // if nothing selected, clear both
    if (selNodes.length === 0 && selEdges.length === 0) {
      setSelectedNode(null);
      setSelectedEdge(null);
    }
  }, [setSelectedNode, setSelectedEdge]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // drop handler (kept same as before; see earlier version)
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type =
        event.dataTransfer.getData("application/reactflow") ||
        event.dataTransfer.getData("text/plain");
      if (!type) return;
      const wrapperBounds = wrapperRef.current?.getBoundingClientRect();
      if (!wrapperBounds) return;
      const clientX = event.clientX - wrapperBounds.left;
      const clientY = event.clientY - wrapperBounds.top;
      let position = { x: clientX, y: clientY };
      try {
        if (rfInstance && typeof rfInstance.project === "function") {
          position = rfInstance.project({ x: clientX, y: clientY });
        } else if (rfInstance && typeof rfInstance.screenToFlowPosition === "function") {
          position = rfInstance.screenToFlowPosition({ x: clientX, y: clientY });
        } else {
          const vp = rfInstance && rfInstance.getViewport ? rfInstance.getViewport() : null;
          if (vp) {
            const { x: vx = 0, y: vy = 0, zoom = 1 } = vp;
            position = { x: (clientX - vx) / zoom, y: (clientY - vy) / zoom };
          }
        }
      } catch (err) {
        // fallback to client coords
      }

      const id = `${type}-${Date.now()}`;

      const defaultData = {
        start: { title: "Start" },
        task: { title: "New Task", description: "" },
        approval: { title: "Approval", role: "Manager" },
        automated: { title: "Automation", action: "" },
        end: { title: "End", message: "" },
      }[type] || { title: type };

      const newNode = { id, type, position, data: defaultData };
      setNodes((nds) => nds.concat(newNode));
    },
    [rfInstance, setNodes]
  );

  // handle deletes (syncs)
  const onNodesDelete = useCallback((deleted) => {
    const ids = deleted.map((n) => n.id);
    setNodes((nds) => nds.filter((n) => !ids.includes(n.id)));
  }, [setNodes]);

  const onEdgesDelete = useCallback((deleted) => {
    const ids = deleted.map((e) => e.id);
    setEdges((eds) => eds.filter((e) => !ids.includes(e.id)));
  }, [setEdges]);

  return (
    <div
      ref={wrapperRef}
      style={{ width: "100%", height: "100%", position: "relative", zIndex: 1 }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={onInit}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onSelectionChange={onSelectionChange}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        fitView
        style={{ width: "100%", height: "100%" }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;
