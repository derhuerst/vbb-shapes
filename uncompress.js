'use strict'

const uncompress = (input) => {
	if (input.length === 0) return input
	const output = []

	let lastLat = 0
	let lastLon = 0
	for (let i = 0; i < input.length; i++) {
		const dLat = input[i][0] / 100000
		const dLon = input[i][1] / 100000
		lastLat = Math.round((dLat + lastLat) * 100000) / 100000
		lastLon = Math.round((dLon + lastLon) * 100000) / 100000

		output.push([lastLat, lastLon])
	}

	return output
}

module.exports = uncompress
