# Quick Start Guide

This guide will help you get started with the DevOps project quickly.

## 📋 Prerequisites Check

Before starting, verify you have:

```bash
node --version    # Should be v18 or v20
docker --version  # Should be v20+
vagrant --version # Should be v2.3+
kubectl version   # Should be latest
```

## 🚀 Quick Start Options

### Option 1: Local Development (Fastest)

```bash
# 1. Start Redis
docker run -d -p 6379:6379 --name redis redis:alpine

# 2. Install and run
cd userapi
npm install
npm test
npm start

# 3. Test the API
curl http://localhost:3000/health
```

### Option 2: Docker Compose (Recommended)

```bash
# Start everything
docker-compose up -d

# View logs
docker-compose logs -f

# Test
curl http://localhost:3000/health

# Stop
docker-compose down
```

### Option 3: Vagrant + Ansible

```bash
# From project root
cd iac
vagrant up

# This will take 5-10 minutes
# Once complete, test:
curl http://192.168.56.10:3000/health

# SSH into VM
vagrant ssh
```

### Option 4: Kubernetes

```bash
# Start Minikube
minikube start

# Deploy all resources
kubectl apply -f k8s/

# Wait for pods to be ready
kubectl get pods -n userapi -w

# Access the app
minikube service userapi-service -n userapi
```

## 🧪 Testing the API

### Health Check
```bash
curl http://localhost:3000/health
```

### Create User
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "firstname": "Test",
    "lastname": "User",
    "email": "test@example.com"
  }'
```

### Get User
```bash
curl http://localhost:3000/user/testuser
```

### Update User
```bash
curl -X PUT http://localhost:3000/user/testuser \
  -H "Content-Type: application/json" \
  -d '{"email": "newemail@example.com"}'
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/user/testuser
```

## 🐛 Troubleshooting

### Redis Connection Error
```bash
# Check if Redis is running
docker ps | grep redis

# If not, start it:
docker run -d -p 6379:6379 --name redis redis:alpine
```

### Port Already in Use
```bash
# Find process using port 3000
# Windows:
netstat -ano | findstr :3000

# Linux/Mac:
lsof -i :3000

# Kill the process or change port:
PORT=3001 npm start
```

### Vagrant Issues
```bash
# Reset VM
vagrant destroy -f
vagrant up

# Check status
vagrant status

# View logs
vagrant up --debug
```

### Kubernetes Issues
```bash
# Check pod status
kubectl get pods -n userapi

# View logs
kubectl logs -f deployment/userapi-deployment -n userapi

# Describe pod for details
kubectl describe pod <pod-name> -n userapi

# Delete and recreate
kubectl delete -f k8s/
kubectl apply -f k8s/
```

## 📦 Before Submitting

1. **Update placeholders in README.md**:
   - Replace `YOUR_USERNAME` with your GitHub username
   - Replace `YOUR_DOCKERHUB_USERNAME` with your Docker Hub username
   - Add your email and group number

2. **Build and push Docker image**:
   ```bash
   cd userapi
   docker build -t YOUR_DOCKERHUB_USERNAME/userapi:latest .
   docker login
   docker push YOUR_DOCKERHUB_USERNAME/userapi:latest
   ```

3. **Update Kubernetes manifest**:
   - Edit `k8s/userapi-deployment.yaml`
   - Change image to `YOUR_DOCKERHUB_USERNAME/userapi:latest`

4. **Add screenshots** to `images/` folder:
   - Application running
   - Tests passing
   - Docker containers
   - Kubernetes pods
   - CI/CD pipeline
   - Vagrant VM

5. **Initialize Git repository**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete DevOps final project"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/DevOps-Project.git
   git push -u origin main
   ```

6. **Configure GitHub Secrets**:
   - Go to Settings → Secrets → Actions
   - Add `DOCKER_USERNAME`
   - Add `DOCKER_PASSWORD`

7. **Test CI/CD pipeline**:
   - Push a commit
   - Check GitHub Actions tab
   - Verify all jobs pass

## 🎯 Submission Checklist

- [ ] All code is committed to GitHub
- [ ] README.md is updated with your information
- [ ] Docker image is pushed to Docker Hub
- [ ] Screenshots are added to images folder
- [ ] CI/CD pipeline is working
- [ ] All tests pass
- [ ] Docker Compose works
- [ ] Vagrant provisioning works
- [ ] Kubernetes deployment works
- [ ] GitHub repo is shared with instructors
- [ ] Link submitted on Moodle
- [ ] Email sent to instructors

## 📧 Submission Email Template

```
Subject: DSTI - DevOps project - <LastName FirstName> - <Group number>

Dear Instructors,

Please find my DevOps final project submission:

Repository: https://github.com/YOUR_USERNAME/DevOps-Project
Docker Hub: https://hub.docker.com/r/YOUR_DOCKERHUB_USERNAME/userapi

Group: <Your Group Number>
Author: <Your Name>

All required steps have been completed as documented in the README.md and 
PROJECT_COMPLETION_REPORT.md files.

Best regards,
<Your Name>
```

## ✨ Bonus Points

The project includes these bonus features:
- Docker Compose configuration
- Kubernetes HPA (auto-scaling)
- Security scanning in CI/CD
- Multi-version testing
- Non-root Docker container
- Resource limits in Kubernetes
- ConfigMap usage
- Persistent volumes

## 🎓 Resources

- [Project Requirements](devops_final_project.md)
- [Complete Documentation](README.md)
- [Detailed Report](PROJECT_COMPLETION_REPORT.md)

---

**Good luck with your submission! 🚀**
