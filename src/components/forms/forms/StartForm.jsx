// src/components/forms/forms/StartForm.jsx
import React, { useEffect, useState } from "react";
import { useWorkflow } from "../../../context/WorkflowContext";

/**
 * Safe StartForm:
 * - normalizes node.data.meta to an array
 * - uses local state for smooth typing
 * - syncs local -> context via updateNode
 */
const StartForm = ({ node }) => {
  const { updateNode } = useWorkflow();

  // Helper to coerce incoming meta into an array
  const normalizeMeta = (raw) => {
    if (!raw) return [{ key: "", value: "" }];
    if (Array.isArray(raw)) return raw;
    // If it's an object of key->value, convert to array
    if (typeof raw === "object") {
      return Object.entries(raw).map(([k, v]) => ({ key: k, value: String(v) }));
    }
    // fallback: single string -> single item
    return [{ key: "", value: String(raw) }];
  };

  // local state for smooth typing
  const [title, setTitle] = useState(node?.data?.title || "");
  const [meta, setMeta] = useState(normalizeMeta(node?.data?.meta));

  // sync when selected node changes
  useEffect(() => {
    setTitle(node?.data?.title || "");
    setMeta(normalizeMeta(node?.data?.meta));
  }, [node?.id]); // update only when a different node is selected

  // handlers
  const onTitleChange = (v) => {
    setTitle(v);
    updateNode(node.id, { title: v });
  };

  const updateMetaItem = (index, key, value) => {
    setMeta((m) => {
      const copy = [...m];
      copy[index] = { ...(copy[index] || {}), [key]: value };
      // send array to context (keep as array)
      updateNode(node.id, { meta: copy });
      return copy;
    });
  };

  const addMeta = () => {
    setMeta((m) => {
      const next = [...m, { key: "", value: "" }];
      updateNode(node.id, { meta: next });
      return next;
    });
  };

  const removeMeta = (index) => {
    setMeta((m) => {
      const next = m.filter((_, i) => i !== index);
      updateNode(node.id, { meta: next });
      return next;
    });
  };

  return (
    <div>
      <label>Start title</label>
      <input value={title} onChange={(e) => onTitleChange(e.target.value)} />

      <label style={{ marginTop: 12 }}>Metadata (key / value)</label>
      {meta.map((it, idx) => (
        <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input
            placeholder="key"
            value={it.key || ""}
            onChange={(e) => updateMetaItem(idx, "key", e.target.value)}
            style={{ flex: 1 }}
          />
          <input
            placeholder="value"
            value={it.value || ""}
            onChange={(e) => updateMetaItem(idx, "value", e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="button" onClick={() => removeMeta(idx)}>Remove</button>
        </div>
      ))}

      <button type="button" onClick={addMeta}>Add metadata</button>
    </div>
  );
};

export default StartForm;
