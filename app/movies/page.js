"use client";
import MovieCard from "@/components/MovieCard";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const languages = [
  { code: "en", name: "English" },
  { code: "ko", name: "Korean" },
  { code: "ar", name: "Arabic" },
  { code: "de", name: "German" },
  { code: "hi", name: "Hindi" },
  { code: "th", name: "Thai" },
  { code: "zh", name: "Chinese" },
];
const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
];

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  const selectedLanguageName =
    languages.find((lang) => lang.code === selectedLanguage)?.name || "All";

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      let url = "";

      if (search) {
        url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=d5c1888ee546778987eb6043ef1957db`;
      } else {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=d5c1888ee546778987eb6043ef1957db`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      setLoading(false);
    };

    fetchMovies();
  }, [search]);

  const handleWatchNow = async (id) => {
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
        alert("No trailer found for this series.");
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const filteredMovies = movies.filter((movie) => {
    const matchLanguage =
      selectedLanguage === "All" ||
      movie.original_language === selectedLanguage;
    const matchGenre =
      selectedGenre === "All" || movie.genre_ids.includes(selectedGenre);
    return matchLanguage && matchGenre;
  });

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <h1 className="text-3xl font-bold text-white text-center py-8">
        Movies Collection
      </h1>

      {/* Buttons for Filtering */}
      <div className="flex flex-wrap justify-center gap-4 px-6 mb-9 sm:mb-4">
        <button
          className={`bg-red-600 hover:bg-red-700 transition duration-300 text-white font-bold cursor-pointer py-2 px-5 rounded ${
            selectedLanguage === "All" ? "bg-red-400 ring-2 ring-white" : ""
          }`}
          onClick={() => setSelectedLanguage("All")}
        >
          All
        </button>
        {languages.map((language) => (
          <button
            key={language.code}
            className={`bg-red-600 hover:bg-red-700 transition duration-300 text-white font-bold cursor-pointer py-2 px-5 rounded ${
              selectedLanguage === language.code
                ? "bg-red-400 ring-2 ring-white"
                : ""
            }`}
            onClick={() => setSelectedLanguage(language.code)}
          >
            {language.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 px-6 ">
        <button
          className={`bg-red-600  hover:bg-red-700 transition duration-300 text-white font-bold cursor-pointer py-2 px-5 rounded ${
            selectedGenre === "All" ? "bg-red-400 ring-2 ring-white" : ""
          }`}
          onClick={() => setSelectedGenre("All")}
        >
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`bg-red-600 hover:bg-red-700 transition duration-300 text-white font-bold cursor-pointer py-2 px-5 rounded ${
              selectedGenre === genre.id ? "bg-red-400 ring-2 ring-white" : ""
            }`}
            onClick={() => setSelectedGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      <div className="mt-12 px-6 md:px-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Movies</h2>
        {loading ? (
          <p className="text-white text-center text-2xl mt-20">Loading...</p>
        ) : filteredMovies.length === 0 ? (
          <p className="text-gray-200 text-center mt-10 text-2xl font-semibold">
            No {selectedLanguageName} Movies Found Today.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={handleWatchNow}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
