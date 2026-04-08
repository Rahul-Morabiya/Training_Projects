export const buildGraph = (regionsData) => {
  console.log("🔥 NEW GRAPH BUILDER LOADED");

  const nodes = [];
  const edges = [];

  let edgeCounter = 0;

  const createEdge = (source, target) => ({
    id: `edge-${edgeCounter++}`,
    source,
    target,
    style: { stroke: "#555" }
  });

  const nodeSet = new Set();

  const addNode = (node) => {
    if (!nodeSet.has(node.id)) {
      nodeSet.add(node.id);
      nodes.push(node);
    }
  };

  regionsData.forEach((regionData) => {
    const { region, ec2, vpcs, subnets, securityGroups, s3, rds } = regionData;

    const regionId = `region-${region}`;

    // 🌍 REGION
    addNode({
      id: regionId,
      type: "region",
      data: {
        label: region,
        region
      },
      position: { x: 0, y: 0 }
    });

    // 🌐 VPC
    vpcs?.forEach((vpc) => {
      const vpcId = `vpc-${vpc.VpcId}`;

      addNode({
        id: vpcId,
        type: "vpc",
        data: {
          label: vpc.VpcId,
          region,
          cidr: vpc.CidrBlock,
          state: vpc.State
        },
        position: { x: 0, y: 0 }
      });

      edges.push(createEdge(regionId, vpcId));
    });

    // 📦 SUBNET
    subnets?.forEach((subnet) => {
      const subnetId = `subnet-${subnet.SubnetId}`;

      addNode({
        id: subnetId,
        type: "subnet",
        data: {
          label: subnet.SubnetId,
          region,
          cidr: subnet.CidrBlock,
          az: subnet.AvailabilityZone
        },
        position: { x: 0, y: 0 }
      });

      edges.push(createEdge(`vpc-${subnet.VpcId}`, subnetId));
    });

    // 🛡️ SECURITY GROUP
    securityGroups?.forEach((sg) => {
      const sgId = `sg-${sg.GroupId}`;

      addNode({
        id: sgId,
        type: "sg",
        data: {
          label: sg.GroupName,
          region,
          description: sg.Description
        },
        position: { x: 0, y: 0 }
      });

      edges.push(createEdge(`vpc-${sg.VpcId}`, sgId));
    });

    // 🖥️ EC2
    ec2?.forEach((reservation) => {
      reservation.Instances?.forEach((instance) => {
        const ec2Id = `ec2-${instance.InstanceId}`;

        console.log("🧪 EC2 NODE:", {
          id: instance.InstanceId,
          type: instance.InstanceType
        });

        addNode({
          id: ec2Id,
          type: "ec2",
          data: {
            label: instance.InstanceId,
            region,
            state: instance.State?.Name,
            instanceType: instance.InstanceType,
            privateIp: instance.PrivateIpAddress
          },
          position: { x: 0, y: 0 }
        });

        if (instance.SubnetId) {
          edges.push(createEdge(`subnet-${instance.SubnetId}`, ec2Id));
        }
      });
    });

    // 🗄️ RDS
    rds?.forEach((db) => {
      const rdsId = `rds-${db.DBInstanceIdentifier}`;

      addNode({
        id: rdsId,
        type: "rds",
        data: {
          label: db.DBInstanceIdentifier,
          region,
          engine: db.Engine,
          status: db.DBInstanceStatus
        },
        position: { x: 0, y: 0 }
      });

      db.DBSubnetGroup?.Subnets?.forEach((subnet) => {
        edges.push(createEdge(`subnet-${subnet.SubnetIdentifier}`, rdsId));
      });
    });

    // 🪣 S3
    s3?.forEach((bucket) => {
      const s3Id = `s3-${bucket.Name}`;

      addNode({
        id: s3Id,
        type: "s3",
        data: {
          label: bucket.Name,
          region,
          created: bucket.CreationDate
        },
        position: { x: 0, y: 0 }
      });

      edges.push(createEdge(regionId, s3Id));
    });
  });

  // console.log("🧠 GRAPH NODES:", nodes);

  return { nodes, edges };
};