import React from "react";
import { useWorkflow } from "../../context/WorkflowContext";
import StartForm from "./forms/StartForm";
import TaskForm from "./forms/TaskForm";
import ApprovalForm from "./forms/ApprovalForm";
import AutomatedForm from "./forms/AutomatedForm";
import EndForm from "./forms/EndForm";
import EdgeForm from "./EdgeForm";

const formMap = {
  start: StartForm,
  task: TaskForm,
  approval: ApprovalForm,
  automated: AutomatedForm,
  end: EndForm,
};

const NodeFormPanel = () => {
  const { selectedNode, selectedEdge } = useWorkflow();

  // Edge editor takes precedence
  if (selectedEdge) return <EdgeForm />;

  if (!selectedNode) return <div className="panel">Select a node</div>;

  const FormComponent = formMap[selectedNode.type];

  if (!FormComponent) return <div className="panel">No form available for this node type</div>;

  return (
    <div className="panel">
      <h3>Edit Node</h3>
      <FormComponent node={selectedNode} />
    </div>
  );
};

export default NodeFormPanel;
