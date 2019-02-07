#!/bin/sh
npm run build
rm -rf ../../../full-stack-week3/build
cp -r build/ ../../../full-stack-week3/