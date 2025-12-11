import React, { useState } from "react";
import { useWorkflow } from "../../../context/WorkflowContext";

const StartForm = ({ node }) => {
  const { updateNode } = useWorkflow();
  const [meta, setMeta] = useState(node.data.meta || [{ key: "", value: "" }]);

  const handleTitle = (v) => updateNode(node.id, { title: v });

  const addMeta = () => setMeta((m) => m.concat({ key: "", value: "" }));
  const updateMetaItem = (i, k, v) => {
    const copy = [...meta];
    copy[i][k] = v;
    setMeta(copy);
    updateNode(node.id, { meta: copy });
  };

  return (
    <div>
      <label>Start title</label>
      <input value={node.data.title || ""} onChange={(e) => handleTitle(e.target.value)} />
      <label>Metadata (key/value)</label>
      {meta.map((it, idx) => (
        <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input placeholder="key" value={it.key} onChange={(e) => updateMetaItem(idx, "key", e.target.value)} />
          <input placeholder="value" value={it.value} onChange={(e) => updateMetaItem(idx, "value", e.target.value)} />
        </div>
      ))}
      <button type="button" onClick={addMeta}>Add metadata</button>
    </div>
  );
};

export default StartForm;
