const ApprovalNode = ({ data }) => (
  <div className="node approval-node">
    <strong>{data.title || "Approval"}</strong>
    <small>{data.role || "Approver"}</small>
  </div>
);

export default ApprovalNode;
