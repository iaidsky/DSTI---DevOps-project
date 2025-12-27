# 🧪 Complete Testing Guide

This guide provides step-by-step instructions to test your User API application across all deployment methods.

---

## 📋 Table of Contents

1. [Docker Compose Testing](#1-docker-compose-testing)
2. [Local Development Testing](#2-local-development-testing)
3. [Vagrant Testing](#3-vagrant-testing)
4. [Kubernetes Testing](#4-kubernetes-testing)
5. [Automated Tests](#5-automated-tests)
6. [Load Testing](#6-load-testing)

---

## 1. Docker Compose Testing

### Step 1.1: Start the Containers

```powershell
# Navigate to project root
cd C:\Users\DEV\Documents\GitHub\DevOps-Project

# Start all services
docker-compose up -d

# Wait for containers to be healthy (30 seconds)
Start-Sleep -Seconds 30

# Check container status
docker-compose ps
```

**Expected Output:**
```
NAME                IMAGE                      STATUS
userapi-app         devops-project-userapi     Up (healthy)
userapi-redis       redis:alpine               Up (healthy)
```

---

### Step 1.2: Test Health Endpoint

**Using curl:**
```powershell
curl http://localhost:3000/health
```

**Using PowerShell:**
```powershell
Invoke-RestMethod http://localhost:3000/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-22T15:30:00.000Z",
  "uptime": 123.456
}
```

---

### Step 1.3: Test Root Endpoint

```powershell
Invoke-RestMethod http://localhost:3000/
```

**Expected Response:**
```json
{
  "message": "User API - DevOps Final Project",
  "endpoints": {
    "health": "/health",
    "createUser": "POST /user",
    "getUser": "GET /user/:username",
    "updateUser": "PUT /user/:username",
    "deleteUser": "DELETE /user/:username"
  }
}
```

---

### Step 1.4: Create a User (POST)

**Using curl (CMD or WSL, NOT PowerShell):**
```bash
curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{\"username\":\"testuser\",\"firstname\":\"Saibou\",\"lastname\":\"KEITA\",\"email\":\"Saibou.keita@cloudy.com\"}'
```

**Using PowerShell:**
```powershell
$body = @{
    username = "testuser"
    firstname = "John"
    lastname = "Doe"
    email = "john@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/user -Method Post -Body $body -ContentType "application/json"
```

**Expected Response:**
```json
{
  "message": "User created successfully",
  "username": "testuser"
}
```

---

### Step 1.5: Get User (GET)

**Using curl:**
```powershell
curl http://localhost:3000/user/testuser
```

**Using PowerShell:**
```powershell
Invoke-RestMethod http://localhost:3000/user/testuser
```

**Expected Response:**
```json
{
  "username": "testuser",
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com"
}
```

---

### Step 1.6: Update User (PUT)

**Using curl:**
```powershell
curl -X PUT http://localhost:3000/user/testuser -H "Content-Type: application/json" -d '{\"email\":\"newemail@example.com\"}'
```

**Using PowerShell:**
```powershell
$updateBody = @{
    email = "newemail@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/user/testuser -Method Put -Body $updateBody -ContentType "application/json"
```

**Expected Response:**
```json
{
  "message": "User updated successfully"
}
```

**Verify the update:**
```powershell
Invoke-RestMethod http://localhost:3000/user/testuser
```

**Should show:**
```json
{
  "username": "testuser",
  "firstname": "John",
  "lastname": "Doe",
  "email": "newemail@example.com"
}
```

---

### Step 1.7: Delete User (DELETE)

**Using curl:**
```powershell
curl -X DELETE http://localhost:3000/user/testuser
```

**Using PowerShell:**
```powershell
Invoke-RestMethod -Uri http://localhost:3000/user/testuser -Method Delete
```

**Expected Response:**
```json
{
  "message": "User deleted successfully"
}
```

**Verify deletion:**
```powershell
# This should return 404
Invoke-RestMethod http://localhost:3000/user/testuser
```

---

### Step 1.8: Test Error Cases

**Test missing required fields:**
```powershell
$invalidBody = @{
    username = "incomplete"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/user -Method Post -Body $invalidBody -ContentType "application/json"
```

**Expected Response:** (Status 400)
```json
{
  "error": "Missing required fields"
}
```

**Test duplicate user:**
```powershell
# Create user
$user = @{
    username = "duplicate"
    firstname = "Test"
    lastname = "User"
    email = "test@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/user -Method Post -Body $user -ContentType "application/json"

# Try to create same user again (should fail)
Invoke-RestMethod -Uri http://localhost:3000/user -Method Post -Body $user -ContentType "application/json"
```

**Expected Response:** (Status 409)
```json
{
  "error": "User already exists"
}
```

**Test non-existent user:**
```powershell
Invoke-RestMethod http://localhost:3000/user/doesnotexist
```

**Expected Response:** (Status 404)
```json
{
  "error": "User not found"
}
```

---

### Step 1.9: Test in Browser

```powershell
# Open browser to root endpoint
start http://localhost:3000

# Open health check
start http://localhost:3000/health

# Try to get a user (will show JSON or error)
start http://localhost:3000/user/testuser
```

---

### Step 1.10: View Logs

```powershell
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View only userapi logs
docker-compose logs userapi

# View last 50 lines
docker-compose logs --tail=50 userapi
```

---

### Step 1.11: Check Container Health

```powershell
# Check status
docker-compose ps

# Inspect userapi container
docker inspect userapi-app

# Check health status
docker inspect --format='{{.State.Health.Status}}' userapi-app
```

---

### Step 1.12: Stop Containers

```powershell
# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

---

## 2. Local Development Testing

### Step 2.1: Install Dependencies

```powershell
# Navigate to userapi folder
cd userapi

# Install dependencies
npm install
```

---

### Step 2.2: Start Redis

**Option A: Using Docker**
```powershell
docker run -d -p 6379:6379 --name redis redis:alpine
```

**Option B: Using existing docker-compose**
```powershell
cd ..
docker-compose up -d redis
cd userapi
```

---

### Step 2.3: Start Application

```powershell
npm start
```

**Expected Output:**
```
Server listening on port 3000
Redis client connected
```

---

### Step 2.4: Run All Tests (Same as Step 1)

Use the same curl/PowerShell commands from Docker Compose testing above.

---

### Step 2.5: Stop Application

```powershell
# Press Ctrl+C in the terminal running npm start

# Stop Redis if started separately
docker stop redis
docker rm redis
```

---

## 3. Vagrant Testing

### Step 3.1: Start Vagrant VM

```powershell
# Navigate to iac folder
cd ..\iac

# Start and provision VM (first time: 10-15 minutes)
vagrant up
```

---

### Step 3.2: Wait for Provisioning

Watch for these messages:
```
==> default: PLAY RECAP *********************************************
==> default: devops                        : ok=XX   changed=XX
```

---

### Step 3.3: Test from Host Machine

**Using curl:**
```powershell
curl http://192.168.56.10:3000/health
```

**Using PowerShell:**
```powershell
Invoke-RestMethod http://192.168.56.10:3000/health
```

**Create a user:**
```powershell
$body = @{
    username = "vagrantuser"
    firstname = "Vagrant"
    lastname = "Test"
    email = "vagrant@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://192.168.56.10:3000/user -Method Post -Body $body -ContentType "application/json"
```

**Get the user:**
```powershell
Invoke-RestMethod http://192.168.56.10:3000/user/vagrantuser
```

---

### Step 3.4: Test from Inside VM

```powershell
# SSH into VM
vagrant ssh

# Test from inside
curl http://localhost:3000/health

# Check service status
sudo systemctl status userapi
sudo systemctl status redis-server

# View application logs
sudo journalctl -u userapi -f

# Exit VM
exit
```

---

### Step 3.5: Stop Vagrant VM

```powershell
# Stop VM
vagrant halt

# Or destroy completely
vagrant destroy -f
```

---

## 4. Kubernetes Testing

### Step 4.1: Start Minikube

```powershell
# Navigate to project root
cd C:\Users\DEV\Documents\GitHub\DevOps-Project

# Start Minikube
minikube start

# Wait for startup (1-2 minutes)
```

---

### Step 4.2: Deploy Application

```powershell
# Apply all manifests
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/persistent-volume.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/redis-service.yaml
kubectl apply -f k8s/userapi-deployment.yaml
kubectl apply -f k8s/userapi-service.yaml
kubectl apply -f k8s/hpa.yaml

# Or apply all at once
kubectl apply -f k8s/
```

---

### Step 4.3: Wait for Pods to be Ready

```powershell
# Watch pod status (Ctrl+C to exit)
kubectl get pods -n userapi -w

# Check all resources
kubectl get all -n userapi

# Check persistent volumes
kubectl get pv,pvc -n userapi
```

**Wait until all pods show:**
```
NAME                                   READY   STATUS    RESTARTS
redis-deployment-xxxxx                 1/1     Running   0
userapi-deployment-xxxxx-xxxxx         1/1     Running   0
userapi-deployment-xxxxx-xxxxx         1/1     Running   0
userapi-deployment-xxxxx-xxxxx         1/1     Running   0
```

---

### Step 4.4: Access Application

**Option A: Using minikube service**
```powershell
minikube service userapi-service -n userapi
```

**Option B: Port forwarding**
```powershell
kubectl port-forward -n userapi service/userapi-service 3000:3000
```

**Then test:**
```powershell
Invoke-RestMethod http://localhost:3000/health
```

---

### Step 4.5: Test API on Kubernetes

**Get the service URL:**
```powershell
$url = minikube service userapi-service -n userapi --url
```

**Test health:**
```powershell
Invoke-RestMethod "$url/health"
```

**Create user:**
```powershell
$body = @{
    username = "k8suser"
    firstname = "Kubernetes"
    lastname = "Test"
    email = "k8s@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "$url/user" -Method Post -Body $body -ContentType "application/json"
```

**Get user:**
```powershell
Invoke-RestMethod "$url/user/k8suser"
```

---

### Step 4.6: Check Kubernetes Resources

```powershell
# Check pods
kubectl get pods -n userapi

# Check services
kubectl get svc -n userapi

# Check deployments
kubectl get deployments -n userapi

# Check HPA (Horizontal Pod Autoscaler)
kubectl get hpa -n userapi

# Describe a pod
kubectl describe pod <pod-name> -n userapi

# View pod logs
kubectl logs -f deployment/userapi-deployment -n userapi
```

---

### Step 4.7: Test Auto-Scaling

```powershell
# Generate load (in a new terminal)
while ($true) { 
    Invoke-RestMethod http://localhost:3000/health
    Start-Sleep -Milliseconds 10
}

# In another terminal, watch HPA
kubectl get hpa -n userapi -w

# Watch pods scale up
kubectl get pods -n userapi -w
```

---

### Step 4.8: Cleanup Kubernetes

```powershell
# Delete all resources
kubectl delete -f k8s/

# Or delete namespace (removes everything)
kubectl delete namespace userapi

# Stop Minikube
minikube stop

# Delete Minikube cluster
minikube delete
```

---

## 5. Automated Tests

### Step 5.1: Run Test Suite

```powershell
# Navigate to userapi
cd userapi

# Install dependencies (if not done)
npm install

# Run all tests
npm test
```

---

### Step 5.2: Expected Test Output

```
  User API Integration Tests
    POST /user
      ✓ should create a new user
      ✓ should return 400 if required fields are missing
      ✓ should return 409 if user already exists
    GET /user/:username
      ✓ should get an existing user
      ✓ should return 404 if user does not exist
    PUT /user/:username
      ✓ should update an existing user
      ✓ should return 404 if user does not exist
      ✓ should return 400 if no fields to update
    DELETE /user/:username
      ✓ should delete an existing user
      ✓ should return 404 if user does not exist
    GET /health
      ✓ should return health status

  11 passing (XXXms)
```

---

### Step 5.3: Run Individual Test Files

```powershell
# Config tests only
npx mocha test/config.test.js

# Database tests only
npx mocha test/db.test.js

# API tests only
npx mocha test/user.test.js
```

---

## 6. Load Testing

### Step 6.1: Create Multiple Users

```powershell
# Create 10 users
1..10 | ForEach-Object {
    $body = @{
        username = "user$_"
        firstname = "User"
        lastname = "Number$_"
        email = "user$_@example.com"
    } | ConvertTo-Json
    
    Invoke-RestMethod -Uri http://localhost:3000/user -Method Post -Body $body -ContentType "application/json"
    Write-Host "Created user$_"
}
```

---

### Step 6.2: Retrieve All Users

```powershell
# Get all users
1..10 | ForEach-Object {
    $user = Invoke-RestMethod http://localhost:3000/user/user$_
    Write-Host "Retrieved: $($user.username) - $($user.email)"
}
```

---

### Step 6.3: Stress Test

```powershell
# Measure 100 requests
Measure-Command {
    1..100 | ForEach-Object {
        Invoke-RestMethod http://localhost:3000/health
    }
}
```

---

## 📸 Screenshots to Take

### For Documentation

1. **app-running.png**
   - Browser showing `http://localhost:3000`
   - Or terminal with curl output

2. **health-check.png**
   - Health endpoint JSON response

3. **tests-passing.png**
   - `npm test` output showing all tests pass

4. **docker-containers.png**
   - `docker-compose ps` output

5. **docker-logs.png**
   - `docker-compose logs` output

6. **k8s-pods.png**
   - `kubectl get pods -n userapi` output

7. **k8s-services.png**
   - `kubectl get svc -n userapi` output

8. **vagrant-vm.png**
   - `vagrant status` and `vagrant ssh` session

9. **github-actions.png**
   - GitHub Actions workflow success

10. **api-test-sequence.png**
    - Full CRUD operation sequence

---

## ✅ Complete Testing Checklist

### Docker Compose
- [ ] Health endpoint works
- [ ] Create user works
- [ ] Get user works
- [ ] Update user works
- [ ] Delete user works
- [ ] Error handling works (400, 404, 409)
- [ ] Containers are healthy
- [ ] Logs show no errors

### Local Development
- [ ] Application starts successfully
- [ ] Redis connection established
- [ ] All API endpoints work
- [ ] Tests pass

### Vagrant
- [ ] VM provisions successfully
- [ ] Application accessible at 192.168.56.10:3000
- [ ] Service runs as systemd unit
- [ ] Health checks pass

### Kubernetes
- [ ] All pods are running
- [ ] Services are accessible
- [ ] PV/PVC are bound
- [ ] HPA is configured
- [ ] Application responds correctly
- [ ] Logs are accessible

### Automated Tests
- [ ] All tests pass (11/11)
- [ ] No Redis connection errors
- [ ] Test coverage is complete

---

## 🚨 Troubleshooting

### Common Issues

**Docker not running:**
```powershell
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
```

**Port already in use:**
```powershell
# Find process using port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
```

**Redis connection failed:**
```powershell
# Check Redis is running
docker ps | grep redis
```

**Tests failing:**
```powershell
# Ensure Redis is running before tests
docker run -d -p 6379:6379 --name redis redis:alpine
npm test
docker stop redis && docker rm redis
```

**curl commands fail in PowerShell:**
```
Error: "Cannot bind parameter 'Headers'"
```
**Solution:** Either:
- Use PowerShell syntax (Invoke-RestMethod) instead
- OR run curl in Command Prompt (cmd.exe)
- OR run curl in WSL (Windows Subsystem for Linux)

**In PowerShell, use this instead:**
```powershell
$body = @{
    username = "testuser"
    firstname = "Saibou"
    lastname = "KEITA"
    email = "Saibou.keita@cloudy.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/user -Method Post -Body $body -ContentType "application/json"
```

---

## 🎯 Quick Test Script

Save this as `test-all.ps1`:

```powershell
Write-Host "🧪 Testing User API..." -ForegroundColor Cyan

# Health check
Write-Host "`n1️⃣ Testing Health Endpoint..." -ForegroundColor Yellow
Invoke-RestMethod http://localhost:3000/health | ConvertTo-Json

# Create user
Write-Host "`n2️⃣ Creating User..." -ForegroundColor Yellow
$createBody = @{
    username = "quicktest"
    firstname = "Quick"
    lastname = "Test"
    email = "quick@test.com"
} | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:3000/user -Method Post -Body $createBody -ContentType "application/json" | ConvertTo-Json

# Get user
Write-Host "`n3️⃣ Getting User..." -ForegroundColor Yellow
Invoke-RestMethod http://localhost:3000/user/quicktest | ConvertTo-Json

# Update user
Write-Host "`n4️⃣ Updating User..." -ForegroundColor Yellow
$updateBody = @{ email = "updated@test.com" } | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:3000/user/quicktest -Method Put -Body $updateBody -ContentType "application/json" | ConvertTo-Json

# Verify update
Write-Host "`n5️⃣ Verifying Update..." -ForegroundColor Yellow
Invoke-RestMethod http://localhost:3000/user/quicktest | ConvertTo-Json

# Delete user
Write-Host "`n6️⃣ Deleting User..." -ForegroundColor Yellow
Invoke-RestMethod -Uri http://localhost:3000/user/quicktest -Method Delete | ConvertTo-Json

Write-Host "`n✅ All tests completed!" -ForegroundColor Green
```

**Run it:**
```powershell
.\test-all.ps1
```

---

**Happy Testing! 🚀**
