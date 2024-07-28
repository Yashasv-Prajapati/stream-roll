#!/bin/bash

# Function to display usage information
usage() {
    echo "Usage: $0 <FILE_PATH>"
    echo "Example: $0 videos/sample.mp4"
    exit 1
}

# Check if the number of arguments is less than 5
if [ "$#" -ne 1 ]; then
    echo "Error: Missing arguments."
    usage
fi

INPUT_FILE_PATH=$1

# Probes the video file to check for its resolution
ffprobe -v error -select_streams  v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$INPUT_FILE_PATH"