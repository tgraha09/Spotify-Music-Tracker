const { app, BrowserWindow } = require('electron');
const remote = require('electron').remote;
var express = require('express'); // Express web server framework
const exec = require('child_process').exec;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = (new JSDOM(`...`)).window;
const path = require('path')
var ex = express();
ex.use(express.static(__dirname));
console.log('Listening on 3000, 0.0.0.0'); //open port
const fs = require('fs');
const url = 'data/userdata.txt';

ex.listen(3000, '0.0.0.0');
var tracks;
let keys; 

let isDev = process.env.APP_DEV ? (process.env.APP_DEV.trim() == "true") : false;

if (isDev) {
    //console.log(__dirname + '/node_modules')
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'), 
        ignored: /dist|[\/\\]\./
    });
}


function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()
}



try{
  app.whenReady().then(createWindow)

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    
    }
    
  })
 
  
  
  
  
  
  
  
  
  //read();
  
  //write();
  
  function read(){
      try {
          const data = fs.readFileSync(url, 'utf8')
          tracks = data;
          console.log(tracks);
        } catch (err) {
          console.error(err)
        }
  }
  
  function write(msg){
      fs.appendFileSync(url, "\n"+msg, function (err,data) {
          if (err) {
            return console.log(err);
          }
          console.log(data);
        });
  }
  
}
catch{

}
