import React from "react";
import { useWorkflow } from "../../../context/WorkflowContext";

const TaskForm = ({ node }) => {
  const { updateNode } = useWorkflow();

  return (
    <div>
      <label>Title</label>
      <input value={node.data.title || ""} onChange={(e) => updateNode(node.id, { title: e.target.value })} />

      <label>Description</label>
      <textarea value={node.data.description || ""} onChange={(e) => updateNode(node.id, { description: e.target.value })} />

      <label>Assignee</label>
      <input value={node.data.assignee || ""} onChange={(e) => updateNode(node.id, { assignee: e.target.value })} />

      <label>Due date</label>
      <input type="date" value={node.data.dueDate || ""} onChange={(e) => updateNode(node.id, { dueDate: e.target.value })} />

      <label>Custom fields (key/value)</label>
      {(node.data.customFields || []).map((cf, i) => (
        <div key={i} style={{ display: "flex", gap: 8 }}>
          <input placeholder="key" value={cf.key || ""} onChange={(e) => {
            const copy = [...(node.data.customFields || [])];
            copy[i] = { ...(copy[i] || {}), key: e.target.value };
            updateNode(node.id, { customFields: copy });
          }} />
          <input placeholder="value" value={cf.value || ""} onChange={(e) => {
            const copy = [...(node.data.customFields || [])];
            copy[i] = { ...(copy[i] || {}), value: e.target.value };
            updateNode(node.id, { customFields: copy });
          }} />
        </div>
      ))}
      <button type="button" onClick={() => updateNode(node.id, { customFields: [...(node.data.customFields || []), { key: "", value: "" }] })}>Add custom field</button>
    </div>
  );
};

export default TaskForm;
