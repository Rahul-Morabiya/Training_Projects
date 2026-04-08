import {
  DescribeInstancesCommand,
  DescribeVpcsCommand,
  DescribeSubnetsCommand,
  DescribeSecurityGroupsCommand
} from "@aws-sdk/client-ec2";

import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { DescribeDBInstancesCommand } from "@aws-sdk/client-rds";

import dotenv from "dotenv";
import { createClients } from "../awsClient.js";

dotenv.config();

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

const REGIONS = ["ap-south-1", "us-east-1"];

const safeCall = async (promise, fallback, label) => {
  try {
    return await promise;
  } catch (err) {
    console.error(`❌ AWS Error [${label}]:`, err.message);
    return fallback;
  }
};

export const fetchAWSResources = async () => {

  const results = await Promise.all(
    REGIONS.map(async (region) => {

      console.log(`🌍 Fetching region: ${region}`);

      const { ec2Client, s3Client, rdsClient } =
        createClients(region, credentials);

      const ec2Data = await safeCall(
        ec2Client.send(new DescribeInstancesCommand({})),
        { Reservations: [] },
        `EC2 (${region})`
      );

      const vpcs = await safeCall(
        ec2Client.send(new DescribeVpcsCommand({})),
        { Vpcs: [] },
        `VPC (${region})`
      );

      const subnets = await safeCall(
        ec2Client.send(new DescribeSubnetsCommand({})),
        { Subnets: [] },
        `Subnets (${region})`
      );

      const sgs = await safeCall(
        ec2Client.send(new DescribeSecurityGroupsCommand({})),
        { SecurityGroups: [] },
        `SecurityGroups (${region})`
      );

      const s3 = await safeCall(
        s3Client.send(new ListBucketsCommand({})),
        { Buckets: [] },
        `S3 (${region})`
      );

      const rds = await safeCall(
        rdsClient.send(new DescribeDBInstancesCommand({})),
        { DBInstances: [] },
        `RDS (${region})`
      );

      // 🔥 DEBUG LOG
      console.log("🔍 RAW AWS DATA:", {
        region,
        ec2: ec2Data,
        vpcs,
        subnets,
        sgs,
        s3,
        rds
      });

      return {
        region,
        ec2: ec2Data.Reservations || [],
        vpcs: vpcs.Vpcs || [],
        subnets: subnets.Subnets || [],
        securityGroups: sgs.SecurityGroups || [],
        s3: s3.Buckets || [],
        rds: rds.DBInstances || []
      };
    })
  );

  console.log("✅ AWS fetch completed");

  return results;
};