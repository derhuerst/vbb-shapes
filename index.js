'use strict'

const fs = require('fs')
const path = require('path')

const uncompress = require('./uncompress')
const all = require('./ids.json')



const shape = (id) => new Promise((yay, nay) => {
	if (!(id in all)) throw new Error(`Shape ${id} does not exist.`)
	const signature = all[id]

	fs.readFile(path.join(__dirname, 'data', signature + '.json'), (err, data) => {
		if (err) return nay(err)
		try {
			data = uncompress(JSON.parse(data))
			data.signature = signature
			data.id = id
			yay(data)
		} catch (err) {
			nay(err)
		}
	})
})

module.exports = shape
