#!/bin/bash
set -e
echo "Creating chapter ${1} directory and files..."
mkdir ./Chapter${1}
cd ./Chapter${1}
touch ./chapter${1}.js ./chapter${1}_data.js
cd ../
echo "Done.";