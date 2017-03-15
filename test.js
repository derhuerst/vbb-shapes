'use strict'

const assert = require('assert')

const compress = require('./compress')
const uncompress = require('./uncompress')
const shapes = require('.')
const allShapes = require('./all')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}



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



const assertValidShape = (shape) => {
	assert(Array.isArray(shape), 'shape is not an array')
	shape.forEach((point, i) => {
		assert(Array.isArray(point), `point ${i} is not an array`)
		const [lat, lon] = point

		// These bounding box assertions are somewhat random. I tried to fit them to
		// the values step by step. I guess there are stations in Poland and all over
		// Germany.
		assert.strictEqual(typeof lat, 'number', `shape[${i}].lat is not a number`)
		assert(lat > 50, `shape[${i}].lat is lower than 50`)
		assert(lat < 55, `shape[${i}].lat is higher than 55`)
		assert.strictEqual(typeof lon, 'number', `shape[${i}].lon is not a number`)
		assert(lon > 8, `shape[${i}].lon is lower than 8`)
		assert(lon < 18, `shape[${i}].lon is higher than 18`)
	})
}

shapes('5953')
.then(assertValidShape)
.catch(showError)

allShapes()
.on('data', assertValidShape)
.on('error', showError)
