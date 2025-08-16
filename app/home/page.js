"use client";
import MovieCard from "@/components/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const resTrending = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?api_key=d5c1888ee546778987eb6043ef1957db"
        );
        const resTopRated = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=d5c1888ee546778987eb6043ef1957db"
        );

        const trendingData = await resTrending.json();
        const topRatedData = await resTopRated.json();

        setTrending(trendingData.results);
        setTopRated(topRatedData.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    }

    fetchMovies();
  }, []);

  const handleTrailerClick = async (id) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d5c1888ee546778987eb6043ef1957db`
      );
      const data = await res.json();
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        const youtubeUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
        window.open(youtubeUrl, "_blank");
      } else {
        alert("No trailer found for this movie.");
      }
    } catch (error) {
      console.error("Failed to fetch trailer:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-screen"
        style={{
          backgroundImage: "url('/avatar-background-8t5bkculh0jr4m3c.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-10 px-4 sm:px-8 md:px-20 py-16 text-white text-center sm:text-left">
          {/* Text Section */}
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
              Avatar (2009)
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
              A paraplegic Marine dispatched to the moon Pandora on a unique
              mission becomes torn between following orders and protecting an
              alien civilization.
            </p>
            <p className="text-yellow-400 text-lg sm:text-xl font-semibold">
              ⭐ 7.8 / 10
            </p>
          </div>

          {/* Button Section */}
          <div>
            <button className="flex items-center bg-red-600 hover:bg-red-700 cursor-pointer text-white font-bold py-3 px-6 rounded-full text-lg sm:text-xl shadow-lg transition">
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="mr-2 sm:mr-3 text-xl sm:text-2xl"
              />
              Watch Now
            </button>
          </div>
        </div>
      </section>

      {/* Trending Movies */}
      <div className="bg-gray-900 mt-10 px-6 md:px-12 pb-12">
        <h1 className="text-3xl font-bold text-white mb-6">Trending Now 🔥</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 ">
          {trending.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={handleTrailerClick}
            />
          ))}
        </div>
      </div>

      {/* Top Rated Movies */}
      <div className="bg-gray-900 mt-10 px-6 md:px-12 pb-12">
        <h1 className="text-3xl font-bold text-white mb-6">Top Rated 🌟</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {topRated.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={handleTrailerClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
