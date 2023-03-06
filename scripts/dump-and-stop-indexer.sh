#!/bin/bash

SCRIPT_DIR=`dirname "$0"`;
# pushd "$SCRIPT_DIR" > /dev/null

shopt -s nocasematch
OUTFILE=""
USAGE="Usage: $( basename $0 ) -O </full/out/file/path>"

while (( "$#" )); do
	nextarg=$1
	shift
	case $nextarg in
		"-O"|"--outfile")
			OUTFILE="$1"
            shift
			;;
		*)
			echo $USAGE
			echo "unkonwn option $nextarg"
			exit 1
			;;
	esac
done

if [ "$OUTFILE" == "" ]; then
    echo $USAGE
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

if  [ "$ML_DB_API_PORT" == "" ]; then
    ML_DB_API_PORT=11012
fi

DB_URL="http://localhost:${ML_DB_API_PORT}"

# get full outfile path (param may be relative)
OUTPATH=$( cd "$OUTPATH" && pwd -P )

ENCODED_PATH=$( node -p "encodeURIComponent('$OUTPATH/$OUTFILE')" )

#dump db to file
curl "${DB_URL}/save/$ENCODED_PATH"
#and terminate the db server
curl ${DB_URL}/terminate

# Add the result to git
git add "$OUTPATH/$OUTFILE"

