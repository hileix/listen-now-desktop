import { app, BrowserWindow, Tray, Menu} from 'electron' // eslint-disable-line
import path from 'path';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

const trayMenu = [
    {
      label:'上一首',
      click:function () {

      }
    },
    {
      label:'暂停',
      click:function () {

      }
    },
    {
      label:'下一首',
      click:function () {

      }
    },
    {
      label:'关于',
      click:function () {

      }
    },
    {
      label:'退出',
      click:function () {

      }
    }
];

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 768,
    useContentSize: false,
    width: 1280,
    resizable: false,
    autoHideMenuBar: true,
    backgroundColor:'#4169E1',
      // frame:false,  //无边框窗口，之后完善后可能会使用
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
      mainWindow.show();
  });

  let trayIcon = path.join(__dirname, '../renderer/assets');
  const contextMenu = Menu.buildFromTemplate(trayMenu);
  const tray = new Tray(path.join(trayIcon, 'favicon.ico'));
  tray.setToolTip('Listen-now');
  tray.setContextMenu(contextMenu);
  tray.on('click',function(){
      mainWindow.show();
  })

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
