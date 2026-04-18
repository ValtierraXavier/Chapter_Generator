import fs from 'node:fs/promises'
import { argv } from 'node:process'
import { updatePath } from './config.js'

const newChapter = async (command) => {
    if(command === undefined){
        console.log('No chapter number or command provided.')
        return
    }
    try{
            const config = await fs.readFile('./config.json', 'utf8')
            const configObj = JSON.parse(config)
            const basePath = configObj.originalPath
                ? configObj.defaultPath
                : configObj.userPath
            console.log(configObj.original)
            // await fs.mkdir(`${basePath}/Chapter${command}`, {recursive: true})
            // console.log(`Directory created...`)
            // await fs.appendFile(`${basePath}/Chapter${command}/chapter${command}.js`, '')
            // await fs.appendFile(`${basePath}/Chapter${command}/chapter${command}_data.js`, '')
            // console.log("Files created...")
            // console.log(`Created Chapter ${command} at:\n${basePath}/Chapter${command}\nDone.`)
        }catch(err){
                console.log(`Could not complete the operation \nReason:\n${err}`)
            }
    }
        if(argv[2] === 'create'){
            newChapter(argv[3])
        }else if(argv[2] === 'newPath'){
            updatePath(argv[3])
        }
