import commandLineArgs from 'command-line-args'
import commandLineCommands from 'command-line-commands'

import { CommandMap } from './commands'

async function cli() {
    const { argv, command: commandName } = commandLineCommands(Array.from(CommandMap.keys()), process.argv.slice(2))
    const cliArgs = commandLineArgs([], { argv })

    // Get config from cli args
    const projectConfig = { ...cliArgs }
    const command = CommandMap.get(commandName)

    try {
        await command(projectConfig)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

cli()