'use strict'

const path = require('path')
const fs = require('fs')
const queue = require('queue')



const writeShape = (id, data) => (cb) => {
	const dest = path.join(__dirname, '../data', id + '.json')
	fs.writeFile(dest, JSON.stringify(data), (err) => {
		if (err) cb(err)
		else cb()
	})
}

const writeShapes = (shapes) => new Promise((yay, nay) => {
	const q = queue({concurrency: 10})
	for (let id in shapes) q.push(writeShape(id, shapes[id]))
	q.on('error', nay)
	q.on('end', () => yay())
	q.start()
})

module.exports = writeShapes
