'use strict'

const compress = (input) => {
	if (input.length === 0) return input
	const output = []

	let lastLat = 0
	let lastLon = 0
	for (let i = 0; i < input.length; i++) {
		const lat = input[i][0]
		const lon = input[i][1]
		if (i > 0 && lat === lastLat && lon === lastLon) continue
		output.push([
			Math.round((lat - lastLat) * 100000),
			Math.round((lon - lastLon) * 100000)
		])
		lastLat = lat
		lastLon = lon
	}

	return output
}

module.exports = compress
