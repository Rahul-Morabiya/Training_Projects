export const questions = [
    {
        name: "AWS Cloud Practitioner",
        questionArr: [
            {
                question: "Which AWS service provides virtual servers in the cloud?",
                options: ["EC2", "S3", "Lambda", "RDS"],
                correctAnswer: 0
            },
            {
                question: "Which AWS service is used for object storage?",
                options: ["EBS", "S3", "EFS", "Glacier Vault"],
                correctAnswer: 1
            },
            {
                question: "What pricing model allows you to pay only for what you use?",
                options: ["Reserved", "OnDemand", "Dedicated Host", "Spot Block"],
                correctAnswer: 1
            },
            {
                question: "Which service is serverless compute?",
                options: ["EC2", "Lambda", "Elastic Beanstalk", "Lightsail"],
                correctAnswer: 1
            },
            {
                question: "What does IAM manage?",
                options: ["Storage buckets", "Virtual machines", "User access and permissions", "Billing reports"],
                correctAnswer: 2
            },
            {
                question: "Which service monitors AWS resources?",
                options: ["CloudTrail", "CloudWatch", "Trusted Advisor", "Inspector"],
                correctAnswer: 1
            },
            {
                question: "Which AWS service provides a managed relational database?",
                options: ["DynamoDB", "Redshift", "RDS", "Aurora Serverless"],
                correctAnswer: 2
            },
            {
                question: "Which AWS support plan provides 24/7 technical support and a TAM?",
                options: ["Basic", "Developer", "Business", "Enterprise"],
                correctAnswer: 3
            },
            {
                question: "Which AWS service helps with DDoS protection?",
                options: ["Shield", "WAF", "Inspector", "Macie"],
                correctAnswer: 0
            },
            {
                question: "Which pillar is NOT part of the AWS Well-Architected Framework?",
                options: ["Security", "Reliability", "Scalability", "Performance Efficiency"],
                correctAnswer: 2
            }
        ]
    },

    {
        name: "GCP Cloud Digital Leader",
        questionArr: [
            {
                question: "Which GCP service provides virtual machines?",
                options: ["Cloud Functions", "Compute Engine", "App Engine", "Cloud Run"],
                correctAnswer: 1
            },
            {
                question: "What is Google Cloud's object storage service?",
                options: ["Cloud Storage", "BigQuery", "Filestore", "Spanner"],
                correctAnswer: 0
            },
            {
                question: "Which service is a fully managed data warehouse?",
                options: ["BigQuery", "Cloud SQL", "Firestore", "Dataproc"],
                correctAnswer: 0
            },
            {
                question: "Which service is serverless container platform?",
                options: ["GKE", "Cloud Run", "Compute Engine", "Dataplex"],
                correctAnswer: 1
            },
            {
                question: "What does IAM control in GCP?",
                options: ["Networking speed", "User access and roles", "Storage encryption only", "Billing tiers"],
                correctAnswer: 1
            },
            {
                question: "Which service provides Kubernetes management?",
                options: ["Anthos", "GKE", "Cloud Functions", "Cloud Build"],
                correctAnswer: 1
            },
            {
                question: "Which pricing model offers automatic sustained use discounts?",
                options: ["On-demand", "Committed use", "Sustained use", "Spot VMs"],
                correctAnswer: 2
            },
            {
                question: "Which tool monitors GCP resources?",
                options: ["Cloud Monitoring", "Cloud Trace", "Security Command Center", "Cloud Armor"],
                correctAnswer: 0
            },
            {
                question: "Which service is used for AI/ML APIs?",
                options: ["Vertex AI", "Bigtable", "Dataprep", "Cloud CDN"],
                correctAnswer: 0
            },
            {
                question: "What is the top-level GCP resource hierarchy element?",
                options: ["Project", "Folder", "Organization", "Resource"],
                correctAnswer: 2
            }
        ]
    },

    {
        name: "Azure Fundamentals AZ-900",
        questionArr: [
            {
                question: "Which Azure service provides virtual machines?",
                options: ["Azure App Service", "Azure Virtual Machines", "Azure Functions", "Azure Logic Apps"],
                correctAnswer: 1
            },
            {
                question: "Which Azure service is used for object storage?",
                options: ["Azure Blob Storage", "Azure Files", "Azure Disk", "Cosmos DB"],
                correctAnswer: 0
            },
            {
                question: "Which service is serverless compute in Azure?",
                options: ["Azure VM", "Azure Functions", "Azure Kubernetes Service", "Azure DevOps"],
                correctAnswer: 1
            },
            {
                question: "What does Azure Active Directory manage?",
                options: ["Networking", "Identity and Access", "Storage", "Billing"],
                correctAnswer: 1
            },
            {
                question: "Which service is a NoSQL database?",
                options: ["Azure SQL Database", "Cosmos DB", "Azure Synapse", "Azure Table Storage"],
                correctAnswer: 1
            },
            {
                question: "Which Azure service helps monitor resources?",
                options: ["Azure Monitor", "Azure Advisor", "Azure Policy", "Azure Sentinel"],
                correctAnswer: 0
            },
            {
                question: "Which pricing feature helps reduce costs with long-term commitment?",
                options: ["Pay-as-you-go", "Reserved Instances", "Spot Pricing", "Free Tier"],
                correctAnswer: 1
            },
            {
                question: "Which Azure service manages Kubernetes clusters?",
                options: ["AKS", "App Service", "Virtual WAN", "DevTest Labs"],
                correctAnswer: 0
            },
            {
                question: "What is Azure Policy used for?",
                options: ["Monitoring", "Governance and compliance", "Load balancing", "Encryption keys only"],
                correctAnswer: 1
            },
            {
                question: "Which Azure service provides DDoS protection?",
                options: ["Azure Firewall", "Azure Sentinel", "Azure DDoS Protection", "Azure Defender"],
                correctAnswer: 2
            }
        ]
    }
];