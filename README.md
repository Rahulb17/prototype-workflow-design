Workflow Designer (React + React Flow)

A visual drag-and-drop workflow builder built using React, React Flow (XYFlow), and a clean context-driven state architecture.
Users can create workflows by placing nodes, connecting them, and editing node properties through a dynamic right-side form panel.

⭐ Features
🧩 Visual Workflow Editing

Drag workflow nodes from the left sidebar to the canvas

Move nodes freely

Connect nodes using handles

Delete nodes/edges

Pan, zoom, and auto-fit

📝 Node Editor Panel

Each node opens a form with type-specific fields:

Node Type	Editable Fields
Start	Title, metadata key/value pairs
Task	Title, description, assignee, due date, custom fields
Approval	Role, approval threshold
Automated	Action selection, dynamic parameters
End	End message, include summary toggle + summary text
🔗 Edge Editing Panel

Click an edge to edit it

Change label, style, color, width

Delete edges

⚛ Controlled React Flow

React Flow is fully controlled by context

Ensures stable and predictable rendering

Avoids desync between form inputs and canvas

🎨 Clean UI

Sidebar for node types

Canvas in the center

Right panel for forms

Fully responsive layout

Optimized CSS with variables

🛠 Tech Stack

React 18

Vite

React Flow / XYFlow

React Context API

Custom CSS

JavaScript ES2023

📦 Installation
1. Clone the repository
git clone https://github.com/your-username/workflow-designer.git
cd workflow-designer

2. Install dependencies
npm install


If peer-dependency conflicts appear:

npm install --legacy-peer-deps

3. Start the development server
npm run dev

4. Open in browser
http://localhost:5173

📁 Folder Structure
src/
│
├── api/
│   └── automations.js
│
├── components/
│   ├── canvas/
│   │   ├── WorkflowCanvas.jsx
│   │   ├── nodes/
│   │   │   ├── StartNode.jsx
│   │   │   ├── TaskNode.jsx
│   │   │   ├── ApprovalNode.jsx
│   │   │   ├── AutomatedNode.jsx
│   │   │   ├── EndNode.jsx
│   │   │   └── nodeTypes.js
│   │
│   ├── forms/
│   │   ├── NodeFormPanel.jsx
│   │   ├── EdgeForm.jsx
│   │   └── forms/
│   │       ├── StartForm.jsx
│   │       ├── TaskForm.jsx
│   │       ├── ApprovalForm.jsx
│   │       ├── AutomatedForm.jsx
│   │       └── EndForm.jsx
│   │
│   ├── sidebar/
│   │   └── Sidebar.jsx
│   │
│   └── App.jsx
│
├── context/
│   └── WorkflowContext.jsx
│
├── styles.css
├── main.jsx
└── vite.config.js

🔧 How It Works
1. Centralized Workflow State

The entire workflow (nodes, edges, selections) lives in WorkflowContext.jsx.

{
  nodes: [...],
  edges: [...],
  selectedNode: null,
  selectedEdge: null
}

2. Canvas

WorkflowCanvas.jsx handles:

Drag/drop node creation

Node movement

Edge creation

Node/edge selection

3. Dynamic Form Rendering

NodeFormPanel.jsx checks the selected node type and renders the correct form component.

4. Controlled Mode

State is passed directly to React Flow:

<ReactFlow
  nodes={nodes}
  edges={edges}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  onConnect={onConnect}
/>


This ensures:

No infinite loops

Predictable UI updates

Clean undo/redo extension in the future

🚀 Custom CSS System

The project uses a clean variable-based structure (styles.css):

CSS variables for colors, spacing, fonts

Consistent layout grid

Smooth transitions

Hover animations for nodes and sidebar items

Scrollbar styling

Responsive layout

📘 Available Scripts
Script	Description
npm run dev	Start dev server
npm run build	Build production bundle
npm run preview	Preview production build
🌱 Future Enhancements (Optional)

Export workflow to JSON

Import workflow from JSON

Auto-layout (DAG algorithm)

Template workflows

Execution simulator

Undo/redo

Collaboration mode

Backend integration (Node.js / Python)

🤝 Contributing

Fork this repository

Create your feature branch

Commit changes

Push and open a pull request

📄 License

This project is released under the MIT License.
You are free to use, modify, and distribute it.