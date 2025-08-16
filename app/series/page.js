"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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

export default function Series() {
  const [series, setSeries] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  const selectedLanguageName =
    languages.find((lang) => lang.code === selectedLanguage)?.name || "All";

  useEffect(() => {
    async function fetchSeries() {
      setLoading(true);
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/trending/tv/day?api_key=d5c1888ee546778987eb6043ef1957db"
        );
        const data = await res.json();
        setSeries(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchSeries();
  }, []);

  const handleTrailerClick = async (id) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=d5c1888ee546778987eb6043ef1957db`
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

  const filteredSeries = series.filter((serie) => {
    const matchLanguage =
      selectedLanguage === "All" ||
      serie.original_language === selectedLanguage;
    const matchGenre =
      selectedGenre === "All" || serie.genre_ids.includes(selectedGenre);
    return matchLanguage && matchGenre;
  });

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <h1 className="text-3xl font-bold text-white text-center py-8">
        TV Series Collection
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

      <div className="flex flex-wrap justify-center gap-4 px-6">
        <button
          className={`bg-red-600 hover:bg-red-700 transition duration-300 text-white font-bold cursor-pointer py-2 px-5 rounded ${
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
        <h2 className="text-2xl font-semibold text-white mb-6">TV Series</h2>
        {loading ? (
          <p className="text-white text-center text-2xl mt-20">Loading...</p>
        ) : filteredSeries.length === 0 ? (
          <p className="text-gray-200 text-center mt-10 text-2xl font-semibold">
            No {selectedLanguageName} Series Found Today.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredSeries.map((serie) => (
              <div
                key={serie.id}
                className="p-4 border border-gray-700 rounded-2xl text-white hover:scale-105 transition-transform duration-300 shadow-lg "
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                  alt={serie.name}
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-2xl shadow-lg mb-3"
                />
                <h2 className="text-lg font-semibold mb-1 truncate">
                  {serie.name}
                </h2>
                <p className="text-yellow-400 mb-2">⭐ {serie.vote_average}</p>
                <button
                  onClick={() => handleTrailerClick(serie.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 w-full cursor-pointer"
                >
                  Trailer
                </button>
                <button className="text-sm sm:text-base bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 w-full cursor-pointer">
                  Watch Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
