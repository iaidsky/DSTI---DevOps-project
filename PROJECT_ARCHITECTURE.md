# Project Architecture & Component Links

## 📊 Overview

This document explains how all components of the DevOps project are interconnected and which files are used in each deployment method.

---

## 🔗 Component Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                        Source Code                               │
│  userapi/src/  →  Application Logic (index.js, routes, dbClient)│
└────────────┬────────────────────────────────────────────────────┘
             │
             ├──→ Step 1: Testing
             │    └─→ userapi/test/*.js
             │        ├─ config.test.js (configuration validation)
             │        ├─ db.test.js (Redis connection tests)
             │        └─ user.test.js (API endpoint tests)
             │
             ├──→ Step 2: CI/CD Pipeline
             │    └─→ .github/workflows/ci-cd.yml
             │        ├─ Uses: package.json (dependencies)
             │        ├─ Runs: npm test (all test files)
             │        ├─ Builds: Dockerfile
             │        └─ Pushes to: Docker Hub
             │
             ├──→ Step 3: Docker Containerization
             │    ├─→ userapi/Dockerfile
             │    │   ├─ Uses: package.json
             │    │   ├─ Copies: src/
             │    │   └─ Excludes: .dockerignore
             │    └─→ docker-compose.yml
             │        ├─ Service 1: redis (database)
             │        └─ Service 2: userapi (application)
             │
             ├──→ Step 4: Vagrant + Ansible (IaC)
             │    ├─→ iac/Vagrantfile
             │    │   ├─ Creates: Ubuntu VM
             │    │   ├─ Syncs: userapi/ folder
             │    │   └─ Provisions with: Ansible
             │    └─→ iac/playbooks/
             │        ├─ main.yml (orchestrates all roles)
             │        ├─ inventory.ini (VM connection)
             │        └─ roles/
             │            ├─ nodejs/ (installs Node.js runtime)
             │            ├─ redis/ (installs & configures Redis)
             │            ├─ application/ (deploys userapi)
             │            └─ healthcheck/ (monitors service)
             │
             └──→ Step 5: Kubernetes Orchestration
                  └─→ k8s/*.yaml
                      ├─ namespace.yaml (isolation)
                      ├─ configmap.yaml (environment variables)
                      ├─ persistent-volume.yaml (storage)
                      ├─ redis-deployment.yaml (database pods)
                      ├─ redis-service.yaml (database networking)
                      ├─ userapi-deployment.yaml (app pods)
                      ├─ userapi-service.yaml (app networking)
                      └─ hpa.yaml (auto-scaling)
```

---

## 📁 File Dependencies Matrix

| File/Folder | Used By | Dependencies | Purpose |
|-------------|---------|--------------|---------|
| **userapi/src/index.js** | All deployments | dbClient.js, routes/user.js, express | Main application entry |
| **userapi/src/dbClient.js** | index.js, tests | redis package | Redis connection management |
| **userapi/src/routes/user.js** | index.js | dbClient.js, express | User CRUD operations |
| **userapi/package.json** | npm, Docker, CI/CD, Ansible | - | Dependency management |
| **userapi/test/*.js** | npm test, CI/CD | chai, mocha, supertest | Automated testing |
| **userapi/Dockerfile** | Docker build, CI/CD | package.json, src/ | Container image definition |
| **userapi/.dockerignore** | Docker build | - | Excludes unnecessary files |
| **docker-compose.yml** | docker-compose | Dockerfile | Local multi-container setup |
| **.github/workflows/ci-cd.yml** | GitHub Actions | package.json, Dockerfile | Automated pipeline |
| **iac/Vagrantfile** | vagrant | Ansible playbooks | VM provisioning |
| **iac/playbooks/main.yml** | Vagrant | All roles | Ansible orchestration |
| **iac/playbooks/roles/nodejs/** | main.yml | - | Runtime installation |
| **iac/playbooks/roles/redis/** | main.yml | - | Database installation |
| **iac/playbooks/roles/application/** | main.yml | userapi/ (synced) | App deployment |
| **iac/playbooks/roles/healthcheck/** | main.yml | - | Service monitoring |
| **k8s/namespace.yaml** | kubectl | - | Resource isolation |
| **k8s/configmap.yaml** | userapi-deployment | - | Environment config |
| **k8s/persistent-volume.yaml** | redis-deployment | - | Data persistence |
| **k8s/redis-deployment.yaml** | kubectl | persistent-volume, namespace | Database pods |
| **k8s/redis-service.yaml** | userapi-deployment | redis-deployment | Database networking |
| **k8s/userapi-deployment.yaml** | kubectl | configmap, redis-service | Application pods |
| **k8s/userapi-service.yaml** | kubectl | userapi-deployment | Application networking |
| **k8s/hpa.yaml** | kubectl | userapi-deployment | Auto-scaling rules |

---

## 🔄 Deployment Flow Diagrams

### Local Development Flow
```
1. Start Redis
   docker run redis:alpine
          ↓
2. Install Dependencies
   npm install (uses package.json)
          ↓
3. Run Application
   npm start (runs src/index.js)
          ↓
4. Application Connects
   src/index.js → src/dbClient.js → Redis
          ↓
5. Routes Available
   src/routes/user.js handles CRUD
```

### Docker Compose Flow
```
1. docker-compose.yml defines:
   ├─ redis service (port 6379)
   └─ userapi service
          ↓
2. userapi service:
   ├─ Builds from: Dockerfile
   ├─ Environment: REDIS_HOST=redis
   └─ Depends on: redis health check
          ↓
3. Dockerfile:
   ├─ FROM node:20-alpine
   ├─ COPY package.json
   ├─ RUN npm ci
   ├─ COPY src/
   └─ CMD ["node", "src/index.js"]
          ↓
4. Network: Both services on userapi-network
          ↓
5. Access: http://localhost:3000
```

### Vagrant + Ansible Flow
```
1. Vagrantfile:
   ├─ VM: Ubuntu 22.04
   ├─ Sync: ./userapi → /home/vagrant/userapi
   └─ Provision: Ansible
          ↓
2. Ansible main.yml runs roles in order:
   ├─ nodejs (installs Node.js 20)
   ├─ redis (installs & starts Redis)
   ├─ application (deploys userapi)
   └─ healthcheck (monitors service)
          ↓
3. Application role:
   ├─ npm install (in synced folder)
   ├─ Creates systemd service (userapi.service.j2)
   └─ Starts service with environment
          ↓
4. Service runs:
   └─ /usr/bin/node /home/vagrant/userapi/src/index.js
          ↓
5. Access: http://192.168.56.10:3000
```

### Kubernetes Flow
```
1. Create Namespace
   kubectl apply -f namespace.yaml
          ↓
2. Setup Storage
   kubectl apply -f persistent-volume.yaml
   (Creates PV and PVC for Redis data)
          ↓
3. Setup Configuration
   kubectl apply -f configmap.yaml
   (REDIS_HOST, REDIS_PORT, NODE_ENV)
          ↓
4. Deploy Redis
   kubectl apply -f redis-deployment.yaml
   └─ Uses: persistent-volume
          ↓
   kubectl apply -f redis-service.yaml
   └─ Exposes: redis-deployment on port 6379
          ↓
5. Deploy Application
   kubectl apply -f userapi-deployment.yaml
   ├─ Image: saiboukeita/userapi:latest
   ├─ Replicas: 3
   ├─ Environment: from configmap
   └─ Connects to: redis-service
          ↓
   kubectl apply -f userapi-service.yaml
   └─ Exposes: userapi-deployment on NodePort 30000
          ↓
6. Setup Auto-scaling
   kubectl apply -f hpa.yaml
   └─ Scales: 2-10 pods based on CPU/Memory
          ↓
7. Access: minikube service userapi-service -n userapi
```

---

## 🔧 Configuration Connections

### Environment Variables Flow

```
Development (Local):
├─ REDIS_HOST: 127.0.0.1
├─ REDIS_PORT: 6379
└─ PORT: 3000
Source: OS environment or defaults in code

Docker Compose:
├─ REDIS_HOST: redis (service name)
├─ REDIS_PORT: 6379
└─ NODE_ENV: production
Source: docker-compose.yml

Vagrant/Ansible:
├─ REDIS_HOST: 127.0.0.1
├─ REDIS_PORT: 6379
└─ NODE_ENV: production
Source: userapi.service.j2 template

Kubernetes:
├─ REDIS_HOST: redis-service
├─ REDIS_PORT: 6379
└─ NODE_ENV: production
Source: configmap.yaml → userapi-deployment.yaml
```

### Network Connections

```
Local:
Application → localhost:6379 (Redis)

Docker Compose:
userapi service → redis:6379 (via Docker network)

Vagrant:
VM Application → 127.0.0.1:6379 (Redis in same VM)
Host → 192.168.56.10:3000 (Port forwarding)

Kubernetes:
userapi pods → redis-service:6379 (ClusterIP)
External → NodePort 30000 → userapi-service
```

---

## 📋 Testing Dependencies

### Unit Tests (test/config.test.js)
- **Tests**: Environment variable configuration
- **Dependencies**: None (pure logic)
- **Validates**: PORT, REDIS_HOST, REDIS_PORT defaults

### Database Tests (test/db.test.js)
- **Tests**: Redis connection and operations
- **Dependencies**: Redis server running
- **Validates**: PING, SET/GET, HSET/HGETALL

### API Tests (test/user.test.js)
- **Tests**: All CRUD endpoints
- **Dependencies**: Redis server + Application
- **Validates**: POST, GET, PUT, DELETE operations
- **Requires**: 
  - src/index.js (app server)
  - src/dbClient.js (Redis connection)
  - src/routes/user.js (endpoints)

---

## 🎯 CI/CD Pipeline Connections

### GitHub Actions Workflow (.github/workflows/ci-cd.yml)

```
Job 1: Test
├─ Setup: Node.js 18.x & 20.x (matrix)
├─ Services: Redis container
├─ Steps:
│  ├─ Checkout code
│  ├─ Setup Node.js
│  ├─ npm ci (uses package.json)
│  ├─ npm test (runs all test/*.js)
│  └─ Health check test
└─ Output: Test results

Job 2: Build (depends on: test)
├─ Setup: Docker Buildx
├─ Steps:
│  ├─ Login to Docker Hub (uses secrets)
│  ├─ Build image (uses Dockerfile)
│  └─ Push to saiboukeita/userapi:latest
└─ Output: Docker image

Job 3: Security Scan (depends on: build)
├─ Tool: Trivy
├─ Scans: saiboukeita/userapi:latest
└─ Output: Vulnerability report
```

---

## 🔑 Key Integration Points

### 1. Application → Database
- **Files**: src/dbClient.js
- **Connection**: Redis client (host, port)
- **Used by**: All CRUD operations

### 2. Tests → Application
- **Files**: test/user.test.js
- **Method**: Supertest (HTTP requests)
- **Validates**: API responses

### 3. Docker → Application
- **Files**: Dockerfile, docker-compose.yml
- **Builds**: Container with src/ + dependencies
- **Runs**: node src/index.js

### 4. Ansible → Synced Folder
- **Files**: Vagrantfile, roles/application/
- **Method**: Shared folder /home/vagrant/userapi
- **Deploys**: npm install + systemd service

### 5. Kubernetes → Docker Image
- **Files**: userapi-deployment.yaml
- **Image**: saiboukeita/userapi:latest
- **Config**: ConfigMap environment variables

---

## 📊 Data Flow

```
User Request
    ↓
[Kubernetes Service / Docker / VM Port]
    ↓
Express Router (src/index.js)
    ↓
Route Handler (src/routes/user.js)
    ↓
Redis Client (src/dbClient.js)
    ↓
Redis Database
    ↓
Response back through same path
```

---

## 🚀 Quick Reference: Which Files for Each Step

### Step 1: Create Web Application
```
✓ userapi/package.json
✓ userapi/src/index.js
✓ userapi/src/dbClient.js
✓ userapi/src/routes/user.js
✓ userapi/test/config.test.js
✓ userapi/test/db.test.js
✓ userapi/test/user.test.js
```

### Step 2: CI/CD Pipeline
```
✓ .github/workflows/ci-cd.yml
→ Uses: all files from Step 1
→ Requires: GitHub secrets (DOCKER_USERNAME, DOCKER_PASSWORD)
```

### Step 3: Docker
```
✓ userapi/Dockerfile
✓ userapi/.dockerignore
✓ docker-compose.yml
→ Uses: package.json, src/
```

### Step 4: Vagrant + Ansible
```
✓ iac/Vagrantfile
✓ iac/playbooks/main.yml
✓ iac/playbooks/inventory.ini
✓ iac/playbooks/roles/nodejs/tasks/main.yml
✓ iac/playbooks/roles/redis/tasks/main.yml
✓ iac/playbooks/roles/application/tasks/main.yml
✓ iac/playbooks/roles/application/templates/userapi.service.j2
✓ iac/playbooks/roles/healthcheck/tasks/main.yml
→ Uses: entire userapi/ folder (synced)
```

### Step 5: Kubernetes
```
✓ k8s/namespace.yaml
✓ k8s/configmap.yaml
✓ k8s/persistent-volume.yaml
✓ k8s/redis-deployment.yaml
✓ k8s/redis-service.yaml
✓ k8s/userapi-deployment.yaml
✓ k8s/userapi-service.yaml
✓ k8s/hpa.yaml
→ Uses: Docker image from Docker Hub
```

---

## ✅ Validation Checklist

Before testing, ensure these connections exist:

- [ ] package.json lists all dependencies
- [ ] src/index.js imports dbClient and routes
- [ ] src/routes/user.js imports dbClient
- [ ] test files can import src files
- [ ] Dockerfile can access package.json and src/
- [ ] docker-compose.yml references correct image
- [ ] Vagrantfile syncs userapi folder
- [ ] Ansible roles are in correct order
- [ ] Kubernetes deployment references correct image
- [ ] ConfigMap values match application expectations

---

**Ready for Testing!** All components are properly linked and configured.
