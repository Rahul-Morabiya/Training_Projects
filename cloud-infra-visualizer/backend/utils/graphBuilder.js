export const buildGraph = (regionsData) => {
  const nodes = [];
  const edges = [];

  let edgeCounter = 0; // ✅ GLOBAL COUNTER

  const createEdge = (source, target, label = "") => ({
    id: `edge-${edgeCounter++}`, // ✅ ALWAYS UNIQUE
    source,
    target,
    label
  });

  const nodeSet = new Set(); // ✅ avoid duplicate nodes

  const addNode = (node) => {
    if (!nodeSet.has(node.id)) {
      nodeSet.add(node.id);
      nodes.push(node);
    }
  };

  regionsData.forEach((regionData) => {
    const { region, ec2, vpcs, subnets, securityGroups, s3, rds } = regionData;

    const regionId = `region-${region}`;

    addNode({
      id: regionId,
      type: "region",
      data: { label: region },
      position: { x: 0, y: 0 }
    });

    // VPC
    vpcs?.forEach((vpc) => {
      const vpcId = `vpc-${vpc.VpcId}`;

      addNode({
        id: vpcId,
        type: "vpc",
        data: { label: vpc.VpcId },
        position: { x: 0, y: 0 }
      });

      edges.push(createEdge(regionId, vpcId, "contains"));
    });

    // Subnet
    subnets?.forEach((subnet) => {
      const subnetId = `subnet-${subnet.SubnetId}`;
      const vpcId = `vpc-${subnet.VpcId}`;

      addNode({
        id: subnetId,
        type: "subnet",
        data: { label: subnet.SubnetId },
        position: { x: 0, y: 0 }
      });

      edges.push(createEdge(vpcId, subnetId, "contains"));
    });

    // Security Groups
    securityGroups?.forEach((sg) => {
      const sgId = `sg-${sg.GroupId}`;
      const vpcId = `vpc-${sg.VpcId}`;

      addNode({
        id: sgId,
        type: "sg",
        data: { label: sg.GroupName },
        position: { x: 0, y: 0 }
      });

      edges.push(createEdge(vpcId, sgId, "has-sg"));
    });

    // EC2
    ec2?.forEach((reservation) => {
      reservation.Instances?.forEach((instance) => {
        const ec2Id = `ec2-${instance.InstanceId}`;

        addNode({
          id: ec2Id,
          type: "ec2",
          data: { label: instance.InstanceId },
          position: { x: 0, y: 0 }
        });

        if (instance.SubnetId) {
          edges.push(
            createEdge(
              `subnet-${instance.SubnetId}`,
              ec2Id,
              "hosts"
            )
          );
        }

        instance.SecurityGroups?.forEach((sg) => {
          edges.push(
            createEdge(
              ec2Id,
              `sg-${sg.GroupId}`,
              "secured-by"
            )
          );
        });
      });
    });

    // RDS
    rds?.forEach((db) => {
      const rdsId = `rds-${db.DBInstanceIdentifier}`;

      addNode({
        id: rdsId,
        type: "rds",
        data: { label: db.DBInstanceIdentifier },
        position: { x: 0, y: 0 }
      });

      db.DBSubnetGroup?.Subnets?.forEach((subnet) => {
        edges.push(
          createEdge(
            `subnet-${subnet.SubnetIdentifier}`,
            rdsId,
            "hosts"
          )
        );
      });
    });

    // S3
    s3?.forEach((bucket) => {
      const s3Id = `s3-${bucket.Name}`;

      addNode({
        id: s3Id,
        type: "s3",
        data: { label: bucket.Name },
        position: { x: 0, y: 0 }
      });

      edges.push(createEdge(regionId, s3Id, "contains"));
    });
  });

  return { nodes, edges };
};