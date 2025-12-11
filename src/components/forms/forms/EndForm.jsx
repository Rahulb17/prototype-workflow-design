import React, { useEffect, useState } from "react";
import { useWorkflow } from "../../../context/WorkflowContext";

const EndForm = ({ node }) => {
  const { updateNode } = useWorkflow();
  const [message, setMessage] = useState(node?.data?.message || "");
  const [summary, setSummary] = useState(!!node?.data?.summary);
  const [summaryText, setSummaryText] = useState(node?.data?.summaryText || "");

  useEffect(() => {
    setMessage(node?.data?.message || "");
    setSummary(!!node?.data?.summary);
    setSummaryText(node?.data?.summaryText || "");
  }, [node?.id]);

  const onMessage = (v) => { setMessage(v); updateNode(node.id, { message: v }); };
  const onSummaryToggle = (checked) => {
    setSummary(checked);
    updateNode(node.id, { summary: checked });
  };
  const onSummaryText = (v) => { setSummaryText(v); updateNode(node.id, { summaryText: v }); };

  return (
    <div>
      <label>End message</label>
      <input value={message} onChange={(e) => onMessage(e.target.value)} />

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
        <input id={`summary-${node.id}`} type="checkbox" checked={summary} onChange={(e) => onSummaryToggle(e.target.checked)} />
        <label htmlFor={`summary-${node.id}`} style={{ margin: 0 }}>Include summary</label>
      </div>

      {summary && (
        <div style={{ marginTop: 8 }}>
          <label>Summary text</label>
          <textarea value={summaryText} onChange={(e) => onSummaryText(e.target.value)} />
        </div>
      )}
    </div>
  );
};

export default EndForm;
