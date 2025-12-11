import React from "react";
import { useWorkflow } from "../../../context/WorkflowContext";

const EndForm = ({ node }) => {
  const { updateNode } = useWorkflow();

  return (
    <div>
      <label>End message</label>
      <input value={node.data.message || ""} onChange={(e) => updateNode(node.id, { message: e.target.value })} />

      <label>
        <input type="checkbox" checked={!!node.data.summary} onChange={(e) => updateNode(node.id, { summary: e.target.checked })} />
        Include summary
      </label>
    </div>
  );
};

export default EndForm;
