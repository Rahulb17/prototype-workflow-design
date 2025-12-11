import React from "react";
import { Handle, Position } from "@xyflow/react";

const StartNode = ({ data }) => (
  <div className="node start-node">
    <Handle type="target" position={Position.Top} id="t" />
    <strong>{data.title || "Start"}</strong>
    <Handle type="source" position={Position.Bottom} id="s" />
  </div>
);

export default StartNode;
