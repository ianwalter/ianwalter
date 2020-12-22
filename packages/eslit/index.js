import { CLIEngine } from 'eslint'
import { createLogger, chalk } from '@generates/logger'
import filter from './lib/filter.js'

const logger = createLogger({ level: 'info', namespace: 'eslit' })
const formatLoc = i => chalk.gray(`${i.filePath}:${i.line}:${i.column}`)

export async function run ({ files }) {
  const cli = new CLIEngine()
  const output = cli.executeOnFiles(files)

  const {
    errorCount,
    warningCount,
    warnings,
    errors
  } = filter(output)

  const summary = []

  if (errorCount > 0) summary.push(chalk.red.bold(`${errorCount} errors.`))

  if (warningCount > 0) {
    summary.push(chalk.yellow.bold(`${warningCount} warnings.`))
  }

  if (errors.length || warnings.length) logger.write('\n')

  for (const warning of warnings) {
    logger.warn(warning.message)
    logger.log(formatLoc(warning))
    logger.write('\n')
  }

  for (const error of errors) {
    logger.error(error.message)
    logger.log(formatLoc(error))
    logger.write('\n')
  }

  if (summary.length) {
    logger.info(...summary)
  } else {
    logger.log('🔥', chalk.bold.green('Code is lit!'))
  }

  // Add blank line after the result summary so it's easier to spot.
  logger.write('\n')

  if (errorCount > 0) process.exit(1)
}
