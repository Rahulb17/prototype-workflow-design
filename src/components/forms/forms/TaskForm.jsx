import React, { useEffect, useState } from "react";
import { useWorkflow } from "../../../context/WorkflowContext";

const TaskForm = ({ node }) => {
  const { updateNode } = useWorkflow();
  // local state for smooth typing
  const [title, setTitle] = useState(node?.data?.title || "");
  const [description, setDescription] = useState(node?.data?.description || "");
  const [assignee, setAssignee] = useState(node?.data?.assignee || "");
  const [dueDate, setDueDate] = useState(node?.data?.dueDate || "");
  const [customFields, setCustomFields] = useState(node?.data?.customFields || []);

  // sync local state when selected node changes externally
  useEffect(() => {
    setTitle(node?.data?.title || "");
    setDescription(node?.data?.description || "");
    setAssignee(node?.data?.assignee || "");
    setDueDate(node?.data?.dueDate || "");
    setCustomFields(node?.data?.customFields || []);
  }, [node?.id]); // run when node selection changes

  const onTitle = (v) => {
    setTitle(v);
    updateNode(node.id, { title: v });
  };

  const onDescription = (v) => {
    setDescription(v);
    updateNode(node.id, { description: v });
  };

  const onAssignee = (v) => {
    setAssignee(v);
    updateNode(node.id, { assignee: v });
  };

  const onDueDate = (v) => {
    setDueDate(v);
    updateNode(node.id, { dueDate: v });
  };

  const setCustomField = (index, key, value) => {
    const copy = [...customFields];
    copy[index] = { ...(copy[index] || {}), [key]: value };
    setCustomFields(copy);
    updateNode(node.id, { customFields: copy });
  };

  const addCustomField = () => {
    setCustomFields((s) => {
      const next = [...s, { key: "", value: "" }];
      updateNode(node.id, { customFields: next });
      return next;
    });
  };

  return (
    <div>
      <label>Title</label>
      <input value={title} onChange={(e) => onTitle(e.target.value)} />

      <label>Description</label>
      <textarea value={description} onChange={(e) => onDescription(e.target.value)} />

      <label>Assignee</label>
      <input value={assignee} onChange={(e) => onAssignee(e.target.value)} />

      <label>Due date</label>
      <input type="date" value={dueDate || ""} onChange={(e) => onDueDate(e.target.value)} />

      <label>Custom fields</label>
      {customFields.map((cf, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input placeholder="key" value={cf.key || ""} onChange={(e) => setCustomField(i, "key", e.target.value)} />
          <input placeholder="value" value={cf.value || ""} onChange={(e) => setCustomField(i, "value", e.target.value)} />
        </div>
      ))}
      <button type="button" onClick={addCustomField}>Add custom field</button>
    </div>
  );
};

export default TaskForm;
