const StartNode = ({ data }) => (
  <div className="node start-node">
    <strong>{data.title || "Start"}</strong>
  </div>
);

export default StartNode;
