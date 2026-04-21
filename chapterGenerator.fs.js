import fs from 'node:fs/promises'
import { argv } from 'node:process'
import { configRouter } from './config.js'
import { readConfig, writeConfig } from './helpers/helpers.js'



const newChapter = async (number) => {
    if(number === undefined){
        console.log('No chapter number or command provided.')
        return
    }
        const config = await readConfig()
        const basePath = config.currentPath 
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
        (await fs.stat(target)).isFile()
        return true
    }catch(err){
        return false
    }
}

const createConfig = async (target) => {
    console.log('Creating config file...')
    const config = {
        defaultPath: `${process.env.HOME}/CodeStuff/Code2025/jsCode/EloquentJS`,
        currentPath: `${process.env.HOME}/CodeStuff/Code2025/jsCode/EloquentJS`,
        previousPath: ''
    }
    try{
        await writeConfig(target, config)
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
            await configRouter(argv[3], argv[4])
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