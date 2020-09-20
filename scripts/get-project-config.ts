import env from 'std-env'
import path from 'path'

import { CommandNames, ProjectConfig, ProjectPaths } from '@script-types'

const createProjectPaths = (rootDir: string): ProjectPaths => {
    const pathMap = new Map([
        ['client', path.join(rootDir, 'src/client')],
        ['client-entry', path.join(rootDir, 'src/client/index.ts')],
        ['html-template', path.join(rootDir, 'src/client/index.html')],
        ['root', rootDir],
        ['server', path.join(rootDir, 'src/server')],
        ['server-entry', path.join(rootDir, 'src/server/index.ts')],
        ['src', path.join(rootDir, 'src')]
    ])
    return (pathMap as ProjectPaths)
}

export function getProjectConfig(cliArgs: Record<string, any>, commandName: CommandNames): ProjectConfig {
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

    return projectConfig as ProjectConfig
}