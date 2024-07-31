/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process")
const buildMode = process.env.BUILD_MODE
let nodeEnv = "test"
if (buildMode === "production") {
  nodeEnv = "production"
} else {
  nodeEnv = "test"
}
execSync(`cross-env NODE_ENV=${nodeEnv} next build`, { stdio: "inherit" })
