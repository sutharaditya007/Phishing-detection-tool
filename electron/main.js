const { app, BrowserWindow } = require("electron");
const { exec } = require("child_process");
const path = require("path");

let mainWindow;
let backendProcess;

app.on("ready", () => {
  // Start the backend automatically
  backendProcess = exec(path.join(__dirname, "backend.exe"), (error, stdout, stderr) => {
    if (error) {
      console.error(`Backend Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Backend Warning: ${stderr}`);
      return;
    }
    console.log(`Backend Output: ${stdout}`);
  });

  // Create Electron Window
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"), // Load the secure preload script
    },
  });

  // Load the React-built frontend
  mainWindow.loadFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Stop backend when Electron closes
app.on("window-all-closed", () => {
  if (backendProcess) backendProcess.kill(); // Kill Python backend
  app.quit();
});
