import React from "react";
import { Handle, Position } from "@xyflow/react";

const ApprovalNode = ({ data }) => (
  <div className="node approval-node">
    <Handle type="target" position={Position.Top} />
    <strong>{data.title || "Approval"}</strong>
    <div style={{ fontSize: 12 }}>{data.role}</div>
    <div style={{ fontSize: 12 }}>Auto threshold: {data.threshold ?? "—"}</div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export default ApprovalNode;
