import fs from 'node:fs/promises'
import process from 'node:process'

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
    const file = await fs.readFile(configPath)
    const config = JSON.parse(file)
    config.previousPath = config.currentPath
    config.currentPath = path
    await fs.writeFile(configPath, JSON.stringify(config, null, 2))
    const newFile = await fs.readFile(configPath, 'utf8')
    console.log(newFile)
}
// may have to write helper to handle opening config file

const resetPath = async () => {
        const file = await fs.readFile(configPath, 'utf8')
        const config = JSON.parse(file)
        config.currentPath = config.defaultPath
        await fs.writeFile(configPath, JSON.stringify(config, null, 2))    
}

const viewConfig = async () => {
        const file = await fs.readFile(configPath)
        const config = JSON.parse(file)
        console.log(config)
}

export const configRouter = async (arg) => {
    if(arg === 'reset'){
        try{
            await resetPath()
        }catch(err){
            console.log('could not reset path:',err.message)
        }
    }else if(arg === 'view'){
        try{
            await viewConfig()
        }catch(err){
            console.log('Cannot display config:', err.message)
        }
    }else{
        try{
            await updatePath(arg)
        }catch(err){
            console.log('Unable to update path:',err)
        }
    }
}
