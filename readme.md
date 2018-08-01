# vbb-shapes

**Shapes of lines of the [Berlin Brandenburg public transport service (VBB)](http://www.vbb.de/)**, computed from [open](https://daten.berlin.de/datensaetze/vbb-fahrplandaten-mitte-juli-2018-bis-mitte-dezember-2018) [GTFS](https://developers.google.com/transit/gtfs/) [data](https://vbb-gtfs.jannisr.de/).

[![npm version](https://img.shields.io/npm/v/vbb-shapes.svg)](https://www.npmjs.com/package/vbb-shapes)
[![build status](https://img.shields.io/travis/derhuerst/vbb-shapes.svg)](https://travis-ci.org/derhuerst/vbb-shapes)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/vbb-shapes.svg)
[![gitter channel](https://badges.gitter.im/derhuerst/vbb-rest.svg)](https://gitter.im/derhuerst/vbb-rest)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installing

*Warning:* This module contains JSON file with a **total size of roughly 60mb**.

```shell
npm install vbb-shapes
```


## Usage

Let's assume you read trips from [`vbb-trips`](https://github.com/derhuerst/vbb-trips). Each trip has a `shapeId` associated.

```js
const shapes = require('vbb-shapes')

shapes('1269')
.then(console.log)
```

```js
[
	[52.48607, 13.4245],
	[52.48756, 13.42648],
	// …
	[52.5135, 13.52988],
	[52.51373, 13.52003]
]
```

You can also read all shapes from a [readable stream](https://nodejs.org/api/stream.html#stream_class_stream_readable) in [object mode](https://nodejs.org/api/stream.html#stream_object_mode), emitting one shape (as shown above) at once.

```js
const allShapes = require('vbb-shapes/all')

allShapes()
.on('data', console.log)
.on('error', console.error)
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/vbb-shapes/issues).
