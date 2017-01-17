'use strict'

const path = require('path')
const fs = require('fs')
const readShapes = require('./read-shapes')
const deduplicateShapes = require('./deduplicate-shapes')
const writeShapes = require('./write-shapes')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const writeJSON = (name, data) => new Promise((yay, nay) => {
	const dest = path.join(__dirname, '..', name)
	fs.writeFile(dest, JSON.stringify(data), (err) => {
		if (err) nay(err)
		else yay()
	})
})



readShapes()
.then(deduplicateShapes)
.then(({map, data}) => {
	console.info(Object.keys(map).length, 'shapes')
	console.info(Object.keys(data).length, 'deduplicated shapes')

	return writeJSON('ids.json', map)
	.then(() => writeShapes(data))
})
.catch(showError)
