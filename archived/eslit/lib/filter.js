import semver from 'semver'
import { createLogger } from '@generates/logger'

// FIXME: Change namespace to eslit.filter when logger is fixed.
const logger = createLogger({ level: 'info', namespace: 'eslit' })

const tlaMessages = [
  "Parsing error: Cannot use keyword 'await' outside an async function",
  "Parsing error: 'await' is only allowed within async functions"
]

const isModernNode = semver.gte(process.versions.node, '14.8.0')

export default function filter (output) {
  let { errorCount, warningCount, results } = output

  const warnings = []
  const errors = []

  for (const result of results) {
    logger.debug('Result', result)
    for (const item of result.messages) {
      logger.debug('Item', item)
      if (isModernNode && tlaMessages.find(m => item.message.includes(m))) {
        errorCount--
        result.errorCount--
      } else if (item.severity === 1) {
        warnings.push({ ...result, ...item })
      } else if (item.severity === 2) {
        errors.push({ ...result, ...item })
      }
    }
  }

  return { errorCount, warningCount, warnings, errors }
}
