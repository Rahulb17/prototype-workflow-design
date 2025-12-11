import Sidebar from "./components/canvas/Sidebar";
import WorkflowCanvas from "./components/canvas/WorkflowCanvas";
import NodeFormPanel from "./components/forms/NodeFormPanel";
import { WorkflowProvider } from "./context/WorkflowContext";

function App() {
  return (
    <WorkflowProvider>
      <div className="layout">
        <Sidebar />
        <WorkflowCanvas />
        <NodeFormPanel />
      </div>
    </WorkflowProvider>
  );
}

export default App;
