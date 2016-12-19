'use strict'

const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const ndjson = require('ndjson')

const compress = require('./compress')

const writeJSON = (file, data) => new Promise((yay, nay) => {
	const dest = path.join(__dirname, file)
	fs.writeFile(dest, JSON.stringify(data), (err) => {
		if (err) nay(err)
		else yay()
	})
})



const fetchTrips = (lines) => new Promise((yay, nay) => {
	const shapesByTrip = {}
	const tripsByLine = {}

	fs.createReadStream(path.join(__dirname, 'data/trips.txt'))
	.pipe(csv())
	.on('data', (row) => {
		if (!row.shape_id) {
			console.error('Trip', row.trip_id, 'doesnt have a shape id.')
			return
		}
		shapesByTrip[row.trip_id] = row.shape_id
		if (!tripsByLine[row.route_id]) tripsByLine[row.route_id] = []
		tripsByLine[row.route_id].push(row.trip_id)
	})
	.on('end', () => yay({shapesByTrip, tripsByLine}))
	.on('error', nay)
})



const fetchShapes = () => new Promise((yay, nay) => {
	const shapes = {}

	fs.createReadStream(path.join(__dirname, 'data/shapes.txt'))
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



Promise.all([
	fetchShapes(),
	fetchTrips()
])
.then(([shapes, {shapesByTrip, tripsByLine}]) => {
	const onError = (err) => {
		console.error(err)
		process.exit(1)
	}

	const out = ndjson.stringify().on('error', onError)
	out.pipe(fs.createWriteStream(path.join(__dirname, 'data.ndjson')).on('error', onError))
	out.once('finish', () => console.info('done'))

	for (let lineId in tripsByLine) {
		const trips = tripsByLine[lineId]
		for (let tripId of trips) {
			const shapeId = shapesByTrip[tripId]
			const shape = shapes[shapeId]
			if (!shape) {
				console.error('shape', shapeId, 'doesnt exist')
				continue
			}
			out.write({tripId, lineId, points: shape})
		}
	}

	out.end()
})
