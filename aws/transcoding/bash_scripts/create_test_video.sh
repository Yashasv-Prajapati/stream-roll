#!/bin/bash

# Function to display usage information
usage() {
    echo "Usage: $0 <VIDEO_DURATION> <WIDTH> <HEIGHT> <BITRATE> <DESTINATION>"
    echo "Example: $0 30 1280 720 1M videos/sample.mp4"
    exit 1
}

# Check if the number of arguments is less than 5
if [ "$#" -ne 5 ]; then
    echo "Error: Missing arguments."
    usage
fi

VIDEO_DURATION=$1
WIDTH=$2
HEIGHT=$3
BITRATE=$4
DESTINATION=$5

# Construct the ffmpeg command - to create test video
COMMAND="ffmpeg -f lavfi -i testsrc -t $VIDEO_DURATION -pix_fmt yuv420p -s ${WIDTH}x${HEIGHT} -b:v $BITRATE $DESTINATION"

# Print the command that will be run
echo "Running command: $COMMAND"

# Run the constructed ffmpeg command 
$COMMAND
