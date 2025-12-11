import { useWorkflow } from "../../../context/WorkflowContext";

const StartForm = ({ node }) => {
  const { updateNode } = useWorkflow();

  return (
    <div>
      <label>Title</label>
      <input
        value={node.data.title || ""}
        onChange={(e) => updateNode(node.id, { title: e.target.value })}
      />
    </div>
  );
};

export default StartForm;
