/**
 * Simple deployment script for Deno Deploy
 * 
 * This script deploys the Xai API proxy to Deno Deploy without using import maps.
 */

// Default project name
const projectName = Deno.args[0] || "xai-api-proxy";

console.log(`Deploying to Deno Deploy with project name: ${projectName}...`);

// Run deployctl
const process = Deno.run({
  cmd: [
    "deployctl",
    "deploy",
    "--project",
    projectName,
    "--prod",
    "--allow-net",
    "../src/deno_entry.ts"
  ],
  stdout: "inherit",
  stderr: "inherit",
});

// Wait for the process to complete
const status = await process.status();

if (!status.success) {
  console.error("Deployment failed. Check the error messages above.");
  Deno.exit(1);
} else {
  console.log("\nDeployment successful!");
  console.log(`Your API is now available at: https://${projectName}.deno.dev/`);
}
