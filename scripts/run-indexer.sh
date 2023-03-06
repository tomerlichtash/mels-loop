#!/bin/bash
# get dir of running script
SCRIPT_DIR=`dirname "$0"`;

DB_PORT=""
USAGE="Usage: $( basename $0 ) -P <port of DB server>"

shopt -s nocasematch
while (( "$#" )); do
	nextarg=$1
	shift
	case $nextarg in
		"-P"|"--port")
			DB_PORT="$1"
            shift
			;;
		*)
			echo $USAGE
			echo "unkonwn option $nextarg" >&2
			exit 1
			;;
	esac
done

if [ $DB_PORT == "" ] ; then
	echo $USAGE >& 2
	exit 1
fi

#move to a known folder
pushd "$SCRIPT_DIR"
#cd to db server
cd ../src/db/server
#run the server
node app.js --port=$DB_PORT &
# node app.js > /dev/null &
popd