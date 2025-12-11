import React, { createContext, useContext, useState } from "react";

const WorkflowContext = createContext(null);

export const WorkflowProvider = ({ children }) => {
  const [nodes, setNodes] = useState([
    { id: "start-1", type: "start", position: { x: 50, y: 50 }, data: { title: "Start" } },
  ]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  const updateNode = (id, newData) => {
    setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...newData } } : n)));
  };

  const updateEdge = (edgeId, patch) => {
    setEdges((eds) => eds.map((e) => (e.id === edgeId ? { ...e, ...patch } : e)));
    // if the edge being edited is currently selectedEdge, update that too
    setSelectedEdge((se) => (se && se.id === edgeId ? { ...se, ...patch } : se));
  };

  const deleteEdge = (edgeId) => {
    setEdges((eds) => eds.filter((e) => e.id !== edgeId));
    setSelectedEdge((se) => (se && se.id === edgeId ? null : se));
  };

  const value = {
    nodes,
    setNodes,
    edges,
    setEdges,
    selectedNode,
    setSelectedNode,
    selectedEdge,
    setSelectedEdge,
    updateNode,
    updateEdge,
    deleteEdge,
  };

  return <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>;
};

export const useWorkflow = () => {
  const ctx = useContext(WorkflowContext);
  if (ctx === null) throw new Error("useWorkflow must be used within WorkflowProvider");
  return ctx;
};
