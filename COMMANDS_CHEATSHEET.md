# 🎯 Commands Cheat Sheet

Quick reference for all commands you'll need.

---

## 📦 Installation & Setup

### Node.js Dependencies
```bash
cd userapi
npm install
```

### Start Redis (Docker)
```bash
docker run -d -p 6379:6379 --name redis redis:alpine
```

### Start Redis (Windows - if installed locally)
```bash
redis-server
```

---

## 🧪 Testing

### Run All Tests
```bash
cd userapi
npm test
```

### Run Application Locally
```bash
cd userapi
npm start
```

### Test Health Endpoint
```bash
curl http://localhost:3000/health
```

---

## 🐳 Docker Commands

### Build Image
```bash
cd userapi
docker build -t YOUR_DOCKERHUB_USERNAME/userapi:latest .
```

### Login to Docker Hub
```bash
docker login
```

### Push Image
```bash
docker push YOUR_DOCKERHUB_USERNAME/userapi:latest
```

### Run Single Container
```bash
docker run -d -p 3000:3000 \
  -e REDIS_HOST=host.docker.internal \
  -e REDIS_PORT=6379 \
  YOUR_DOCKERHUB_USERNAME/userapi:latest
```

### Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up -d --build
```

---

## 🖥️ Vagrant Commands

### Start VM
```bash
cd iac
vagrant up
```

### SSH into VM
```bash
vagrant ssh
```

### Check VM Status
```bash
vagrant status
```

### Restart VM
```bash
vagrant reload
```

### Reprovision (run Ansible again)
```bash
vagrant provision
```

### Stop VM
```bash
vagrant halt
```

### Destroy VM
```bash
vagrant destroy -f
```

---

## ☸️ Kubernetes Commands

### Start Minikube
```bash
minikube start
```

### Deploy All Resources
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/persistent-volume.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/redis-service.yaml
kubectl apply -f k8s/userapi-deployment.yaml
kubectl apply -f k8s/userapi-service.yaml
kubectl apply -f k8s/hpa.yaml
```

### Or Apply All at Once
```bash
kubectl apply -f k8s/
```

### Check All Resources
```bash
kubectl get all -n userapi
```

### Check Pods
```bash
kubectl get pods -n userapi
```

### Check Services
```bash
kubectl get svc -n userapi
```

### Check Persistent Volumes
```bash
kubectl get pv,pvc -n userapi
```

### Check HPA
```bash
kubectl get hpa -n userapi
```

### View Logs
```bash
kubectl logs -f deployment/userapi-deployment -n userapi
```

### Describe Pod (for debugging)
```bash
kubectl describe pod <pod-name> -n userapi
```

### Access Application
```bash
minikube service userapi-service -n userapi
```

### Delete All Resources
```bash
kubectl delete -f k8s/
```

### Stop Minikube
```bash
minikube stop
```

---

## 📝 Git Commands

### Initialize Repository
```bash
git init
```

### Add All Files
```bash
git add .
```

### Commit
```bash
git commit -m "feat: complete DevOps final project implementation"
```

### Create Main Branch
```bash
git branch -M main
```

### Add Remote
```bash
git remote add origin https://github.com/YOUR_USERNAME/DevOps-Project.git
```

### Push to GitHub
```bash
git push -u origin main
```

### Add Screenshots and Push
```bash
git add images/
git commit -m "docs: add project screenshots"
git push
```

---

## 🧪 API Testing Commands

### Health Check
```bash
curl http://localhost:3000/health
```

### Create User
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }'
```

### Get User
```bash
curl http://localhost:3000/user/johndoe
```

### Update User
```bash
curl -X PUT http://localhost:3000/user/johndoe \
  -H "Content-Type: application/json" \
  -d '{"email": "john.newemail@example.com"}'
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/user/johndoe
```

---

## 🔍 Debugging Commands

### Check if Port 3000 is in Use (Windows)
```powershell
netstat -ano | findstr :3000
```

### Check if Redis is Running
```bash
docker ps | grep redis
```

### View Docker Logs
```bash
docker logs <container-id>
```

### View Docker Compose Logs
```bash
docker-compose logs userapi
docker-compose logs redis
```

### Check Node.js Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

### Check Docker Version
```bash
docker --version
```

### Check Vagrant Version
```bash
vagrant --version
```

### Check Kubectl Version
```bash
kubectl version
```

---

## 📸 Screenshot Commands

### Application Running
```bash
cd userapi
npm start
# Then take screenshot of terminal + browser
```

### Tests Passing
```bash
cd userapi
npm test
# Take screenshot showing all tests pass
```

### Docker Containers
```bash
docker-compose up -d
docker-compose ps
# Take screenshot
```

### Kubernetes Pods
```bash
kubectl get all -n userapi
kubectl get pods -n userapi -o wide
# Take screenshot
```

### Vagrant VM
```bash
cd iac
vagrant status
vagrant ssh
# Take screenshot of both commands
```

---

## 🧹 Cleanup Commands

### Stop All Docker Containers
```bash
docker-compose down
docker stop $(docker ps -aq)
```

### Remove All Stopped Containers
```bash
docker container prune -f
```

### Stop Vagrant VM
```bash
cd iac
vagrant halt
```

### Delete Kubernetes Resources
```bash
kubectl delete -f k8s/
```

### Stop Minikube
```bash
minikube stop
```

---

## 📋 Pre-Submission Checklist Commands

### 1. Run Tests
```bash
cd userapi
npm test
```

### 2. Test Docker Build
```bash
cd userapi
docker build -t test-build .
```

### 3. Test Docker Compose
```bash
docker-compose up -d
curl http://localhost:3000/health
docker-compose down
```

### 4. Test Vagrant
```bash
cd iac
vagrant up
vagrant ssh -c "curl http://localhost:3000/health"
```

### 5. Test Kubernetes
```bash
minikube start
kubectl apply -f k8s/
kubectl wait --for=condition=ready pod -l app=userapi -n userapi --timeout=300s
kubectl get pods -n userapi
```

### 6. Verify Git Status
```bash
git status
git log --oneline -5
```

---

## 🚀 Quick Full Test Sequence

```bash
# 1. Local test
cd userapi
npm install
npm test
npm start &
sleep 5
curl http://localhost:3000/health
pkill node

# 2. Docker Compose test
cd ..
docker-compose up -d
sleep 10
curl http://localhost:3000/health
docker-compose down

# 3. Kubernetes test (if Minikube running)
kubectl apply -f k8s/
kubectl wait --for=condition=ready pod -l app=userapi -n userapi --timeout=300s
kubectl get pods -n userapi
```

---

## 📞 Useful Info Commands

### Show All Environment Variables
```bash
# PowerShell
Get-ChildItem Env:

# Inside container
docker exec <container-id> env
```

### Check Disk Space
```bash
# PowerShell
Get-PSDrive C

# Linux (in VM)
df -h
```

### Check Memory
```bash
# PowerShell
Get-ComputerInfo | Select-Object CsTotalPhysicalMemory,CsPhyicallyInstalledMemory

# Linux (in VM)
free -h
```

---

## 🎯 Most Important Commands

```bash
# BUILD
docker build -t YOUR_USERNAME/userapi:latest ./userapi
docker push YOUR_USERNAME/userapi:latest

# TEST
cd userapi && npm test

# DEPLOY LOCAL
docker-compose up -d

# DEPLOY K8S
kubectl apply -f k8s/

# GIT
git add .
git commit -m "your message"
git push
```

---

**Save this file for quick reference during setup and testing!** 📌
