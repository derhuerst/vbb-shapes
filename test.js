'use strict'

const assert = require('assert')

const compress = require('./compress')
const uncompress = require('./uncompress')
const shapes = require('.')

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

shapes('1269')
.then((shape) => {
	assert(Array.isArray(shape))
	shape.forEach((point) => {
		assert(Array.isArray(point))
		const [lat, lon] = point

		assert.strictEqual(typeof lat, 'number')
		assert(lat > 52)
		assert(lat < 53)
		assert.strictEqual(typeof lon, 'number')
		assert(lon > 13)
		assert(lon < 14)
	})
})
.catch(showError)
