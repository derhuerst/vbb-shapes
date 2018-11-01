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

const outputGeoJson = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[output[0][1], output[0][0]],
					[output[1][1], output[1][0]],
					[output[2][1], output[2][0]]
				]
			},
			"properties": {}
		}
	]
}

assert.deepStrictEqual(uncompress(compress(input)), output)

assert.deepStrictEqual(uncompress(compress(input), true), outputGeoJson)



const assertValidShape = (shape) => {
	assert(Array.isArray(shape), shape.id + ' is not an array')
	shape.forEach((point, i) => {
		const msg = `${shape.id} – ${shape.signature}[${i}]`
		assert(Array.isArray(point), msg + ' is not an array')
		const [lat, lon] = point

		// These bounding box assertions are somewhat random. I tried to fit them to
		// the values step by step. I guess there are stations in Poland and all over
		// Germany.
		assert.strictEqual(typeof lat, 'number', msg + '.lat is not a number')
		if (lat < 50) console.error(msg + '.lat is lower than 50')
		if (lat > 55) console.error(msg + '.lat is higher than 55')
		assert.strictEqual(typeof lon, 'number', msg + '.lon is not a number')
		if (lon < 5) console.error(msg + '.lon is lower than 5')
		if (lon > 18) console.error(msg + '.lon is higher than 18')
	})
}

shapes('5953')
.then(assertValidShape)
.catch(showError)

allShapes()
.on('data', assertValidShape)
.on('error', showError)
