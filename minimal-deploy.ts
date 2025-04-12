/**
 * Minimal deployment script for Deno Deploy
 *
 * This script uses a minimal approach to deploy to Deno Deploy.
 */

// Default project name
const projectName = "xai-api-proxy";

console.log(`Deploying to Deno Deploy with project name: ${projectName}...`);

try {
  // Run deployctl with minimal options
  const process = Deno.run({
    cmd: [
      "deployctl",
      "deploy",
      "--project",
      projectName,
      "--prod",
      "../src/minimal_entry.ts"
    ],
    stdout: "inherit",
    stderr: "inherit",
  });

  // Wait for the process to complete
  const status = await process.status();

  if (status.success) {
    console.log("\nDeployment successful!");
    console.log(`Your API is now available at: https://${projectName}.deno.dev/`);
  } else {
    console.error("Deployment failed. Check the error messages above.");
  }
} catch (error) {
  console.error("Error during deployment:", error.message);
}
