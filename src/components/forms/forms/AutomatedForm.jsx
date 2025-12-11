import React, { useEffect, useState } from "react";
import { useWorkflow } from "../../../context/WorkflowContext";
import { getAutomations } from "../../../api/automations";

const AutomatedForm = ({ node }) => {
  const { updateNode } = useWorkflow();
  const [actions, setActions] = useState([]);
  const [selectedAction, setSelectedAction] = useState(node?.data?.action || "");
  const [params, setParams] = useState(node?.data?.params || {});

  useEffect(() => {
    (async () => {
      const list = await getAutomations();
      setActions(list);
    })();
  }, []);

  // sync when node selection changes
  useEffect(() => {
    setSelectedAction(node?.data?.action || "");
    setParams(node?.data?.params || {});
  }, [node?.id]);

  const chooseAction = (actionId) => {
    setSelectedAction(actionId);
    const actionDef = actions.find((a) => a.id === actionId);
    const initParams = (actionDef?.params || []).reduce((acc, p) => ({ ...acc, [p]: params[p] || "" }), {});
    setParams(initParams);
    updateNode(node.id, { action: actionId, params: initParams });
  };

  const setParam = (k, v) => {
    setParams((p) => {
      const next = { ...p, [k]: v };
      updateNode(node.id, { params: next });
      return next;
    });
  };

  return (
    <div>
      <label>Title</label>
      <input value={node?.data?.title || ""} onChange={(e) => updateNode(node.id, { title: e.target.value })} />

      <label>Action</label>
      <select value={selectedAction} onChange={(e) => chooseAction(e.target.value)}>
        <option value="">-- choose --</option>
        {actions.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
      </select>

      {selectedAction && (() => {
        const actionDef = actions.find((a) => a.id === selectedAction);
        return (actionDef?.params || []).map((p) => (
          <div key={p}>
            <label>{p}</label>
            <input value={params[p] || ""} onChange={(e) => setParam(p, e.target.value)} />
          </div>
        ));
      })()}
    </div>
  );
};

export default AutomatedForm;
