const AutomatedNode = ({ data }) => (
  <div className="node automated-node">
    <strong>{data.title || "Automation"}</strong>
    <small>{data.action || "Action"}</small>
  </div>
);

export default AutomatedNode;
