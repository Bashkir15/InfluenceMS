import chalk from 'chalk'
import dotenv from 'dotenv'
import fastify from 'fastify'

import { upgradeServerInstance } from './upgrade-server-instance'

dotenv.config()

async function start() {
    const server = await upgradeServerInstance(fastify)
    server
        .listen(process.env.SERVER_PORT)
        .then(address => console.log(chalk.green(`API Server running at ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)))
        .catch(err => {
            console.error('Error starting API server', err)
            process.exit(1)
        })
}

start()