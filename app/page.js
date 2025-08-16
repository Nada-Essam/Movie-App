import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-900 text-center">
      <Image
        src="/lexscope-6pj8XcUIAyU-unsplash.jpg"
        alt="Movie cover"
        width={320}
        height={320}
        className="rounded-2xl shadow-lg"
        priority
      />

      <h1 className="mt-6 text-2xl font-bold text-red-600 sm:text-3xl">
        🎬 Welcome to Movie Zone
      </h1>

      <p className="mt-4 text-xl text-gray-300 sm:text-2xl">
        We bring the movies, you bring the popcorn. 🍿
      </p>

      <Link
        href="/home"
        className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-300"
      >
        Get Started
      </Link>
    </div>
  );
}
