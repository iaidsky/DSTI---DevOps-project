# DSTI---DevOps-project
School project

## Infrastructure as Code (IaC)

This repository includes Infrastructure as Code configuration in the `iac/` directory:

- **Vagrantfile**: VM configuration for local development environment
- **Ansible Playbooks**: Automated configuration management for:
  - Node.js installation and setup
  - Application deployment
  - Redis database setup
  - Health check monitoring

### Usage

To provision the development environment:

```bash
vagrant up
```

The IaC configuration is ready to be merged into the `Devops-project` branch.
