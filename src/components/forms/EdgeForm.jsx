import React, { useState } from "react";
import { useWorkflow } from "../../context/WorkflowContext";

const EDGE_TYPES = [
  { id: "default", label: "Default (straight)" },
  { id: "smoothstep", label: "Smooth Step" },
  { id: "step", label: "Step" },
  { id: "straight", label: "Straight" },
];

const EdgeForm = () => {
  const { selectedEdge, updateEdge, deleteEdge } = useWorkflow();
  const [local, setLocal] = useState(selectedEdge ? { ...selectedEdge } : null);

  // Sync local state with selectedEdge changes
  if (selectedEdge && local?.id !== selectedEdge.id) {
    setLocal({ ...selectedEdge });
  }

  if (!local) return <div className="panel">Select an edge to edit</div>;

  const setField = (k, v) => {
    setLocal((s) => ({ ...s, [k]: v }));
    // immediate update to context
    updateEdge(local.id, { [k]: v });
  };

  return (
    <div className="panel">
      <h3>Edge Editor</h3>

      <label>Label</label>
      <input value={local.label || ""} onChange={(e) => setField("label", e.target.value)} />

      <label>Type</label>
      <select value={local.type || "default"} onChange={(e) => setField("type", e.target.value)}>
        {EDGE_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
      </select>

      <label>Animated</label>
      <input type="checkbox" checked={!!local.animated} onChange={(e) => setField("animated", e.target.checked)} />

      <label>Stroke width</label>
      <input type="number" value={(local.style && local.style.strokeWidth) || 2} onChange={(e) => setField("style", { ...(local.style || {}), strokeWidth: Number(e.target.value) })} />

      <label>Color</label>
      <input type="color" value={(local.style && local.style.stroke) || "#333"} onChange={(e) => setField("style", { ...(local.style || {}), stroke: e.target.value })} />

      <div style={{ marginTop: 12 }}>
        <button onClick={() => deleteEdge(local.id)} style={{ marginRight: 8 }}>Delete Edge</button>
      </div>
    </div>
  );
};

export default EdgeForm;
