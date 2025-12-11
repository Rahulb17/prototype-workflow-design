import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useWorkflow } from "../../context/WorkflowContext";
import { nodeTypes } from "./nodes/nodeTypes";

const WorkflowCanvas = () => {
  const { nodes, setNodes, edges, setEdges, setSelectedNode } = useWorkflow();

  const [localNodes, onNodesChange] = useNodesState(nodes);
  const [localEdges, onEdgesChange] = useEdgesState(edges);

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const handleNodeClick = (_, node) => setSelectedNode(node);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) => {
          onNodesChange(changes);
          setNodes(localNodes);
        }}
        onEdgesChange={(changes) => {
          onEdgesChange(changes);
          setEdges(localEdges);
        }}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;
