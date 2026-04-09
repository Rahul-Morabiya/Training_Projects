export const generateInsights = (nodes, edges) => {
  const insights = [];

  const nodeMap = new Map();
  nodes.forEach(n => nodeMap.set(n.id, n));

  // 🔥 EC2 without Security Group
  nodes.filter(n => n.type === "ec2").forEach(ec2 => {
    const hasSG = edges.some(
      e => e.source === ec2.id && e.target.startsWith("sg-")
    );

    if (!hasSG) {
      insights.push({
        severity: "HIGH",
        message: `EC2 ${ec2.data.label} has no Security Group`
      });
    }
  });

  // 🔥 RDS not multi-AZ
  nodes.filter(n => n.type === "rds").forEach(rds => {
    if (!rds.data.raw?.MultiAZ) {
      insights.push({
        severity: "MEDIUM",
        message: `RDS ${rds.data.label} is not Multi-AZ`
      });
    }
  });

  // 🔥 Public IP EC2
  nodes.filter(n => n.type === "ec2").forEach(ec2 => {
    if (ec2.data.raw?.PublicIpAddress) {
      insights.push({
        severity: "MEDIUM",
        message: `EC2 ${ec2.data.label} is publicly exposed`
      });
    }
  });

  return insights;
};