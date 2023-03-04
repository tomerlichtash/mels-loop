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
		#"-app")
		#	app="$1"
			#shift
			#;;
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


echo "OUTPATH is $OUTPATH"

mkdir -p "$OUTPATH"

if [ ! -d "$OUTPATH" ]; then
    echo "Failed to create folder $OUTPATH"
    exit 1;
fi

OUTPATH=$( cd "$OUTPATH" && pwd -P )

ENCODED_PATH=$( node -p "encodeURIComponent('$OUTPATH/$OUTFILE')" )
echo "Final URL: http://localhost:11012/save/$ENCODED_PATH"

curl http://localhost:11012/save/$ENCODED_PATH
curl http://localhost:11012/terminate
