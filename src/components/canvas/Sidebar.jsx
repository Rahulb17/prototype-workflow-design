// src/components/canvas/Sidebar.jsx
import React from "react";

const Sidebar = () => {
  const onDragStart = (e, type) => {
    // two formats to maximize compatibility
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.setData("text/plain", type);

    // optional: hide the default drag image for cleaner UX
    try {
      const img = new Image();
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      e.dataTransfer.setDragImage(img, 0, 0);
    } catch (error) {
      // ignore
    }

    console.log("[Sidebar] dragstart:", type);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="sidebar">
      <h3>Nodes</h3>

      <div
        className="draggable"
        draggable
        onDragStart={(e) => onDragStart(e, "start")}
      >
        Start Node
      </div>

      <div
        className="draggable"
        draggable
        onDragStart={(e) => onDragStart(e, "task")}
      >
        Task Node
      </div>

      <div
        className="draggable"
        draggable
        onDragStart={(e) => onDragStart(e, "approval")}
      >
        Approval Node
      </div>

      <div
        className="draggable"
        draggable
        onDragStart={(e) => onDragStart(e, "automated")}
      >
        Automated Node
      </div>

      <div
        className="draggable"
        draggable
        onDragStart={(e) => onDragStart(e, "end")}
      >
        End Node
      </div>
    </aside>
  );
};

export default Sidebar;
