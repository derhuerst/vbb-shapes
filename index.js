'use strict'

const fs = require('fs')
const path = require('path')

const uncompress = require('./uncompress')
const all = require('./ids.json')



const shape = (id) => new Promise((yay, nay) => {
	if (!(id in all)) throw new Error(`Shape ${id} does not exist.`)
	const newId = all[id]

	fs.readFile(path.join(__dirname, 'data', newId + '.json'), (err, data) => {
		if (err) return nay(err)
		try {
			yay(uncompress(JSON.parse(data)))
		} catch (err) {
			nay(err)
		}
	})
})

module.exports = shape
