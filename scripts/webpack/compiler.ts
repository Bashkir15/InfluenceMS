import webpack from 'webpack'

import { createWebpackConfig } from './create-webpack-config'

export function createWebpackCompiler(projectConfig): webpack.Compiler {
    const webpackConfig = createWebpackConfig(projectConfig)
    try {
        const compiler = webpack(webpackConfig)
        return compiler
    } catch (error) {
        throw new Error(`Could not create webpack compiler: ${error}`)
    }
}

export function compile(compiler: webpack.Compiler): Promise<[string, webpack.Stats]> {
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                return reject(err)
            }

            if (stats.hasErrors()) {
                return reject(new Error(`Error compiling build!`))
            }

            resolve([compiler.name, stats])
        })
    })
}