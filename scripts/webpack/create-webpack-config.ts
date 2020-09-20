import ExtractStylesPlugin from 'mini-css-extract-plugin'
import path from 'path'
import webpack from 'webpack'

const getFilenameForEnvironment = (baseFileName: string, isProduction: boolean) => {
    return baseFileName
        .split(path.extname(baseFileName) || '.[ext]')
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
            rules: [{
                exclude: /node_modules/,
                test: /\.(ts|tsx)$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                exclude: ['transform-async-to-generator', 'transform-regenerator', 'transform-typeof-symbol'],
                                modules: false
                            }],
                            '@babel/preset-react',
                            ['@babel/preset-typescript', {
                                allowExtensions: true,
                                allowNamespaces: true,
                                isTSX: true,
                                onlyRemoveTypeImports: env.production
                            }]
                        ],
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import',
                            ['@babel/plugin-transform-runtime', {
                                corejs: false,
                                regenerator: false,
                                useESModules: true
                            }],
                        ]
                    }
                }]
            }, {
                test: /\.(scss|css)$/,
                use: [
                    env.production ? ExtractStylesPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 3,
                            modules: { auto: true }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-flexbugs-fixes',
                                    ['postcss-preset-env', {
                                        autoprefixer: {
                                            flexbox: 'no-2009',
                                            stage: 3 
                                        }
                                    }]
                                ]
                            }
                        }
                    },
                    'resolve-url-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: getFilenameForEnvironment('[name].[ext]', env.production),
                        outputPath: 'images'
                    
                    }
                }]
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: getFilenameForEnvironment('[name].[ext]', env.production),
                        outputPath: 'fonts'
                    }
                }]
            }, {
                test: /\.(webm|mp4|ogv)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: getFilenameForEnvironment('[name].[ext]', env.production),
                        outputPath: 'videos'
                    }
                }]
            }],
            strictExportPresence: true
        },
        name,
        output: {
            chunkFilename: getFilenameForEnvironment('[name]-[chunk].js', env.production),
            filename: getFilenameForEnvironment('[name].js', env.production),
            futureEmitAssets: true,
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