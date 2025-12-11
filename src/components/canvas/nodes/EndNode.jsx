import React from "react";
import { Handle, Position } from "@xyflow/react";

const EndNode = ({ data }) => (
  <div className="node end-node">
    <Handle type="target" position={Position.Top} />
    <strong>{data.title || "End"}</strong>
  </div>
);

export default EndNode;
