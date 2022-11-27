'use strict'

const readCsv = require('gtfs-utils/read-csv')
const path = require('path')

const compress = require('../compress')

const readFile = file => readCsv(path.join(__dirname, file + '.csv'))

const readShapes = async () => {
	const shapes = Object.create(null)

	for await (const row of await readFile('shapes')) {
		const data = [
			parseFloat(row.shape_pt_lat), parseFloat(row.shape_pt_lon),
			+row.shape_pt_sequence
		]
		if (!shapes[row.shape_id]) shapes[row.shape_id] = []
		shapes[row.shape_id].push(data)
	}

	for (let id in shapes) {
		const shape = shapes[id]
			.sort((a, b) => a[2] - b[2])
			.map(([lat, lon, i]) => [lat, lon])
		shapes[id] = compress(shape)
	}

	return shapes
}

module.exports = readShapes
