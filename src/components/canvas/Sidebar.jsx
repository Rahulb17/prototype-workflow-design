const Sidebar = () => {
  const onDragStart = (e, type) => {
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="sidebar">
      <h3>Nodes</h3>
      <div draggable onDragStart={(e) => onDragStart(e, "start")}>Start Node</div>
      <div draggable onDragStart={(e) => onDragStart(e, "task")}>Task Node</div>
      <div draggable onDragStart={(e) => onDragStart(e, "approval")}>Approval Node</div>
      <div draggable onDragStart={(e) => onDragStart(e, "automated")}>Automated Node</div>
      <div draggable onDragStart={(e) => onDragStart(e, "end")}>End Node</div>
    </aside>
  );
};

export default Sidebar;
