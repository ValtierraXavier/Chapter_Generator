import fs from 'node:fs/promises'
import { argv } from 'node:process'
import { configRouter } from './config.js'



const newChapter = async (number) => {
    if(number === undefined){
        console.log('No chapter number or command provided.')
        return
    }
        const config = await fs.readFile('./config.json', 'utf8')
        const configObj = JSON.parse(config)
        const basePath = configObj.currentPath 
        if(await fileExists(`${basePath}/Chapter${number}/chapter${number}.js`) && await fileExists(`${basePath}/Chapter${number}/chapter${number}_data.js`)){
            console.log('Directory and files already exists.')
            return
        }
        console.log('Generating...')
        await fs.mkdir(`${basePath}/Chapter${number}`, {recursive: true})
        console.log(`Directory created...`)

        await fs.writeFile(`${basePath}/Chapter${number}/chapter${number}.js`, '')
        await fs.writeFile(`${basePath}/Chapter${number}/chapter${number}_data.js`, '')
        console.log("Files created...")

        console.log(`Created Chapter ${number} at:\n${basePath}/Chapter${number}\nDone.`)
}

const fileExists = async (target) => {
    try{
        await fs.access(target)
        return true
    }catch(err){
        return false
    }
}

const createConfig = async (target) => {
    console.log('Creating config file...')
    const configObj = {
        defaultPath: `${process.env.HOME}/CodeStuff/Code2025/jsCode/EloquentJS`,
        currentPath: `${process.env.HOME}/CodeStuff/Code2025/jsCode/EloquentJS`,
        previousPath: ''
    }
    try{
        await fs.writeFile(target, JSON.stringify(configObj, null, 2))
        console.log('Config file created successfully.')
    }catch(err){
        console.log('Config file was not created successfully', err.message)
    }
}

const toolRouter = async () =>{
    if(argv[2] === 'create'){
        try{
            await newChapter(argv[3])
        }catch(err){
            console.log('Could not create new chapter folder and files:', err.message)
        }
    }else if(argv[2] === 'path'){
        try{
            await configRouter(argv[3])
        }catch(err){
            console.log(err)
        }
    }else{
        console.log('Please enter a valid command.\nAvailable commands: create, path')
    }
}   

const checkConfig = async () => {
    if(await fileExists('./config.json')){

    }else{
        console.log('Config file does not exist.')
        await createConfig('./config.json')
    }
    await toolRouter()
}
await checkConfig()