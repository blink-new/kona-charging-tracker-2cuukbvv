const { app, BrowserWindow, shell } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
    },
    icon: path.join(__dirname, '../public/favicon.svg'),
    title: 'Kona Charging Tracker',
    titleBarStyle: 'default',
    autoHideMenuBar: true,
    show: false, // Don't show until ready
  })

  // Show window when ready
  win.once('ready-to-show', () => {
    win.show()
  })

  // Check if dist folder exists
  const distPath = path.join(__dirname, '../dist/index.html')
  console.log('Looking for:', distPath)
  console.log('File exists:', fs.existsSync(distPath))

  if (fs.existsSync(distPath)) {
    win.loadFile(distPath).catch(err => {
      console.error('Failed to load file:', err)
      // Fallback to web version
      win.loadURL('https://kona-charging-tracker-2cuukbvv.sites.blink.new')
    })
  } else {
    console.log('Dist folder not found, loading web version')
    win.loadURL('https://kona-charging-tracker-2cuukbvv.sites.blink.new')
  }

  // Open external links in default browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  // Debug: Log any navigation errors
  win.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Failed to load:', errorCode, errorDescription, validatedURL)
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})