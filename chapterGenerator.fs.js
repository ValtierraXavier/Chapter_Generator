import fs from 'node:fs/promises'
import { argv } from 'node:process'

const chapterNumber = argv[2]
const basePath = `${process.env.HOME}/CodeStuff/Code2025/jsCode/EloquentJS`

const newChapter = async (chapterNumber) => {
    if(chapterNumber === undefined){
        console.log('No chapter number provided.')
        return
    }
    try{
        await fs.mkdir(`${basePath}/Chapter${chapterNumber}`, {recursive: true})
        console.log(`Directory created...`)
        await fs.appendFile(`${basePath}/Chapter${chapterNumber}/chapter${chapterNumber}.js`, '')
        await fs.appendFile(`${basePath}/Chapter${chapterNumber}/chapter${chapterNumber}_data.js`, '')
        console.log("Files created...")
        console.log(`Created Chapter ${chapterNumber} at:\n${basePath}/Chapter${chapterNumber}\nDone.`)
    }catch(err){
        console.log(`Could not complete the operation \nReason:\n${err}`)
    }
}
newChapter(chapterNumber)