import { RequireAll } from './shared'

export type BuildModes = 'analyze' | 'deploy' | 'watch'
export type BuildTargets = 'client' | 'server'
export type ProjectPathNames = 'build' | 'client' | 'client-entry' | 'html-template' | 'public-path' | 'root' | 'server' | 'server-entry' | 'src'

export type ProjectPaths = Map<string, string>

export interface ConfigFromCli {
    buildTarget?: BuildTargets
    host?: string
    mode?: BuildModes
    port?: number
}

export type ProjectConfig = RequireAll<ConfigFromCli> & {
    env: Record<string, boolean>
    projectPaths: ProjectPaths
}

export type CommandContext = Omit<ProjectConfig, 'host' | 'port'> & {
    name: string
}
