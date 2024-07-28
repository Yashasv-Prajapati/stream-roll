import Image from "next/image";

const VideoCard = ({ video }:any) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src='./svg/video.svg'
        alt={video.title}
        width={320}
        height={180}
        className="w-full p-2 opacity-40"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{video.title}</h2>
        <p className="text-gray-600">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
