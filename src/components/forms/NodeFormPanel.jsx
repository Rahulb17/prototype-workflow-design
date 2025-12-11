import { useWorkflow } from "../../context/WorkflowContext";
import StartForm from "./forms/StartForm";
import TaskForm from "./forms/TaskForm";
import ApprovalForm from "./forms/ApprovalForm";
import AutomatedForm from "./forms/AutomatedForm";
import EndForm from "./forms/EndForm";

const formMap = {
  start: StartForm,
  task: TaskForm,
  approval: ApprovalForm,
  automated: AutomatedForm,
  end: EndForm,
};

const NodeFormPanel = () => {
  const { selectedNode } = useWorkflow();

  if (!selectedNode) return <div className="panel">Select a node</div>;

  const FormComponent = formMap[selectedNode.type];

  return (
    <div className="panel">
      <h3>Edit Node</h3>
      <FormComponent node={selectedNode} />
    </div>
  );
};

export default NodeFormPanel;
