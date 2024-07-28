import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center text-white py-20">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Stream-Roll</h1>
        <p className="text-xl mb-8 max-w-2xl">
          Easily upload and share your videos with the world. Stream-Roll makes
          video processing simple and efficient.
        </p>
        <button className="px-8 py-4 bg-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="flex flex-col md:flex-row justify-around text-white py-20">
        <div className="max-w-xs p-4 flex flex-col items-center">
          <Image
            src="./svg/upload.svg"
            alt="Upload"
            width={150}
            height={150}
            className="mb-4 "
          />
          <h2 className="text-2xl font-bold mb-2">Easy Upload</h2>
          <p>Quickly upload your videos with our simple interface.</p>
        </div>
        <div className="max-w-xs p-4 flex flex-col items-center">
          <Image
            src="./svg/share.svg"
            alt="Share"
            width={150}
            height={150}
            className="mb-4 "
          />
          <h2 className="text-2xl font-bold mb-2">Seamless Sharing</h2>
          <p>Share your videos effortlessly with friends and family.</p>
        </div>
        <div className="max-w-xs p-4 flex flex-col items-center">
          <Image
            src="./svg/process.svg"
            alt="Process"
            width={150}
            height={150}
            className="mb-4 "
          />
          <h2 className="text-2xl font-bold mb-2">Efficient Processing</h2>
          <p>Enjoy fast and efficient video processing to get your content.</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="flex flex-col items-center justify-center text-center text-white py-20">
        <h2 className="text-3xl font-bold mb-4">
          Get Started with Stream-Roll
        </h2>
        <p className="text-xl mb-8 max-w-xl">
          Join Stream-Roll today and start uploading and sharing your videos
          effortlessly. Sign up now to get started!
        </p>
        <button className="px-8 py-4 bg-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
          Sign Up Now
        </button>
      </div>
    </main>
  );
}
