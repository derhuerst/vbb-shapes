#!/bin/sh

curl -L --compressed https://vbb-gtfs.jannisr.de/latest/trips.txt > data/trips.txt
curl -L --compressed https://vbb-gtfs.jannisr.de/latest/shapes.txt > data/shapes.txt
