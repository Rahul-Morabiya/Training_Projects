import React from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider
} from "reactflow";
import "reactflow/dist/style.css";

const ArchitectureView = ({ nodes, onNodeClick }) => {

  const layoutNodes = [];
  let xOffset = 0;

  const vpcs = nodes.filter(n => n.type === "vpc");

  vpcs.forEach((vpc, i) => {

    const vpcId = `vpc-container-${i}`;

    // 🔥 VPC CONTAINER
    layoutNodes.push({
      id: vpcId,
      position: { x: xOffset, y: 100 },
      data: { label: `VPC\n${vpc.data.label}` },
      style: {
        width: 420,
        height: 300,
        background: "#020617",
        border: "2px dashed #8b5cf6",
        borderRadius: 12,
        padding: 10,
        color: "white"
      }
    });

    // 🔥 SUBNETS
    const subnets = nodes.filter(
      n => n.type === "subnet" && n.data.raw?.VpcId === vpc.data.raw?.VpcId
    );

    subnets.forEach((subnet, j) => {

      const subnetId = `subnet-container-${i}-${j}`;

      layoutNodes.push({
        id: subnetId,
        parentNode: vpcId,
        extent: "parent",
        position: { x: 20, y: 50 + j * 120 },
        data: { label: `Subnet\n${subnet.data.label}` },
        style: {
          width: 360,
          height: 100,
          background: "#020617",
          border: "1.5px solid #06b6d4",
          borderRadius: 10,
          padding: 6,
          color: "white"
        }
      });

      // 🔥 EC2 inside subnet
      const ec2s = nodes.filter(
        n => n.type === "ec2" && n.data.raw?.SubnetId === subnet.data.raw?.SubnetId
      );

      ec2s.forEach((ec2, k) => {
        layoutNodes.push({
          id: ec2.id,
          parentNode: subnetId,
          extent: "parent",
          position: { x: 10 + k * 120, y: 40 },
          data: { label: ec2.data.label },
          style: {
            padding: "6px 10px",
            border: "1px solid #f59e0b",
            borderRadius: 6,
            background: "#111827",
            color: "white",
            fontSize: 11
          }
        });
      });

      // 🔥 RDS inside subnet
      const rdsList = nodes.filter(
        n => n.type === "rds"
      );

      rdsList.forEach((rds, k) => {
        layoutNodes.push({
          id: rds.id,
          parentNode: subnetId,
          extent: "parent",
          position: { x: 150 + k * 120, y: 40 },
          data: { label: rds.data.label },
          style: {
            padding: "6px 10px",
            border: "1px solid #3b82f6",
            borderRadius: 6,
            background: "#111827",
            color: "white",
            fontSize: 11
          }
        });
      });

    });

    xOffset += 460;
  });

  // 🔥 S3 (GLOBAL — outside VPC)
  const s3Buckets = nodes.filter(n => n.type === "s3");

  s3Buckets.forEach((s3, i) => {
    layoutNodes.push({
      id: s3.id,
      position: { x: i * 180, y: 20 },
      data: { label: `S3\n${s3.data.label}` },
      style: {
        padding: "8px 12px",
        border: "1px solid #22c55e",
        borderRadius: 8,
        background: "#020617",
        color: "white",
        fontSize: 11
      }
    });
  });

  return (
    <div style={{ height: "90vh" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={layoutNodes}
          onNodeClick={(e, node) => onNodeClick(node)}
          fitView
          style={{ background: "#020617" }}
        >
          <Background color="#1e293b" gap={30} />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default ArchitectureView;