import env from 'std-env'
import path from 'path'

const createProjectPaths = (rootDir: string) => {
    const pathMap: Map<string, string | string[]> = new Map([
        ['client', path.join(rootDir, 'src/client')],
        ['client-entry', path.join(rootDir, 'src/client/index.ts')],
        ['html-template', path.join(rootDir, 'src/client/index.html')],
        ['root', rootDir],
        ['server', path.join(rootDir, 'src/server')],
        ['server-entry', path.join(rootDir, 'src/server/index.ts')],
        ['src', path.join(rootDir, 'src')]
    ])
    return pathMap
}

export function getProjectConfig(cliArgs: Record<string, any>, commandName: string) {
    const projectPaths = createProjectPaths(process.cwd())
    
    const baseConfig = {
        buildTarget: 'client',
        commandName,
        env,
        host: 'localhost',
        mode: 'watch',
        port: 8080,
        projectPaths
    }

    // Parse CLI args
    const projectConfig = Object.keys(cliArgs).reduce((acc, key) => ({
        ...acc,
        [key]: cliArgs[key]
    }), baseConfig)

    if (commandName === 'watch') {
        projectConfig.mode = 'watch'
    }

    return projectConfig
}