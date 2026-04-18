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

export const updatePath = async (path) => {
    try{
        const exists = await fileExists('config.json', './')
        if(!exists){
            const config = {
                originalPath: true,
                defaultPath: `${process.env.HOME}/CodeStuff/Code2025/jsCode/EloquentJS`,
                userPath: ""
            }
            await fs.writeFile('./config.json', JSON.stringify(config, null, 2))
        }else{
            const file = await fs.readFile('./config.json', 'utf8')
            let configObj = JSON.parse(file)
            configObj.userPath = path
            configObj.original = false
            await fs.writeFile('./config.json', JSON.stringify(configObj, null, 2))
        }

    }catch(err){
        console.log(err)
    }
    
}
const fileExists = async (name, path) => {
    try{
        const files = await fs.readdir(path)

        for(const file of files){
            if(file === name){
                return true
            }
        }
        return false  
    }catch(err){
        console.log(err)
    }
}

