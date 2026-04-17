# 🌩️ Cloud Infrastructure Visualizer

## Images
1) Home Page Graph Visualization
<img width="1870" height="983" alt="image" src="https://github.com/user-attachments/assets/6da82fa1-0993-43d7-b57a-cb8bfb3cc3c7" />


2) List View Visualization
<img width="1862" height="978" alt="image" src="https://github.com/user-attachments/assets/46943fbf-53c1-420e-9a3b-ee6332fc61e2" />


3) Architecture View Visualization
<img width="1865" height="974" alt="image" src="https://github.com/user-attachments/assets/0978fb7a-66e0-4002-a8b1-8eb89a714876" />


# 🚀 Core Functionalities (Quick Overview)

### 🔗 AWS Integration
- Connects to **real AWS account (Free Tier)**
- Uses **AWS SDK v3**
- Fetches live data from:
  - EC2
  - VPC
  - Subnets
  - Security Groups
  - S3
  - RDS
- Supports **multi-region fetching**

---

### 📊 Graph Visualization
- Interactive graph built using **React Flow**
- Features:
  - Zoom / Pan
  - Mini-map
  - Node selection
  - Connected component highlighting
  - Animated edges
  - Edge relationship labels

---

### 🔄 Relationship Mapping Engine
- Dynamically builds infrastructure relationships:
  - EC2 → Subnet
  - EC2 → Security Group
  - Subnet → VPC
  - VPC → Region
  - RDS → Subnet
  - RDS → VPC
  - S3 → Region

> Relationships are **computed from AWS data**, not hardcoded.

---

### 🎛️ Advanced Controls Panel
- Toggle resource filters:
  - EC2, S3, RDS, VPC, Subnet, Security Groups
- Layout switching:
  - DAG (structured)
  - Free layout
- Region selection
- Search resources
- Graph/List view toggle (modern segmented control)

---

### 📋 Resource List View (SaaS Table UI)
- Fully redesigned **modern table interface**
- Features:
  - Sorting (Type / Name)
  - Pagination
  - Filtering
  - Clickable rows
  - Badge-based UI
  - Clean, readable layout

---

### 🔍 Node Details Panel
- Click any node to view:
  - Metadata (instance type, CIDR, AZ, etc.)
  - Region
  - Status
- Includes **raw AWS JSON data viewer**

---

### 🧠 Intelligent Insights Engine
- Detects infrastructure issues:
  - EC2 without Security Groups
  - Publicly exposed EC2 instances
  - RDS not Multi-AZ
- Demonstrates real-world cloud analysis capability

---

### 🧩 Graph Layout Engine
- Uses **Dagre layout**
- Ensures:
  - Structured hierarchy
  - Clean spacing
  - Minimal overlap

---

### 📤 Export Feature
- Export graph as **PNG**
- Useful for:
  - Documentation
  - Sharing architecture diagrams

---

### 🔐 JWT Authentication
- Backend secured using **JWT-based authentication**
- Token-based API protection
- Designed for scalable secure access

> ⚠️ Authentication system is implemented and will be expanded further.

---

# 🏗️ Architecture

Frontend (React + ReactFlow)
        ↓
Backend API (Node.js + Express)
        ↓
AWS SDK v3
        ↓
AWS Account (Free Tier)


# 🔐 Security

### Backend
- AWS credentials stored in `.env`
- JWT Authentication enabled
- Rate limiting applied
- Proper error handling

### AWS
- IAM user with **ReadOnlyAccess only**
- No write or destructive permissions

---

# ⚙️ Tech Stack

### Frontend
- React (Vite)
- React Flow
- Custom SaaS UI

### Backend
- Node.js
- Express
- AWS SDK v3
- JWT Authentication

### AWS Services
- EC2
- VPC
- Subnets
- Security Groups
- S3
- RDS

---

# 📁 Project Structure


cloud-infra-visualizer/
├── backend/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   │   └── graphBuilder.js
│   ├── awsClient.js
│   ├── app.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── api.js
│   ├── index.html
│   └── vite.config.js
```

