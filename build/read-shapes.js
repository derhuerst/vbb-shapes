'use strict'

const path = require('path')
const fs = require('fs')
const stripBOM = require('strip-bom-stream')
const csv = require('csv-parser')

const compress = require('../compress')



const readShapes = () => new Promise((yay, nay) => {
	const shapes = {}

	fs.createReadStream(path.join(__dirname, 'shapes.csv'))
	.pipe(stripBOM())
	.pipe(csv())
	.on('data', (row) => {
		const data = [
			parseFloat(row.shape_pt_lat), parseFloat(row.shape_pt_lon),
			+row.shape_pt_sequence
		]
		if (!shapes[row.shape_id]) shapes[row.shape_id] = []
		shapes[row.shape_id].push(data)
	})
	.on('end', () => {
		for (let id in shapes) {
			const shape = shapes[id]
				.sort((a, b) => a[2] - b[2])
				.map(([lat, lon, i]) => [lat, lon])
			shapes[id] = compress(shape)
		}
		yay(shapes)
	})
	.on('error', nay)
})

module.exports = readShapes
