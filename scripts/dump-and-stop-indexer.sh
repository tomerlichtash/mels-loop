#!/bin/bash

OUTFILE=""
DB_PORT=""
USAGE="Usage: $( basename $0 ) -O </full/out/file/path> -P <port of DB server>"

shopt -s nocasematch
while (( "$#" )); do
	nextarg=$1
	shift
	case $nextarg in
		"-O"|"--outfile")
			OUTFILE="$1"
            shift
			;;
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

if [ "$OUTFILE" == "" ]; then
    echo $USAGE >& 2
    exit 1
fi

OUTPATH=`dirname "$OUTFILE"`
OUTFILE=`basename "$OUTFILE"`
# ensure out path exists
mkdir -p "$OUTPATH"

if [ ! -d "$OUTPATH" ]; then
    echo "Failed to create folder $OUTPATH"
    exit 1;
fi

DB_URL="http://localhost:${DB_PORT}"

# get full outfile path (param may be relative)
OUTPATH=$( cd "$OUTPATH" && pwd -P )

ENCODED_PATH=$( node -p "encodeURIComponent('$OUTPATH/$OUTFILE')" )

#dump db to file
curl "${DB_URL}/save/$ENCODED_PATH"
#and terminate the db server
curl ${DB_URL}/terminate

# Add the result to git
git add "$OUTPATH/$OUTFILE"

