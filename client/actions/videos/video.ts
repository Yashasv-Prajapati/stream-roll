export async function getVideos(searchTerm = "") {
  // Replace this with your actual data fetching logic
  const dummyVideos = [
    {
      id: 1,
      title: "Sample Video 1",
      description: "This is a description for sample video 1.",
      thumbnail: "/path/to/thumbnail1.jpg",
    },
    {
      id: 2,
      title: "Sample Video 2",
      description: "This is a description for sample video 2.",
      thumbnail: "/path/to/thumbnail2.jpg",
    },
    // Add more dummy videos as needed
  ];

  if (searchTerm) {
    return dummyVideos.filter(
      (video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return dummyVideos;
}

export async function getVideoDataById(videoId: string) {
  // Replace this with your actual data fetching logic
  const dummyVideo = {
    id: 1,
    title: "Sample Video 1",
    description: "This is a description for sample video 1.",
    url: "https://processed-videos-streamroll.s3.ap-south-1.amazonaws.com/outputs/1.mp4_60a6ca84-4c03-11ef-a67c-0a58a9feac02/master.m3u8",
  };

  return dummyVideo;
}