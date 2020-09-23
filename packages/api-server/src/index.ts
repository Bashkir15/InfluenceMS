import chalk from 'chalk'
import dotenv from 'dotenv'
import fastify from 'fastify'

import { createDatabaseConnection } from './db'
import { upgradeServerInstance } from './upgrade-server-instance'

dotenv.config()

async function start() {
    const db = await createDatabaseConnection()
    db.on('error', err => {
        console.error(`Database Error:`, err)
    })

    const server = await upgradeServerInstance(fastify())
    server
        .listen(process.env.SERVER_PORT as unknown as number)
        .then(address => console.log(chalk.green(`API Server running at ${address}`)))
        .catch(err => {
            console.error('Error starting API server', err)
            process.exit(1)
        })
}

start()