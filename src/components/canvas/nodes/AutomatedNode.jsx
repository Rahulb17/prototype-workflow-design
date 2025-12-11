import React from "react";
import { Handle, Position } from "@xyflow/react";

const AutomatedNode = ({ data }) => (
  <div className="node automated-node">
    <Handle type="target" position={Position.Top} />
    <strong>{data.title || "Automation"}</strong>
    <div style={{ fontSize: 12 }}>{data.action || "No action"}</div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export default AutomatedNode;
