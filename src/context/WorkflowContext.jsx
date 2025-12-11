import { createContext, useState } from "react";


export const WorkflowProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const updateNode = (id, newData) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...newData } } : n
      )
    );
  };

  return (
    <WorkflowContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        selectedNode,
        setSelectedNode,
        updateNode,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const WorkflowContext = createContext();
