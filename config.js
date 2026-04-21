import fs from 'node:fs/promises'
import process from 'node:process'
import { writeConfig, readConfig } from './helpers/helpers.js'

/**
 * Update the path and save the config as JSON in another file.
 * Creates file if it does not exist.
 * 
 * add Later:
 * see the current path config
 * reset to default path. 
 * set default path. 
 * 
 */
/*
plan:
    1. first i run the tool. for each run. i want to recieve a command and a value.
        - available commands:
            - create
                the main function of the tool. used to creat the directory and files that go inside. 
            - newPath
                used to update the path.
            (future)
            - currPath
                used to view the current path config.
            - reset
                used to reset the path o a default value. 
        - value types (All strings)
            create path gets a number. 
                All chars need to fall within the range of codePoints for numbers.
            config path 
                get everything else.(for now)
            
    2. flow:
        for config: 
            check if config file exists. if it does, update with new input.
            if it does not exist, create the config.json file
            save the object as JSON:
                config = {
                    defaultPath: maybe current working directory. or something hard coded.
                    default: boolean (default true)
                    setPath: user/supplied/path
                }
                (future add prefix(set Chapter to something else) settings.)
        
        for create:
            read the config file.
            check if config.default is true.
                if true: set path to config.defaultPath
                else: setPath to config.setPath
            run tool as usual     
*/
const configPath = './config.json'
const updatePath = async (path) => {
    if(path === undefined){
        console.log('Please enter a path to update.')
        return
    }
    try{
        await fs.stat(path)
    }catch(err){
        console.log("Please use a valid path to update.")
        return
    }
    const config = await readConfig(configPath)
    config.previousPath = config.currentPath
    config.currentPath = path
    await writeConfig(configPath, config)

    console.log(`Current path is set to: ${config.currentPath}`)  

}
// may have to write helper to handle opening config file

const resetPath = async () => {
        const config = await readConfig(configPath)
        config.previousPath = config.currentPath
        config.currentPath = config.defaultPath
        await writeConfig(configPath, config)  
        await viewConfig()  
}

const viewConfig = async () => {
        const config = await readConfig(configPath)
        console.log(`Current path is set to: ${config.currentPath}`)
}
const lastPath = async () => {
    const config = await readConfig(configPath)
    config.currentPath = config.previousPath
    await writeConfig(configPath, config)
    await viewConfig()  

}

export const configRouter = async (arg1, arg2) => {
    if(arg1 === 'reset'){
        try{
            await resetPath()
        }catch(err){
            console.log('could not reset path:',err.message)
        }
    }else if(arg1 === 'view'){
        try{
            await viewConfig()
        }catch(err){
            console.log('Cannot display config:', err.message)
        }
    }else if(arg1 === 'last'){
        try{
            await lastPath()
        }catch(err){
            console.log(`Could not change path to last used: ${err.message}`)
        }
    }else if(arg1 === 'set'){
        try{
            await updatePath(arg2)
        }catch(err){
            console.log('Unable to update path:',err)
        }
    }
}
