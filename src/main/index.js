'use strict'

import { app, BrowserWindow, globalShortcut } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('ready', () => {
    mainWindow.focus()
  })

  /**
   * Global shortcut registration
   */

  // Register a 'CommandOrControl+X' shortcut listener.
  // https://github.com/electron/electron/blob/master/docs/api/accelerator.md
  const ret = globalShortcut.register('CommandOrControl+Q', () => {
    console.log('CommandOrControl+X is pressed')
    if (mainWindow === null) {
      createWindow()
    } else {
      mainWindow.focus()
    }
  })

  if (!ret) {
    console.log('registration failed')
  }

  // Check whether a shortcut is registered.
  console.log('Global shortcut registered: ' + globalShortcut.isRegistered('CommandOrControl+X'))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // Commented becuase we want to keep app in background
    // app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
