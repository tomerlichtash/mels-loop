#!/bin/bash
# get dir of running script
SCRIPT_DIR=`dirname "$0"`;
if  [ "$ML_DB_API_PORT" == "" ]; then
    ML_DB_API_PORT=11012
fi

pushd "$SCRIPT_DIR"
cd ../src/db/server
#run the server
node app.js --port=$ML_DB_API_PORT &
# node app.js > /dev/null &
popd