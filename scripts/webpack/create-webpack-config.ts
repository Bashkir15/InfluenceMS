import path from 'path'
import webpack from 'webpack'

const getFilenameForEnvironment = (baseFileName: string, isProduction: boolean) => {
    return baseFileName
        .split(path.extname(baseFileName))
        .join(isProduction ? '-[contenthash:8]' : '')
}
export function createWebpackConfig(currentContext): webpack.Configuration {
    const { buildTarget, env, mode, name, projectPaths } = currentContext
    const isServer = buildTarget === 'server'

    return {
        context: process.cwd(),
        devtool: env.production ? 'source-map' : 'cheap-module-source-map',
        entry: [projectPaths.get(`${buildTarget}-entry`)],
        mode: env.production ? 'production' : 'development',
        module: {
            rules: [],
            strictExportPresence: true
        },
        name,
        output: {
            chunkFilename: getFilenameForEnvironment('[name]-[chunk].js', env.production),
            filename: getFilenameForEnvironment('[name].js', env.production),
            libraryTarget: isServer ? 'commonjs2' : 'var',
            path: projectPaths.get('build'),
            publicPath: projectPaths.get('publicPath')
        },
        plugins: [
            env.dev && mode === 'watch' && new webpack.HotModuleReplacementPlugin()
        ].filter(Boolean),
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json']
        },
        target: isServer ? 'node' : 'web'
    }
}