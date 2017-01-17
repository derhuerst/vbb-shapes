'use strict'

const shorthash = require('shorthash')
const stringify = require('json-stable-stringify')



const deduplicateShapes = (old) => {
	const data = {}
	const map = {}

	for (let oldId in old) {
		const shape = old[oldId]
		const newId = shorthash.unique(stringify(shape))
		data[newId] = shape
		map[oldId] = newId
	}

	return {map, data}
}

module.exports = deduplicateShapes
