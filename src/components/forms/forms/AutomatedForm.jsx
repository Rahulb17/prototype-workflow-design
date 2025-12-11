import { useWorkflow } from "../../../context/WorkflowContext";

const AutomatedForm = ({ node }) => {
  const { updateNode } = useWorkflow();

  return (
    <>
      <label>Title</label>
      <input
        value={node.data.title || ""}
        onChange={(e) => updateNode(node.id, { title: e.target.value })}
      />

      <label>Action</label>
      <input
        value={node.data.action || ""}
        onChange={(e) => updateNode(node.id, { action: e.target.value })}
      />
    </>
  );
};

export default AutomatedForm;
