const TaskNode = ({ data }) => (
  <div className="node task-node">
    <strong>{data.title || "Task"}</strong>
    <small>{data.description}</small>
  </div>
);

export default TaskNode;
