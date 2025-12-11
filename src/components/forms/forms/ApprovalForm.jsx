import React from "react";
import { useWorkflow } from "../../../context/WorkflowContext";

const ApprovalForm = ({ node }) => {
  const { updateNode } = useWorkflow();

  return (
    <div>
      <label>Title</label>
      <input value={node.data.title || ""} onChange={(e) => updateNode(node.id, { title: e.target.value })} />

      <label>Approver role</label>
      <input value={node.data.role || ""} onChange={(e) => updateNode(node.id, { role: e.target.value })} />

      <label>Auto-approve threshold</label>
      <input type="number" value={node.data.threshold ?? ""} onChange={(e) => updateNode(node.id, { threshold: Number(e.target.value) })} />
    </div>
  );
};

export default ApprovalForm;
