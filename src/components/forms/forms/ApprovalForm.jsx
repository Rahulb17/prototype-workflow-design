import React, { useEffect, useState } from "react";
import { useWorkflow } from "../../../context/WorkflowContext";

const ApprovalForm = ({ node }) => {
  const { updateNode } = useWorkflow();
  const [title, setTitle] = useState(node?.data?.title || "");
  const [role, setRole] = useState(node?.data?.role || "");
  const [threshold, setThreshold] = useState(node?.data?.threshold ?? "");

  useEffect(() => {
    setTitle(node?.data?.title || "");
    setRole(node?.data?.role || "");
    setThreshold(node?.data?.threshold ?? "");
  }, [node?.id]);

  const onTitle = (v) => { setTitle(v); updateNode(node.id, { title: v }); };
  const onRole = (v) => { setRole(v); updateNode(node.id, { role: v }); };
  const onThreshold = (v) => { setThreshold(v); updateNode(node.id, { threshold: v ? Number(v) : null }); };

  return (
    <div>
      <label>Title</label>
      <input value={title} onChange={(e) => onTitle(e.target.value)} />

      <label>Approver role</label>
      <input value={role} onChange={(e) => onRole(e.target.value)} />

      <label>Auto-approve threshold</label>
      <input type="number" value={threshold ?? ""} onChange={(e) => onThreshold(e.target.value)} />
    </div>
  );
};

export default ApprovalForm;
