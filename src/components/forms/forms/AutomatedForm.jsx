import React, { useEffect, useState } from "react";
import { useWorkflow } from "../../../context/WorkflowContext";
import { getAutomations } from "../../../api/automations";

const AutomatedForm = ({ node }) => {
  const { updateNode } = useWorkflow();
  const [actions, setActions] = useState([]);
  const [selected, setSelected] = useState(node.data.action || "");

  useEffect(() => {
    (async () => {
      const list = await getAutomations();
      setActions(list);
    })();
  }, []);

  useEffect(() => {
    // ensure node data has params container
    if (!node.data.params) updateNode(node.id, { params: {} });
  }, [node, updateNode]);

  const onChoose = (actionId) => {
    setSelected(actionId);
    const action = actions.find(a => a.id === actionId);
    // initialize params keys to empty strings
    const paramsObj = (action?.params || []).reduce((acc, p) => ({ ...acc, [p]: node.data.params?.[p] || "" }), {});
    updateNode(node.id, { action: actionId, params: paramsObj });
  };

  const onParamChange = (key, value) => {
    updateNode(node.id, { params: { ...(node.data.params || {}), [key]: value } });
  };

  return (
    <div>
      <label>Title</label>
      <input value={node.data.title || ""} onChange={(e) => updateNode(node.id, { title: e.target.value })} />

      <label>Action</label>
      <select value={selected} onChange={(e) => onChoose(e.target.value)}>
        <option value="">-- choose action --</option>
        {actions.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
      </select>

      {selected && (() => {
        const action = actions.find(a => a.id === selected);
        return (action?.params || []).map((p) => (
          <div key={p}>
            <label>{p}</label>
            <input value={(node.data.params || {})[p] || ""} onChange={(e) => onParamChange(p, e.target.value)} />
          </div>
        ));
      })()}
    </div>
  );
};

export default AutomatedForm;
