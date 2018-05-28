#!/bin/sh
npm run build
rm -rf ../vaino-be/build
cp -r build ../vaino-be/