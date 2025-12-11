const EndNode = ({ data }) => (
  <div className="node end-node">
    <strong>{data.title || "End"}</strong>
  </div>
);

export default EndNode;
