import React from "react";
import { Handle, Position } from "@xyflow/react";

const TaskNode = ({ data }) => (
  <div className="node task-node">
    <Handle type="target" position={Position.Top} />
    <strong>{data.title || "Task"}</strong>
    <div style={{ fontSize: 12, marginTop: 6 }}>{data.description}</div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export default TaskNode;
