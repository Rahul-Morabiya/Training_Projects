// utils/graphBuilder.js

export const buildGraph = (regionsData) => {
  const nodes = [];
  const edges = [];
  let edgeCounter = 0;

  const nodeSet = new Set();

  const addNode = (node) => {
    if (!nodeSet.has(node.id)) {
      nodeSet.add(node.id);
      nodes.push(node);
    }
  };

  const createEdge = (source, target, label) => ({
    id: `edge-${edgeCounter++}`,
    source,
    target,
    label,
    type: "step",
    data: { label },
    style: {
      stroke: "#6b7280"
    }
  });

  regionsData.forEach((regionData) => {
    const {
      region,
      ec2,
      vpcs,
      subnets,
      securityGroups,
      s3,
      rds
    } = regionData;

    const regionId = `region-${region}`;

    // 🌍 REGION
    addNode({
      id: regionId,
      type: "region",
      data: {
        label: region,
        region,
        raw: regionData
      },
      position: { x: 0, y: 0 }
    });

    // 🌐 VPC
    vpcs.forEach((vpc) => {
      const vpcId = `vpc-${vpc.VpcId}`;

      addNode({
        id: vpcId,
        type: "vpc",
        data: {
          label: vpc.VpcId,
          region,
          cidr: vpc.CidrBlock,
          state: vpc.State,
          raw: vpc
        },
        position: { x: 0, y: 0 }
      });

      edges.push(createEdge(regionId, vpcId, "DEPLOYED_IN"));
    });

    // 📦 SUBNET
    subnets.forEach((subnet) => {
      const subnetId = `subnet-${subnet.SubnetId}`;

      addNode({
        id: subnetId,
        type: "subnet",
        data: {
          label: subnet.SubnetId,
          region,
          cidr: subnet.CidrBlock,
          az: subnet.AvailabilityZone,
          raw: subnet
        },
        position: { x: 0, y: 0 }
      });

      edges.push(
        createEdge(`vpc-${subnet.VpcId}`, subnetId, "CONTAINS")
      );
    });

    // 🛡️ SECURITY GROUP
    securityGroups.forEach((sg) => {
      const sgId = `sg-${sg.GroupId}`;

      addNode({
        id: sgId,
        type: "sg",
        data: {
          label: sg.GroupName,
          region,
          description: sg.Description,
          raw: sg
        },
        position: { x: 0, y: 0 }
      });

      edges.push(
        createEdge(`vpc-${sg.VpcId}`, sgId, "SECURES")
      );
    });

    // 🖥️ EC2
    ec2.forEach((reservation) => {
      reservation.Instances?.forEach((instance) => {
        const ec2Id = `ec2-${instance.InstanceId}`;

        addNode({
          id: ec2Id,
          type: "ec2",
          data: {
            label: instance.InstanceId,
            region,
            state: instance.State?.Name,
            instanceType: instance.InstanceType,
            privateIp: instance.PrivateIpAddress,
            raw: instance
          },
          position: { x: 0, y: 0 }
        });

        // Subnet → EC2
        if (instance.SubnetId) {
          edges.push(
            createEdge(
              `subnet-${instance.SubnetId}`,
              ec2Id,
              "HOSTS"
            )
          );
        }

        // EC2 → SG (🔥 NEW)
        instance.SecurityGroups?.forEach((sg) => {
          edges.push(
            createEdge(
              ec2Id,
              `sg-${sg.GroupId}`,
              "SECURED_BY"
            )
          );
        });
      });
    });

    // 🗄️ RDS
    rds.forEach((db) => {
      const rdsId = `rds-${db.DBInstanceIdentifier}`;

      addNode({
        id: rdsId,
        type: "rds",
        data: {
          label: db.DBInstanceIdentifier,
          region,
          engine: db.Engine,
          status: db.DBInstanceStatus,
          raw: db
        },
        position: { x: 0, y: 0 }
      });

      // Subnet → RDS
      db.DBSubnetGroup?.Subnets?.forEach((subnet) => {
        edges.push(
          createEdge(
            `subnet-${subnet.SubnetIdentifier}`,
            rdsId,
            "DEPLOYED_IN"
          )
        );
      });

      // VPC → RDS (🔥 NEW)
      if (db.DBSubnetGroup?.VpcId) {
        edges.push(
          createEdge(
            `vpc-${db.DBSubnetGroup.VpcId}`,
            rdsId,
            "CONTAINS_DB"
          )
        );
      }
    });

    // 🪣 S3
    s3.forEach((bucket) => {
      const s3Id = `s3-${bucket.Name}`;

      addNode({
        id: s3Id,
        type: "s3",
        data: {
          label: bucket.Name,
          region,
          created: bucket.CreationDate,
          raw: bucket
        },
        position: { x: 0, y: 0 }
      });

      edges.push(createEdge(regionId, s3Id, "GLOBAL_RESOURCE"));
    });
  });

  return { nodes, edges };
};