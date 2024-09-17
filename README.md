# Stream Roll 

A simple platform for uploading videos and sharing with the world. Utilizes HLS streaming for video playback for seamless experience and supports multiple video qualities for better user experience. Read more about it here – [Wikipedia](https://en.wikipedia.org/wiki/HTTP_Live_Streaming)

## Design and Architecture
The architecture is quite simple, there are possible improvements that can be made to make it more scalable and robust. But, for the purpose of this project, I have kept it simple. 
Improvements can be made by adding a CDN for caching the video chunks, or by improving the queue for video processing. 
![adaptive-video-streaming](https://github.com/user-attachments/assets/826912cd-26f5-49e9-80ee-10c52455c23c)


## Setup

### Frontend
To run the frontend locally in development mode - Go to the `client` directory and run the following commands

```
npm install 
npm run dev
```

### Backend
The backend is built for AWS. Follow the design and architecture described above to setup the backend.  

Note - The cost for running this backend live 24/7 was turning out to be not so cost effective. So, I have stopped the backend services for now.
