#!/bin/sh

cd ./job-board-ui

npm run build

cd ../

rm -rf ./src/main/resources/static/*

cp ./job-board-ui/build/** ./src/main/resources/static

mkdir ./src/main/resources/static/css
mkdir ./src/main/resources/static/js


cp ./job-board-ui/build/static/css/* ./src/main/resources/static/css
cp ./job-board-ui/build/static/js/* ./src/main/resources/static/js
rm -rf ./src/main/resources/static/static