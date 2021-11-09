import { createApp } from '@ianwalter/nrg'

export const app = await createApp()

function greeting () {
  return 'Hello'
}

const thing = { status: 'ok' }

function long () {
  return [
    thing,
    thing,
    thing,
    thing,
    thing,
    thing,
    thing,
    thing,
    thing,
    thing,
    thing
  ]
}

function aSpace (thing) {
  console.log('Thing:', thing)
  return ' '
}

export { greeting, long, aSpace }
