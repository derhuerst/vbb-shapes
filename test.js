'use strict'

const assert = require('assert')

const compress = require('./compress')
const uncompress = require('./uncompress')



const input = [
	[51.67963, 13.20340],
	[51.68502, 13.20938],
	[51.68502, 13.20938],
	[51.68311, 13.20461]
]

const output = [
	[51.67963, 13.20340],
	[51.68502, 13.20938],
	[51.68311, 13.20461]
]

assert.deepStrictEqual(uncompress(compress(input)), output)
