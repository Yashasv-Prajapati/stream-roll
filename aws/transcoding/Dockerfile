FROM ubuntu:focal

ENV DEBIAN_FRONTEND=noninteractive

RUN /usr/bin/apt-get update && \
/usr/bin/apt-get install -y curl && \
/usr/bin/apt-get install -y python3 && \
/usr/bin/apt-get install -y ffmpeg && \
/usr/bin/apt-get install -y python3-pip && \
rm -rf /var/lib/apt/lists/*

WORKDIR /home/app

COPY . /home/app

# Install Python dependencies
RUN pip3 install -r requirements.txt

# Default command to run the Python script
CMD ["python3", "transcode.py"]

