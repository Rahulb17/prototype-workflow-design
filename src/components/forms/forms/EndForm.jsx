import { useWorkflow } from "../../../context/WorkflowContext";

const EndForm = ({ node }) => {
  const { updateNode } = useWorkflow();

  return (
    <>
      <label>Message</label>
      <input
        value={node.data.message || ""}
        onChange={(e) => updateNode(node.id, { message: e.target.value })}
      />
    </>
  );
};

export default EndForm;
