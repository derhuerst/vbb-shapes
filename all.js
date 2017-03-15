'use strict'

const path = require('path')
const from2 = require('from2')
const fs = require('fs')

const uncompress = require('./uncompress')
const byId = require('./ids.json')

const dir = path.join(__dirname, 'data')



const all = () => {
	const ids = Object.keys(byId)[Symbol.iterator]()

	return from2({objectMode: true}, (_, next) => {
		const {value, done} = ids.next()
		if (done) return next(null, null)
		const signature = byId[value]

		fs.readFile(path.join(dir, signature + '.json'), {encoding: 'utf8'}, (err, data) => {
			if (err) return next(err)
			try {
				data = uncompress(JSON.parse(data))
				next(null, data)
			} catch (err) {
				next(err)
			}
		})
	})
}

module.exports = all
