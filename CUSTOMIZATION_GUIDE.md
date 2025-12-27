# 🔧 Customization Guide - What to Change

This document lists **every file** that contains placeholders or data that needs to be customized with your personal information.

---

## 📝 Summary of Changes Needed

| File | Changes Required | Priority |
|------|-----------------|----------|
| README.md | 8 replacements | 🔴 CRITICAL |
| k8s/userapi-deployment.yaml | 1 replacement | 🔴 CRITICAL |
| .github/workflows/ci-cd.yml | GitHub Secrets needed | 🔴 CRITICAL |
| All documentation files | Optional updates | 🟡 OPTIONAL |

---

## 🔴 CRITICAL: Files That MUST Be Changed

### 1. README.md

**Location**: `c:\Users\DEV\Documents\GitHub\DevOps-Project\README.md`

#### Change #1: GitHub Repository Badge (Line 3)

**FROM:**
```markdown
[![CI/CD Pipeline](https://github.com/iaidsky/DevOps-Project/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/iaidsky/DevOps-Project/actions)
```

**TO:**
```markdown
[![CI/CD Pipeline](https://github.com/YOUR_GITHUB_USERNAME/DevOps-Project/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/YOUR_GITHUB_USERNAME/DevOps-Project/actions)
```

**Example with real data:**
```markdown
[![CI/CD Pipeline](https://github.com/johndoe/DevOps-Project/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/johndoe/DevOps-Project/actions)
```

---

#### Change #2: Docker Hub Badge (Line 4)

**FROM:**
```markdown
[![Docker Hub](https://img.shields.io/docker/pulls/saiboukeita/userapi)](https://hub.docker.com/r/saiboukeita/userapi)
```

**TO:**
```markdown
[![Docker Hub](https://img.shields.io/docker/pulls/YOUR_DOCKERHUB_USERNAME/userapi)](https://hub.docker.com/r/YOUR_DOCKERHUB_USERNAME/userapi)
```

**Example with real data:**
```markdown
[![Docker Hub](https://img.shields.io/docker/pulls/johndoe/userapi)](https://hub.docker.com/r/johndoe/userapi)
```

---

#### Change #3: Clone Repository Command (Line 69)

**FROM:**
```bash
git clone https://github.com/iaidsky/DevOps-Project.git
cd DevOps-Project
```

**TO:**
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/DevOps-Project.git
cd DevOps-Project
```

**Example with real data:**
```bash
git clone https://github.com/johndoe/DevOps-Project.git
cd DevOps-Project
```

---

#### Change #4: Docker Build Command (Line 270)

**FROM:**
```bash
cd userapi
docker build -t saiboukeita/userapi:latest .
```

**TO:**
```bash
cd userapi
docker build -t YOUR_DOCKERHUB_USERNAME/userapi:latest .
```

**Example with real data:**
```bash
cd userapi
docker build -t johndoe/userapi:latest .
```

---

#### Change #5: Docker Push Command (Line 276)

**FROM:**
```bash
docker login
docker push saiboukeita/userapi:latest
```

**TO:**
```bash
docker login
docker push YOUR_DOCKERHUB_USERNAME/userapi:latest
```

**Example with real data:**
```bash
docker login
docker push johndoe/userapi:latest
```

---

#### Change #6: Docker Run Command (Line 282)

**FROM:**
```bash
docker run -d -p 3000:3000 \
  -e REDIS_HOST=host.docker.internal \
  -e REDIS_PORT=6379 \
  saiboukeita/userapi:latest
```

**TO:**
```bash
docker run -d -p 3000:3000 \
  -e REDIS_HOST=host.docker.internal \
  -e REDIS_PORT=6379 \
  YOUR_DOCKERHUB_USERNAME/userapi:latest
```

**Example with real data:**
```bash
docker run -d -p 3000:3000 \
  -e REDIS_HOST=host.docker.internal \
  -e REDIS_PORT=6379 \
  johndoe/userapi:latest
```

---

#### Change #7: Links Section (Lines 352-354)

**FROM:**
```markdown
## 🔗 Links

- **GitHub Repository**: https://github.com/iaidsky/DevOps-Project
- **Docker Hub Image**: https://hub.docker.com/r/saiboukeita/userapi
- **CI/CD Pipeline**: https://github.com/iaidsky/DevOps-Project/actions
```

**TO:**
```markdown
## 🔗 Links

