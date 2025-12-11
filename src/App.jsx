import React from "react";
import Sidebar from "./components/canvas/Sidebar";
import WorkflowCanvas from "./components/canvas/WorkflowCanvas";
import NodeFormPanel from "./components/forms/NodeFormPanel";
import { WorkflowProvider } from "./context/WorkflowContext";

function App() {
  return (
    <WorkflowProvider>
      <div className="layout">
        <Sidebar />
        <div style={{ width: "100%", height: "100vh" }}>
          <WorkflowCanvas />
        </div>
        <NodeFormPanel />
      </div>
    </WorkflowProvider>
  );
}

export default App;
