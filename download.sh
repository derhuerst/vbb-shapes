#!/bin/sh

URL='http://www.vbb.de/de/download/GTFS_VBB_Dez2016_Dez2017.zip'

echo 'Downloading data from Berlin open data portal.'
curl -# -L $URL > data.zip

unzip -ju data.zip -d data
rm data.zip
rm 'data/GTFS_VBB_Dez2016 Dez2017_ohne_shape_files.zip'
unzip -ju 'data/GTFS_VBB_Dez2016 Dez2017_mit_shape_files.zip' -d data
rm 'data/GTFS_VBB_Dez2016 Dez2017_mit_shape_files.zip'
