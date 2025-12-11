export const simulateWorkflow = async (workflow) => {
  return {
    steps: workflow.nodes.map((n) => ({
      nodeId: n.id,
      message: `Executed ${n.type}`,
    })),
  };
};
