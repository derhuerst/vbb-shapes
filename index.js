'use strict'

const fs = require('fs')
const path = require('path')
const ndjson = require('ndjson')
const map = require('through2-map')
const filter = require('stream-filter')

const uncompress = require('./uncompress')



const shapes = (filter) => {
	let out = fs.createReadStream(path.join(__dirname, 'data.ndjson'))
	.pipe(ndjson.parse())
	.pipe(map.obj(uncompress))
	if (filter) out = out.pipe(filterStream.obj(filter))
}

module.exports = shapes
