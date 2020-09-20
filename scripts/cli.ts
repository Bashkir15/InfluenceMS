import commandLineArgs from 'command-line-args'
import commandLineCommands from 'command-line-commands'

import { CommandMap } from './commands'
import { GLOBAL_CLI_ARGS } from './constants'
import { getProjectConfig } from './get-project-config'

const commandNames = Array.from(CommandMap.keys())

async function cli() {
    const { argv, command: commandName } = commandLineCommands(commandNames, process.argv.slice(2))
    const projectConfig = getProjectConfig(commandLineArgs(GLOBAL_CLI_ARGS, { argv }), commandName)
    const command = CommandMap.get(commandName)

    try {
        await command(projectConfig)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

cli()