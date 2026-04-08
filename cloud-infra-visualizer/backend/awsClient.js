import { EC2Client } from "@aws-sdk/client-ec2";
import { S3Client } from "@aws-sdk/client-s3";
import { RDSClient } from "@aws-sdk/client-rds";

export const createClients = (region, credentials) => {
  return {
    ec2Client: new EC2Client({ region, credentials }),
    s3Client: new S3Client({ region, credentials }),
    rdsClient: new RDSClient({ region, credentials })
  };
};