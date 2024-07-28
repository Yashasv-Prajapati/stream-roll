// import { useState } from 'react';
// import VideoCard from '@/components/VideoCard';
import { getVideos } from "@/actions/videos/video"; // Assuming you have a function to fetch videos from your database or API
import VideoCard from "@/components/video-card";

interface BrowseVideosProps {
//   params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}

const BrowseVideos = async ({ searchParams }: BrowseVideosProps) => {
  const searchTerm = searchParams?.search || "";
  const videos = await getVideos(searchTerm);

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Browse Videos</h1>
      <form action="/browse" method="get" className="w-full max-w-lg flex mb-8">
        <input
          type="text"
          name="search"
          placeholder="Search for videos..."
          defaultValue={searchTerm}
          className="w-full p-2 rounded-l-lg border-none focus:outline-none"
        />
        <button
          type="submit"
          className="bg-white text-blue-500 px-4 py-2 rounded-r-lg font-semibold hover:bg-gray-100 transition duration-300"
        >
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-screen-lg">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default BrowseVideos;
