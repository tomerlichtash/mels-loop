#!/bin/bash

SCRIPT_DIR=`dirname "$0"`;
pushd "$SCRIPT_DIR"
cd ../src/db/server
node app.js > /dev/null &
popd