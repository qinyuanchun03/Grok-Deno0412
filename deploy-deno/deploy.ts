/**
 * Xai API Proxy Deployment Script for Deno Deploy
 *
 * This script helps deploy the Xai API proxy to Deno Deploy.
 */

import { parse } from "https://deno.land/std@0.224.0/flags/mod.ts";

/**
 * Main deployment function
 */
async function main() {
  try {
    // Parse command line arguments
    const args = parse(Deno.args, {
      boolean: ["help"],
      string: ["project"],
      alias: {
        h: "help",
        p: "project",
      },
      default: {
        project: "xai-api-proxy"
      }
    });

    // Show help message
    if (args.help) {
      console.log(`
Xai API Proxy Deployment Script for Deno Deploy

USAGE:
  deno run --allow-run deploy.ts [OPTIONS]

OPTIONS:
  -h, --help                Show this help message
  -p, --project=<name>      Set Deno Deploy project name (default: xai-api-proxy)

EXAMPLES:
  # Deploy with default project name
  deno run --allow-run deploy.ts

  # Deploy with custom project name
  deno run --allow-run deploy.ts --project=my-xai-proxy
  `);
      return;
    }

    // Check if deployctl is installed
    try {
      const process = Deno.run({
        cmd: ["deployctl", "--version"],
        stdout: "piped",
        stderr: "piped",
      });

      const status = await process.status();

      if (!status.success) {
        console.error("deployctl not found. Please install it with: deno install -A --no-check -r -f https://deno.land/x/deploy/deployctl.ts");
        throw new Error("deployctl not found");
      }
    } catch (error) {
      console.error("Error checking deployctl:", error.message);
      console.error("Please install deployctl with: deno install -A --no-check -r -f https://deno.land/x/deploy/deployctl.ts");
      throw error;
    }

    // Deploy to Deno Deploy
    console.log(`Deploying to Deno Deploy with project name: ${args.project}...`);

    const command = [
      "deployctl",
      "deploy",
      "--project",
      args.project,
      "--prod",
      "--allow-net=api.xai.com",
      "../src/deno_entry.ts"
    ];

    const process = Deno.run({
      cmd: command,
      stdout: "inherit",
      stderr: "inherit",
    });

    const status = await process.status();

    if (!status.success) {
      console.error("Deno Deploy deployment failed. Check the error messages above.");
      throw new Error("Deno Deploy deployment failed");
    }

    console.log("\nDeno Deploy deployment successful!");
    console.log(`Your API is now available at: https://${args.project}.deno.dev/`);
    console.log("\nNext steps:");
    console.log("1. Configure your local AI chat software to use your proxy");
    console.log("2. Add your API key in your chat software");
    console.log("3. Configure your preferred models");
    console.log("\nFor detailed instructions, see the configuration guides in the main repository.");

  } catch (error) {
    console.error("Error during deployment:", error.message);
    throw error;
  }
}

// Run the main function and handle any errors
if (import.meta.main) {
  main().catch((error) => {
    console.error("Deployment failed:", error.message);
  });
}
