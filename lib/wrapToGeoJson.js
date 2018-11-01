'use strict'

const wrapToGeoJson = (output) => {
	return  {
		"type": "FeatureCollection",
		"features": [
			{
				"type": "Feature",
				"geometry": {
					"type": "LineString",
					"coordinates": output
				},
				"properties": {}
			}
		]
	}
};

module.exports = wrapToGeoJson
