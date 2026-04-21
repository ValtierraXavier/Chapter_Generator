import fs from 'node:fs/promises'

export const readConfig = async (target = './config.json') => {
    (await fs.stat(target)).isFile()
    const file = await fs.readFile(target)
    const config = JSON.parse(file)
    return config
}

export const writeConfig = async (target = './config.json', config) => {
    await fs.writeFile(target, JSON.stringify(config, null, 2))
}
