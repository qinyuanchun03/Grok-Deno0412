# Xai API Proxy for Deno Deploy

This directory contains the deployment files for Deno Deploy.

## Prerequisites

- [Deno](https://deno.land/) installed
- [deployctl](https://deno.com/deploy/docs/deployctl) installed
- A Deno Deploy account

## Deployment

### Option 1: Using the Deployment Script

```bash
# Navigate to this directory
cd deploy-deno

# Deploy with default project name (xai-api-proxy)
deno run --allow-run deploy.ts

# Deploy with custom project name
deno run --allow-run deploy.ts --project=my-xai-proxy

# Show help
deno run --allow-run deploy.ts --help
```

### Option 2: Manual Deployment

```bash
# Navigate to this directory
cd deploy-deno

# Deploy using deployctl
deployctl deploy --project=xai-api-proxy --prod ../src/deno_entry.ts
```

### Option 3: Using Deno Task

From the root directory of the project:

```bash
# Deploy using deno task
deno task deno:deploy
```

### Option 4: Simple Deployment (Recommended for Troubleshooting)

If you're experiencing issues with the other deployment methods, try the simplified deployment script:

```bash
# Navigate to this directory
cd deploy-deno

# Deploy with default project name
deno run --allow-run simple-deploy.ts

# Deploy with custom project name
deno run --allow-run simple-deploy.ts my-xai-proxy
```

Or from the root directory:

```bash
# Deploy using deno task
deno task deno:simple-deploy
```

### Option 5: Minimal Deployment (For ISOLATE_INTERNAL_FAILURE errors)

If you're encountering `ISOLATE_INTERNAL_FAILURE` errors, use the minimal deployment script:

```bash
# Navigate to this directory
cd deploy-deno

# Deploy with minimal options
deno run --allow-run minimal-deploy.ts
```

Or from the root directory:

```bash
# Deploy using deno task
deno task deno:minimal-deploy
```

This uses a simplified entry point (`minimal_entry.ts`) that avoids import maps and other features that might cause issues.

## Local Development

You can run the proxy locally for development:

```bash
# Navigate to this directory
cd deploy-deno

# Start the local server
deno run --allow-net ../src/deno_entry.ts
```

Or from the root directory:

```bash
# Start using deno task
deno task deno:start
```

## Verifying Deployment

After deployment, your API will be available at:

```
https://your-project-name.deno.dev/
```

You can test it by making a request to:

```
https://your-project-name.deno.dev/v1/chat/completions
```

## Configuration

See the main [Configuration Guide](../CONFIGURATION-GUIDE.md) for details on how to configure your local AI chat software to use this proxy.
