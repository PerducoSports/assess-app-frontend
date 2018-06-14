// ./main.js
var url = require('url')
const path = require('path')
const { autoUpdater } = require('electron-updater')
const {app, BrowserWindow, ipcMain} = require('electron')

let win = null

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({width: 1000, webPreferences: {webSecurity: false}, height: 800, frame: true})

  // dev set up
  // win.loadURL('http://localhost:8081')

  // build set up
  // win.loadURL('http://localhost:8080')

  // autoUpdater.checkForUpdates()
  // build setup
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // Remove window once app is closed
  win.on('closed', function () {
    win = null
  })
})

// autoUpdater.on('update-downloaded', (info) => {
//   win.webContents.send('updateReady')
// })

// ipcMain.on("quitAndInstall", (event, arg) => {
//   autoUpdater.quitAndInstall()
// })

// create the application window if the window variable is null
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
// quit the app once closed
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});