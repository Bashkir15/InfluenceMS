import commandLineArgs from 'command-line-args'
import commandLineCommands from 'command-line-commands'

import { ConfigFromCli } from '@script-types'
import { CommandMap } from './commands'
import { GLOBAL_CLI_ARGS } from './constants'
import { getProjectConfig } from './get-project-config'

const commandNames = Array.from(CommandMap.keys())

async function cli() {
    const { argv, command: commandName } = commandLineCommands(commandNames, process.argv.slice(2))
    const cliArgs = commandLineArgs(GLOBAL_CLI_ARGS, { argv }) as ConfigFromCli
    const projectConfig = getProjectConfig(cliArgs, commandName)
    const command = CommandMap.get(commandName)

    try {
        await command(projectConfig)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

cli()