import chalk from 'chalk'
import mongoose, { Connection } from 'mongoose'

async function attemptConnect(connectionURI: string): Promise<Connection> {
    let db
    try {
        db = await mongoose.connect(connectionURI)
        console.log(chalk.magenta(`Connected to the database at: ${connectionURI}`))
    } catch (err) {
        console.error(`Failed to connect to the db at ${connectionURI}: `, err)
        process.exit(1)
    }
    return db
}

export async function createDatabaseConnection() {
    return attemptConnect(process.env.DB_CONNECTION_URI)
}
