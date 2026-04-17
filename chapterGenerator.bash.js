import { argv } from 'node:process'
import { spawn } from 'node:child_process'

const chapterNumber = argv[2]

if(!chapterNumber){
    console.error("Input a chapter number.")
    process.exit(1)

}
const child = spawn('bash', ['./chapterGenerator.sh', chapterNumber], {stdio: 'inherit'})

child.on('error', (err)=>{
    console.error('Failed to start process:', err)
})
child.on('close', (code)=> {
    if(code !== 0){
        console.error(`Process exited with code: ${code}`)
        process.exit(code ?? 1)
    }
})