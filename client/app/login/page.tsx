import Link from 'next/link';

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">Login</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input type="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">Login</button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Don&apos;t have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}
