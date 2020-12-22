#!/usr/bin/env node

import cli from '@generates/cli'
import { run } from './index.js'

let { _: files } = cli({ name: 'eslit' })

if (!files.length) files = ['.']

run({ files })
