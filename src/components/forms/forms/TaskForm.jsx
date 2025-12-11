import { useWorkflow } from "../../../context/WorkflowContext";

const TaskForm = ({ node }) => {
  const { updateNode } = useWorkflow();

  return (
    <>
      <label>Title</label>
      <input
        value={node.data.title || ""}
        onChange={(e) => updateNode(node.id, { title: e.target.value })}
      />

      <label>Description</label>
      <input
        value={node.data.description || ""}
        onChange={(e) => updateNode(node.id, { description: e.target.value })}
      />
    </>
  );
};

export default TaskForm;
