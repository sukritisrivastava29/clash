const { execSync, spawn } = require("child_process");

try {
  execSync("npx kill-port 5173", { stdio: "ignore" });
} catch {}

const vite = spawn("npx", ["vite"], {
  stdio: "inherit",
  shell: true,
});

vite.on("exit", (code) => {
  process.exit(code ?? 0);
});