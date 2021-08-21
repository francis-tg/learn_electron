const {app, BrowserWindow,Menu} = require('electron')

process.env.NODE_ENV = 'developpement'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isLinux = process.platform === 'linux' ? true : false

console.log(process.platform)

let mainWindow

function CreateWindow() {
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 600,
        title : "Awico",
        icon: './assets/logo.png',
        resizable: isDev ? true : false,
        backgroundColor: '#007bff'
    })

    mainWindow.loadFile('./app/index.html')
}

app.on('ready', ()=>{
    CreateWindow()

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    //mainWindow.on('ready', ()=> mainWindow = null)
})


const menu = [
    {
        label: 'fichier',
        submenu:[{
            label:'Quitter',
            role: "help",
            click:() => app.quit()
        },],
    },
]


app.on('window-all-closed', ()=>{
    if (isLinux) {
        app.quit()
    }
})

app.on('activate', ()=>{
    if (BrowserWindow.getAllWindows().length === 0) {
        CreateWindow()
    }
})

app.allowRendererProcessReuse = true