- **GitHub Repository**: https://github.com/YOUR_GITHUB_USERNAME/DevOps-Project
- **Docker Hub Image**: https://hub.docker.com/r/YOUR_DOCKERHUB_USERNAME/userapi
- **CI/CD Pipeline**: https://github.com/YOUR_GITHUB_USERNAME/DevOps-Project/actions
```

**Example with real data:**
```markdown
## 🔗 Links

- **GitHub Repository**: https://github.com/johndoe/DevOps-Project
- **Docker Hub Image**: https://hub.docker.com/r/johndoe/userapi
- **CI/CD Pipeline**: https://github.com/johndoe/DevOps-Project/actions
```

---

#### Change #8: Author Section (Lines 356-359)

**FROM:**
```markdown
## 👤 Author

**Saibou KEITA**
- GitHub: [@iaidsky](https://github.com/iaidsky)
- Email: saibou.keita@edu.dsti.institute
- Individual Project
```

**TO:**
```markdown
## 👤 Author

**YOUR FULL NAME**
- GitHub: [@YOUR_GITHUB_USERNAME](https://github.com/YOUR_GITHUB_USERNAME)
- Email: your.email@edu.dsti.institute
- Individual Project (or Group: Group Name, Member 1, Member 2, etc.)
```

**Example with real data:**
```markdown
## 👤 Author

**John Doe**
- GitHub: [@johndoe](https://github.com/johndoe)
- Email: john.doe@edu.dsti.institute
- Individual Project
```

**OR for a group:**
```markdown
## 👤 Authors

**Group SI03 - Team DevOps**
- **John Doe** - GitHub: [@johndoe](https://github.com/johndoe)
- **Jane Smith** - GitHub: [@janesmith](https://github.com/janesmith)
- **Bob Johnson** - GitHub: [@bobjohnson](https://github.com/bobjohnson)
- Email: contact@group-devops.com
```

---

### 2. k8s/userapi-deployment.yaml

**Location**: `c:\Users\DEV\Documents\GitHub\DevOps-Project\k8s\userapi-deployment.yaml`

#### Change #1: Docker Image (Line 23)

**FROM:**
```yaml
    spec:
      containers:
      - name: userapi
        image: saiboukeita/userapi:latest
        imagePullPolicy: Always
```

**TO:**
```yaml
    spec:
      containers:
      - name: userapi
        image: YOUR_DOCKERHUB_USERNAME/userapi:latest
        imagePullPolicy: Always
```

**Example with real data:**
```yaml
    spec:
      containers:
      - name: userapi
        image: johndoe/userapi:latest
        imagePullPolicy: Always
```

---

### 3. GitHub Secrets Configuration

**Location**: GitHub Repository → Settings → Secrets and variables → Actions

**NOT A FILE - These are GitHub Repository Secrets you need to add:**

#### Secret #1: DOCKER_USERNAME
- **Name**: `DOCKER_USERNAME`
- **Value**: Your Docker Hub username (e.g., `johndoe`)

#### Secret #2: DOCKER_PASSWORD
- **Name**: `DOCKER_PASSWORD`
- **Value**: Your Docker Hub password or access token

**How to add:**
1. Go to: `https://github.com/YOUR_USERNAME/DevOps-Project/settings/secrets/actions`
2. Click "New repository secret"
3. Enter name and value
4. Click "Add secret"

---

## 🟡 OPTIONAL: Files You May Want to Update

### 4. docker-compose.yml

**Location**: `c:\Users\DEV\Documents\GitHub\DevOps-Project\docker-compose.yml`

**Current**: Builds from local Dockerfile (no changes needed)

**Optional Change**: Use your pre-built image from Docker Hub

**FROM:**
```yaml
  userapi:
    build: ./userapi
    container_name: userapi-app
```

**TO:**
```yaml
  userapi:
    image: YOUR_DOCKERHUB_USERNAME/userapi:latest
    container_name: userapi-app
```

**Example:**
```yaml
  userapi:
    image: johndoe/userapi:latest
    container_name: userapi-app
```

---

### 5. NEXT_STEPS.md

**Location**: `c:\Users\DEV\Documents\GitHub\DevOps-Project\NEXT_STEPS.md`

**Multiple occurrences of placeholders** - Search and replace:
- `YOUR_USERNAME` → Your GitHub username
- `YOUR_DOCKERHUB_USERNAME` → Your Docker Hub username
- `<LastName FirstName>` → Your actual name
- `<Group XX>` → Your group number (e.g., SI03)

---

### 6. QUICK_START.md

**Location**: `c:\Users\DEV\Documents\GitHub\DevOps-Project\QUICK_START.md`

**Similar replacements as above**

---

### 7. PROJECT_COMPLETION_REPORT.md

**Location**: `c:\Users\DEV\Documents\GitHub\DevOps-Project\PROJECT_COMPLETION_REPORT.md`

**Update if you want to personalize examples:**
- Line 450+: Replace example usernames in commands
- Line 600+: Update Docker Hub references

---

## 🛠️ Quick Replace Commands

### Using PowerShell (Windows)

```powershell
# Set your variables
$GITHUB_USERNAME = "johndoe"
$DOCKERHUB_USERNAME = "johndoe"
$YOUR_NAME = "John Doe"
$YOUR_EMAIL = "john.doe@edu.dsti.institute"

# Navigate to project
cd C:\Users\DEV\Documents\GitHub\DevOps-Project

# Replace in README.md
(Get-Content README.md) -replace 'iaidsky', $GITHUB_USERNAME | Set-Content README.md
(Get-Content README.md) -replace 'saiboukeita', $DOCKERHUB_USERNAME | Set-Content README.md
(Get-Content README.md) -replace 'Saibou KEITA', $YOUR_NAME | Set-Content README.md
(Get-Content README.md) -replace 'saibou.keita@edu.dsti.institute', $YOUR_EMAIL | Set-Content README.md

# Replace in Kubernetes deployment
(Get-Content k8s\userapi-deployment.yaml) -replace 'saiboukeita', $DOCKERHUB_USERNAME | Set-Content k8s\userapi-deployment.yaml

# Replace in other documentation
(Get-Content NEXT_STEPS.md) -replace 'YOUR_USERNAME', $GITHUB_USERNAME | Set-Content NEXT_STEPS.md
(Get-Content NEXT_STEPS.md) -replace 'YOUR_DOCKERHUB_USERNAME', $DOCKERHUB_USERNAME | Set-Content NEXT_STEPS.md

(Get-Content QUICK_START.md) -replace 'YOUR_USERNAME', $GITHUB_USERNAME | Set-Content QUICK_START.md
(Get-Content QUICK_START.md) -replace 'YOUR_DOCKERHUB_USERNAME', $DOCKERHUB_USERNAME | Set-Content QUICK_START.md
```

---

### Using sed (Linux/Mac)

```bash
# Set your variables
GITHUB_USERNAME="johndoe"
DOCKERHUB_USERNAME="johndoe"
YOUR_NAME="John Doe"
YOUR_EMAIL="john.doe@edu.dsti.institute"

# Replace in README.md
sed -i "s/iaidsky/$GITHUB_USERNAME/g" README.md
sed -i "s/saiboukeita/$DOCKERHUB_USERNAME/g" README.md
sed -i "s/Saibou KEITA/$YOUR_NAME/g" README.md
sed -i "s/saibou.keita@edu.dsti.institute/$YOUR_EMAIL/g" README.md

# Replace in Kubernetes deployment
sed -i "s/saiboukeita/$DOCKERHUB_USERNAME/g" k8s/userapi-deployment.yaml

# Replace in other documentation
sed -i "s/YOUR_USERNAME/$GITHUB_USERNAME/g" NEXT_STEPS.md QUICK_START.md
sed -i "s/YOUR_DOCKERHUB_USERNAME/$DOCKERHUB_USERNAME/g" NEXT_STEPS.md QUICK_START.md
```

---

### Manual Find and Replace in VS Code

1. Press `Ctrl+Shift+H` (Windows/Linux) or `Cmd+Shift+H` (Mac)
2. Enter in "Find": `iaidsky`
3. Enter in "Replace": Your GitHub username
4. Click "Replace All" (or review each one)
5. Repeat for:
   - `saiboukeita` → Your Docker Hub username
   - `Saibou KEITA` → Your full name
   - `saibou.keita@edu.dsti.institute` → Your email

---

## 📋 Checklist: Before First Commit

Use this checklist to ensure all customizations are complete:

### Critical Changes
- [ ] README.md - Line 3: GitHub badge updated
- [ ] README.md - Line 4: Docker Hub badge updated
- [ ] README.md - Line 69: Clone command updated
- [ ] README.md - Line 270: Docker build command updated
- [ ] README.md - Line 276: Docker push command updated
- [ ] README.md - Line 282: Docker run command updated
- [ ] README.md - Lines 352-354: Links section updated
- [ ] README.md - Lines 356-359: Author section updated
- [ ] k8s/userapi-deployment.yaml - Line 23: Image name updated

### GitHub Setup
- [ ] Created GitHub repository
- [ ] Added DOCKER_USERNAME secret
- [ ] Added DOCKER_PASSWORD secret

### Docker Hub Setup
- [ ] Created Docker Hub account
- [ ] Built Docker image locally
- [ ] Pushed image to Docker Hub
- [ ] Verified image is publicly accessible

### Optional Changes
- [ ] NEXT_STEPS.md - All placeholders replaced
- [ ] QUICK_START.md - All placeholders replaced
- [ ] docker-compose.yml - Updated if using pre-built image

---

## 🎯 Verification Steps

After making all changes, verify:

### 1. Check README.md
```bash
cat README.md | grep -i "iaidsky"    # Should return nothing
cat README.md | grep -i "saiboukeita" # Should return nothing
```

### 2. Check Kubernetes Manifest
```bash
cat k8s/userapi-deployment.yaml | grep "image:"
# Should show: image: YOUR_DOCKERHUB_USERNAME/userapi:latest
```

### 3. Test Docker Image
```bash
docker pull YOUR_DOCKERHUB_USERNAME/userapi:latest
docker run -d -p 3000:3000 YOUR_DOCKERHUB_USERNAME/userapi:latest
curl http://localhost:3000/health
```

### 4. Verify Links Work
- Open: `https://github.com/YOUR_USERNAME/DevOps-Project`
- Open: `https://hub.docker.com/r/YOUR_DOCKERHUB_USERNAME/userapi`
- Check GitHub Actions: `https://github.com/YOUR_USERNAME/DevOps-Project/actions`

---

## 🚨 Common Mistakes to Avoid

### ❌ Mistake #1: Forgetting to Update Kubernetes Manifest
**Problem**: You update README but forget k8s/userapi-deployment.yaml  
**Result**: Kubernetes tries to pull someone else's image  
**Fix**: Always update both README.md AND k8s/userapi-deployment.yaml

### ❌ Mistake #2: Not Setting GitHub Secrets
**Problem**: CI/CD pipeline fails on Docker push  
**Result**: GitHub Actions shows "Error: Cannot push to Docker Hub"  
**Fix**: Add both DOCKER_USERNAME and DOCKER_PASSWORD secrets

### ❌ Mistake #3: Using Docker Hub Username Instead of GitHub Username
**Problem**: Confusing the two usernames  
**Result**: Links point to wrong repositories  
**Fix**: Keep them separate - GitHub username for repo links, Docker Hub username for images

### ❌ Mistake #4: Not Making Image Public
**Problem**: Docker Hub image is private  
**Result**: Kubernetes cannot pull the image  
**Fix**: Set repository to public in Docker Hub settings

### ❌ Mistake #5: Typos in Email or Name
**Problem**: Copy-paste errors in author section  
**Result**: Looks unprofessional  
**Fix**: Double-check all personal information

---

## 📞 Need Help?

If you're unsure about any changes:

1. **Check existing values**: Look at what's currently in the file
2. **Use search**: Press `Ctrl+F` to find all occurrences
3. **Test locally first**: Make changes and test before committing
4. **Review this guide**: Each section has examples

---

## ✅ Final Verification Command

Run this to check if any placeholders remain:

```powershell
# PowerShell
Get-ChildItem -Recurse -Include *.md,*.yaml,*.yml | 
  Select-String -Pattern "iaidsky|saiboukeita|YOUR_USERNAME|YOUR_DOCKERHUB_USERNAME" |
  Select-Object Filename, LineNumber, Line
```

```bash
# Linux/Mac
grep -rn "iaidsky\|saiboukeita\|YOUR_USERNAME\|YOUR_DOCKERHUB_USERNAME" \
  --include="*.md" --include="*.yaml" --include="*.yml" .
```

**Expected Result**: Only matches in this CUSTOMIZATION_GUIDE.md file

---

## 🎉 You're Done When...

- [ ] No placeholder text remains (except in this guide)
- [ ] All URLs point to YOUR repositories
- [ ] Docker image is on YOUR Docker Hub account
- [ ] GitHub secrets are configured
- [ ] CI/CD pipeline passes
- [ ] All links in README work
- [ ] Author section has YOUR information

**Now you're ready to submit!** 🚀
