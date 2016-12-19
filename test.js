'use strict'

const assert = require('assert')

const compress = require('./compress')
const uncompress = require('./uncompress')



const input = [
	[50.5, 13.5],
	[51, 13.6],
	[51, 13.6],
	[51.1, 14.1],
	[51.1, 14.2]
]

const output = [
	[50.5, 13.5],
	[51, 13.6],
	[51.1, 14.1],
	[51.1, 14.2]
]

assert.deepStrictEqual(uncompress(compress(input)), output)
