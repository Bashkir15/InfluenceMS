import chalk from 'chalk'
import WebpackDevServer from 'webpack-dev-server'

import { ProjectConfig } from '@script-types'

import { createWebpackCompiler } from '../webpack'

export async function watch(projectConfig: ProjectConfig) {
    let isFirstRun = true

    console.log(chalk.cyan(`Preparing to watch files...`))

    const compiler = createWebpackCompiler(projectConfig)
    compiler.hooks.done.tap('watch-command', stats => {
        const msg = isFirstRun
            ? `Bundle Compiled. Watching for changes...`
            : 'Recompiled on changes. Awaiting more...'
        console.log(chalk.green(msg))
        isFirstRun = false
    })

    const devServer = new WebpackDevServer(compiler, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        host: projectConfig.host,
        hot: true,
        noInfo: true,
        port: projectConfig.port,
        publicPath: compiler.options.output.publicPath
    })

    devServer.listen(projectConfig.port, projectConfig.host, () => {
        console.log(chalk.cyan(`Dev server listening at ${projectConfig.host}:${projectConfig.port}`))
    })
}