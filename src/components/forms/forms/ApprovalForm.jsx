import { useWorkflow } from "../../../context/WorkflowContext";

const ApprovalForm = ({ node }) => {
  const { updateNode } = useWorkflow();

  return (
    <>
      <label>Title</label>
      <input
        value={node.data.title || ""}
        onChange={(e) => updateNode(node.id, { title: e.target.value })}
      />

      <label>Approver Role</label>
      <input
        value={node.data.role || ""}
        onChange={(e) => updateNode(node.id, { role: e.target.value })}
      />
    </>
  );
};

export default ApprovalForm;
