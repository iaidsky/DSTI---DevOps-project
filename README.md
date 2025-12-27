# DevOps Final Project - User API

[![CI/CD Pipeline](https://github.com/iaidsky/DevOps-Project/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/iaidsky/DevOps-Project/actions)
[![Docker Hub](https://img.shields.io/docker/pulls/saiboukeita/userapi)](https://hub.docker.com/r/saiboukeita/userapi)

A complete DevOps project implementing a RESTful User API with CRUD operations, demonstrating modern DevOps practices including CI/CD, containerization, orchestration, and infrastructure as code.

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Links](#links)
- [Author](#author)
- [AI Usage](#ai-usage)

## ✨ Features

### Application Features
- **Modern Web UI**: Beautiful, responsive user interface for easy management
- **CRUD Operations**: Create, Read, Update, and Delete user records
- **RESTful API**: Clean and intuitive API endpoints
- **Data Persistence**: Redis database for fast data storage
- **Health Monitoring**: Health check endpoint for service monitoring
- **Error Handling**: Comprehensive error handling and validation
- **Real-time Updates**: Live user list with instant feedback

### DevOps Features
- **Automated Testing**: Unit, integration, and API tests
- **CI/CD Pipeline**: GitHub Actions for automated testing and deployment
- **Containerization**: Docker images with multi-stage builds
- **Orchestration**: Kubernetes manifests for production deployment
- **Infrastructure as Code**: Vagrant and Ansible for automated provisioning
- **Container Orchestration**: Docker Compose for local development
- **Horizontal Scaling**: Kubernetes HPA for automatic scaling

## 🏗️ Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Client    │─────>│  User API   │─────>│    Redis    │
│             │      │  (Node.js)  │      │  Database   │
└─────────────┘      └─────────────┘      └─────────────┘
```

## 🛠️ Technologies Used

- **Application**: Node.js, Express.js
- **Database**: Redis
- **Testing**: Mocha, Chai, Supertest
- **CI/CD**: GitHub Actions
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes, Minikube
- **IaC**: Vagrant, Ansible
- **Version Control**: Git, GitHub

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Redis** (v6 or higher)
- **Docker** (v20 or higher)
- **Docker Compose** (v2 or higher)
- **Kubernetes/Minikube** (latest)
- **Vagrant** (v2.3 or higher)
- **VirtualBox** (v6.1 or higher)
- **Ansible** (v2.10 or higher)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/iaidsky/DSTI---DevOps-project.git
cd DSTI---DevOps-project
```

### 2. Local Development Setup

#### Install Dependencies

```bash
cd userapi
npm install
```

#### Start Redis (Option 1: Docker)

```bash
docker run -d -p 6379:6379 --name redis redis:alpine
```

#### Start Redis (Option 2: Local Installation)

Windows:
```bash
# Download and install from https://redis.io/download
redis-server
```

Linux:
```bash
sudo apt-get install redis-server
sudo systemctl start redis-server
```

#### Run the Application

```bash
npm start
```

The API will be available at `http://localhost:3000`

**Access the Modern Web UI**: Open your browser and navigate to `http://localhost:3000` to use the beautiful user interface!

### Option 1: Use the Web Interface (Recommended)

1. **Start the server** (as shown above)
2. **Open your browser**: Navigate to `http://localhost:3000`
3. **Enjoy the modern UI** with:
   - ✨ Create users with an intuitive form
   - 🔍 Quick search functionality
   - 📊 Real-time statistics dashboard
   - 🗂️ View all users in a beautiful grid layout
   - 🗑️ Delete users with one click
   - 📱 Fully responsive design for mobile and desktop

### Option 2: Use the REST API Directly

Continue with the API endpoints documented below...

### 3. Docker Compose Setup

```bash
docker-compose up -d
```

This will start both Redis and the User API application.

### 4. Vagrant + Ansible Setup

```bash
cd iac
vagrant up
```

This will:
- Create an Ubuntu VM
- Install Node.js and Redis
- Deploy the application
- Configure health checks

Access the VM:
```bash
vagrant ssh
```

### 5. Kubernetes Setup

#### Start Minikube

```bash
minikube start
```

#### Deploy to Kubernetes

```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Create persistent volumes
kubectl apply -f k8s/persistent-volume.yaml

# Create ConfigMap
kubectl apply -f k8s/configmap.yaml

# Deploy Redis
kubectl apply -f k8s/redis-deployment.yaml
kube🌐 Modern Web Interface (Recommended)

The easiest way to interact with the User API is through the modern web interface:

1. **Start the application**:
```bash
cd userapi
npm start
```

2. **Open your browser**: Navigate to `http://localhost:3000`

3. **Features**:
   - **Create Users**: Fill in the form on the left panel
   - **Search Users**: Use the quick search panel on the right
   - **View All Users**: See all created users in the grid below
   - **Delete Users**: Click the delete button on any user card
   - **Statistics**: View total users and last update time
   - **Responsive Design**: Works on desktop, tablet, and mobile

### 📡 REST ctl apply -f k8s/redis-service.yaml

# Deploy User API
kubectl apply -f k8s/userapi-deployment.yaml
kubectl apply -f k8s/userapi-service.yaml

# Create HPA (optional)
kubectl apply -f k8s/hpa.yaml
```

#### Access the Application

```bash
minikube service userapi-service -n userapi
```List All Users
```bash
GET /user
```

Response:
```json
{
  "users": [
    {
      "username": "alice",
      "firstname": "Alice",
      "lastname": "Smith",
      "email": "alice@example.com"
    }
  ],
  "count": 1
}
```

#### 

## 📖 Usage

### API Endpoints

#### Health Check
```bash
GET /health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-22T10:00:00.000Z",
  "uptime": 123.456
}
```

#### Create User
```bash
POST /user
Content-Type: application/json

{
  "username": "Saibkei",
  "firstname": "Saibou",
  "lastname": "Keita",
  "email": "Saibou.keita@edu.dsti.intitute"
}
```

#### Get User
```bash
GET /user/:username
``List all users
curl http://localhost:3000/user

# `

#### Update User
```bash
PUT /user/:username
Content-Type: application/json

{
  "email": "new.email@example.com"
}
```

#### Delete User
```bash
DELETE /user/:username
```

### Example Usage with cURL

```bash
# Create a user
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","firstname":"Alice","lastname":"Smith","email":"alice@example.com"}'

# Get user
curl http://localhost:3000/user/alice

# Update user
curl -X PUT http://localhost:3000/user/alice \
  -H "Content-Type: application/json" \
  -d '{"email":"alice.smith@example.com"}'

# Delete user
curl -X DELETE http://localhost:3000/user/alice
```

## 🧪 Testing

### Run All Tests

```bash
cd userapi
npm test
```

### Test Coverage

The test suite includes:
- **API Tests**: Testing all CRUD endpoints
- **Database Tests**: Redis connection and operations
- **Configuration Tests**: Environment variable validation
- **Health Check Tests**: Service health monitoring

### Manual Testing

1. Start Redis:
```bash
docker run -d -p 6379:6379 redis:alpine
```

2. Start the application:
```bash
npm start
```

3. Run tests:
```bash
npm test
```

## 🚢 Deployment

### Docker Deployment

#### Build Image

```bash
cd userapi
docker build -t saiboukeita/userapi:latest .
```

#### Push to Docker Hub

```bash
docker login
docker push saiboukeita/userapi:latest
```

#### Run Container

```bash
docker run -d -p 3000:3000 \
  -e REDIS_HOST=host.docker.internal \
  -e REDIS_PORT=6379 \
  saiboukeita/userapi:latest
```

### Kubernetes Deployment

See the [Kubernetes Setup](#5-kubernetes-setup) section above.

### Monitoring Deployment
public/
│   │   ├── index.html          # Modern web UI
│   │   └── README.md           # UI documentation
│   ├── 
```bash
# Check pods status
kubectl get pods -n userapi

# Check services
kubectl get svc -n userapi

# View logs
kubectl logs -f deployment/userapi-deployment -n userapi

# Check HPA status
kubectl get hpa -n userapi
```

## 📁 Project Structure

```
DevOps-Project/
├── .github/
│   └── workflows/
│       └── ci-cd.yml           # GitHub Actions CI/CD pipeline
├── userapi/
│   ├── src/
│   │   ├── index.js            # Application entry point
│   │   ├── dbClient.js         # Redis client configuration
│   │   └── routes/
│   │       └── user.js         # User route handlers
│   ├── test/
│   │   ├── user.test.js        # API integration tests
│   │   ├── db.test.js          # Database connection tests
│   │   └── config.test.js      # Configuration tests
│   ├── package.json            # NPM dependencies
│   ├── Dockerfile              # Docker image definition
│   ├── .dockerignore           # Docker ignore file
│   └── CHANGELOG.md            # Version history
├── iac/
│   ├── Vagrantfile             # VM configuration
│   └── playbooks/
│       ├── main.yml            # Main Ansible playbook
│       ├── inventory.ini       # Ansible inventory
│       └── roles/
│           ├── nodejs/         # Node.js installation
│           ├── redis/          # Redis installation
│           ├── application/    # Application deployment
│           └── healthcheck/    # Health check setup
├── k8s/
│   ├── namespace.yaml          # Kubernetes namespace
│   ├── configmap.yaml          # Configuration
│   ├── persistent-volume.yaml  # Persistent storage
│   ├── redis-deployment.yaml   # Redis deployment
│   ├── redis-service.yaml      # Redis service
│   ├── userapi-deployment.yaml # API deployment
│   ├── userapi-service.yaml    # API service
│   └── hpa.yaml                # Horizontal Pod Autoscaler
├── images/                     # Screenshots folder
├── Modern Web Interface

![Web UI Dashboard](images/web-ui-dashboard.png)
*Beautiful, responsive web interface with gradient design*

### Create User Form

![Create User](images/create-user-form.png)
*Intuitive user creation with real-time validation*

### User List Grid

![User Grid](images/user-grid.png)
*All users displayed in a modern card layout*

## 📸 Screenshots

### Application Running

![Application Running](images/app-running.png)

### API Health Check

![Health Check](images/health-check.png)

### Docker Containers

![Docker Containers](images/docker-containers.png)

### Kubernetes Pods

![Kubernetes Pods](images/k8s-pods.png)

### CI/CD Pipeline

![GitHub Actions](images/github-actions.png)

### Vagrant VM

![Vagrant VM](images/vagrant-vm.png)

*Note: Add actual screenshots to the `images/` folder*

## 🔗 Links

- **GitHub Repository**: https://github.com/iaidsky/DevOps-Project
- **Docker Hub Image**: https://hub.docker.com/r/saiboukeita/userapi
- **CI/CD Pipeline**: https://github.com/iaidsky/DevOps-Project/actions

## 👤 Author

**Saibou KEITA**
- GitHub: [@iaidsky](https://github.com/iaidsky)
- Email: saibou.keita@edu.dsti.institute
- Individual Project

## 🤖 AModern Web UI**: Beautiful, responsive interface with gradient design and animations
2. ✅ **Docker Compose**: Complete docker-compose.yml for local development
3. ✅ **Horizontal Pod Autoscaler**: Kubernetes HPA for automatic scaling
4. ✅ **Health Checks**: Comprehensive health monitoring at all levels
5. ✅ **Multi-environment Testing**: CI/CD tests on Node.js 18 and 20
6. ✅ **Security Scanning**: Trivy vulnerability scanning in CI/CD
7. ✅ **Non-root Container**: Docker container runs as non-root user
8. ✅ **Resource Limits**: Kubernetes resource requests and limits
9. ✅ **ConfigMap Usage**: Kubernetes ConfigMap for configuration management
10. ✅ **CORS Support**: Cross-Origin Resource Sharing enabled for develop

All code has been reviewed, tested, and validated by the author.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Bonus Features Implemented

1. ✅ **Docker Compose**: Complete docker-compose.yml for local development
2. ✅ **Horizontal Pod Autoscaler**: Kubernetes HPA for automatic scaling
3. ✅ **Health Checks**: Comprehensive health monitoring at all levels
4. ✅ **Multi-environment Testing**: CI/CD tests on Node.js 18 and 20
5. ✅ **Security Scanning**: Trivy vulnerability scanning in CI/CD
6. ✅ **Non-root Container**: Docker container runs as non-root user
7. ✅ **Resource Limits**: Kubernetes resource requests and limits
8. ✅ **ConfigMap Usage**: Kubernetes ConfigMap for configuration management

## 🤝 Contributing

This is an academic project. Contributions are not accepted.

## 📞 Support

For questions or issues, please contact me.

