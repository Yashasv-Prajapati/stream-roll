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
      <h1 className="mb-8 text-4xl font-bold text-white">Browse Videos</h1>
      <form action="/browse" method="get" className="mb-8 flex w-full max-w-lg">
        <input
          type="text"
          name="search"
          placeholder="Search for videos..."
          defaultValue={searchTerm}
          className="w-full rounded-l-lg border-none p-2 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-r-lg bg-white px-4 py-2 font-semibold text-blue-500 transition duration-300 hover:bg-gray-100"
        >
          Search
        </button>
      </form>
      <div className="grid w-full max-w-screen-lg grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default BrowseVideos;
