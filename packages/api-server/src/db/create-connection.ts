import chalk from 'chalk'
import mongoose, { Connection } from 'mongoose'

async function attemptConnect(connectionURI: string): Promise<Connection> {
    let db
    try {
        db = await mongoose.connect(connectionURI, {
            pass: process.env.MONGO_LABS_USER_PASSWORD,
            user: process.env.MONGO_LABS_USER_NAME
        })
        console.log(chalk.magenta(`Connected to the database at: ${connectionURI}`))
    } catch (err) {
        console.error(`Failed to connect to the db at ${connectionURI}: `, err)
        process.exit(1)
    }
    return db
}

export async function createDatabaseConnection() {
    return attemptConnect(process.env.MONGO_LABS_CONNECTION_URI)
}
