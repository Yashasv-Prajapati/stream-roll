#!/bin/bash

# Function to display usage information
usage() {
    echo "Usage: $0 <INPUT_FILE> <WIDTH> <HEIGHT> <INDEX> <OUTPUT_PATH>"
    echo "Example: $0 videos/sample.mp4 1280 720 2 output/sample.mp4"
    exit 1
}

# Check if the number of arguments is less than 5
if [ "$#" -ne 5 ]; then
    echo "Error: Missing arguments."
    usage
fi

# Variables
INPUT_FILE=$1
WIDTH=$2
HEIGHT=$3
OUTPUT_PATH=$4
INDEX=$5

mkdir -p $OUTPUT_PATH

# Command to trancode video file into HLS segments in a particular quality
# Each segment - 10seconds starting with 0 
ffmpeg -i $INPUT_FILE -vf scale=$WIDTH:$HEIGHT -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename $OUTPUT_PATH/segment${INDEX}%03d.ts -start_number 0 $OUTPUT_PATH/index.m3u8