export type CommandNames = 'build' | 'watch'
export type BuildModes = 'analyze' | 'deploy' | 'watch'
export type BuildTargets = 'client' | 'server'
export type ProjectPathNames = 'build' | 'client' | 'client-entry' | 'html-template' | 'root' | 'server' | 'server-entry' | 'src'

export type ProjectPaths = Map<string, ProjectPathNames | ProjectPathNames[]>

export interface ProjectConfig {
    buildTarget: BuildTargets
    commandName: CommandNames
    env: Record<string, boolean>
    host: string
    mode: BuildModes
    port: number
    projectPaths: ProjectPaths
}