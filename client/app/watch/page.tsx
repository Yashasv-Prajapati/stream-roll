import VideoPlayer from "@/components/video-player/video-player";
import { getVideoDataById } from "@/actions/videos/video";
import styles from "./style.module.css";

interface VideoPageProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

const VideoPage = async ({ params }: VideoPageProps) => {
  const videoId = params.id;
  const video = await getVideoDataById(videoId); // Replace with your actual data fetching logic

  const relatedVideos = [
    {
      id: 1,
      title: "Sample Video 1",
      description: "This is a description for sample video 1.",
      thumbnail: "/path/to/thumbnail1.jpg",
      url: "https://www.youtube.com/watch?v=6uRAvGQPF1E&list=WL&index=4&ab_channel=NishantChahar",
    },
    {
      id: 2,
      title: "Sample Video 2",
      description: "This is a description for sample video 2.",
      thumbnail: "/path/to/thumbnail2.jpg",
      url: "https://www.youtube.com/watch?v=6uRAvGQPF1E&list=WL&index=4&ab_channel=NishantChahar",
    },
    // Add more dummy videos as needed
  ];

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <h1 className="text-4xl font-bold text-white mb-8">{video.title}</h1>
      <div className="w-full mb-8">
        <VideoPlayer src={video.url} />
      </div>
      <h2 className="text-3xl font-semibold text-white mb-4">Related Videos</h2>
    </div>
  );
};

export default VideoPage;
