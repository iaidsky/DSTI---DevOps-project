# IaC Merge Instructions

## Current Status

The Infrastructure as Code (IaC) configuration has been prepared for the `Devops-project` branch.

### What's Been Done

1. ✅ IaC folder extracted from `copilot/devops-project` branch
2. ✅ IaC folder committed to local `Devops-project` branch (commit fdaf733)
3. ✅ IaC configuration documented in README

### IaC Contents

The `iac/` directory includes:
- **Vagrantfile**: VM provisioning configuration
- **Ansible Playbooks** in `iac/playbooks/`:
  - `main.yml`: Main playbook orchestration
  - `inventory.ini`: Inventory configuration
  - Roles for:
    - Node.js setup (`roles/nodejs`)
    - Application deployment (`roles/application`)
    - Redis installation (`roles/redis`)
    - Health checks (`roles/healthcheck`)

### Manual Push Required

The local `Devops-project` branch has the IaC folder committed but needs to be pushed to remote.

To complete the merge, execute:

```bash
git checkout Devops-project
git push origin Devops-project
```

### Verification

After pushing, verify the iac folder appears on the remote `Devops-project` branch:

```bash
git ls-remote --heads origin Devops-project
```

And check the branch contents on GitHub.
