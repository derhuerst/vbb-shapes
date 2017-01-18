# vbb-shapes

**Shapes of lines of the [Berlin Brandenburg public transport service (VBB)](http://www.vbb.de/)**, computed from [open](http://daten.berlin.de/datensaetze/vbb-fahrplandaten-dezember-2016-bis-dezember-2017) [GTFS](https://developers.google.com/transit/gtfs/) [data](https://github.com/derhuerst/vbb-gtfs).

[![npm version](https://img.shields.io/npm/v/vbb-shapes.svg)](https://www.npmjs.com/package/vbb-shapes)
[![build status](https://img.shields.io/travis/derhuerst/vbb-shapes.svg)](https://travis-ci.org/derhuerst/vbb-shapes)
[![dependency status](https://img.shields.io/david/derhuerst/vbb-shapes.svg)](https://david-dm.org/derhuerst/vbb-shapes)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/vbb-shapes.svg)](https://david-dm.org/derhuerst/vbb-shapes#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/vbb-shapes.svg)
[![gitter channel](https://badges.gitter.im/derhuerst/vbb-rest.svg)](https://gitter.im/derhuerst/vbb-rest)


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
  [51.88199, 13.71321],
  [51.88204, 13.71375],
  // …
  [51.85106, 13.71808],
  [51.851, 13.7181]
]
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/vbb-shapes/issues).
