import React, { createContext, useContext, useState } from "react";

const WorkflowContext = createContext(null);

export const WorkflowProvider = ({ children }) => {
  const [nodes, setNodes] = useState([
    { id: "start-1", type: "start", position: { x: 50, y: 50 }, data: { title: "Start" } },
  ]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  /**
   * updateNode:
   * - produce next nodes array using functional updater
   * - capture the updated node reference in a local variable
   * - schedule setSelectedNode(updatedNode) *after* the updater finishes using queueMicrotask
   *   (this avoids calling setState on the provider while a child component is rendering)
   */
  const updateNode = (id, newData) => {
    let updatedNode = null;

    setNodes((nds) => {
      const next = nds.map((n) => {
        if (n.id !== id) return n;

        // merge shallow + nested objects sensibly
        const mergedData = { ...(n.data || {}), ...(newData || {}) };

        if (n.data && typeof n.data === "object") {
          Object.keys(n.data).forEach((k) => {
            if (typeof n.data[k] === "object" && mergedData[k] && typeof mergedData[k] === "object") {
              mergedData[k] = { ...n.data[k], ...mergedData[k] };
            }
          });
        }

        updatedNode = { ...n, data: mergedData };
        return updatedNode;
      });

      return next;
    });

    // Defer selectedNode update to avoid "setState during render" errors.
    // queueMicrotask runs before the next repaint but after current stack completes.
    if (updatedNode) {
      queueMicrotask(() => {
        setSelectedNode(updatedNode);
      });
    }
  };

  const updateEdge = (edgeId, patch) => {
    setEdges((eds) => eds.map((e) => (e.id === edgeId ? { ...e, ...patch } : e)));
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
