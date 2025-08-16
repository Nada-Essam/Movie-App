// components/MovieCard.js
import Image from "next/image";

export default function MovieCard({ movie , onClick }) {
  return (
    <div className=" p-4 border border-gray-700 rounded-2xl text-white">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={300}
        height={300}
        className="w-full h-auto rounded-2xl shadow-lg mb-3"
      />
      <h2 className="text-lg font-semibold mb-1 truncate">{movie.title}</h2>
      <p className="text-yellow-400 mb-2">⭐ {movie.vote_average}</p>
      <button
        onClick={() => onClick(movie.id)}
        className="text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 w-full cursor-pointer"
      >
        Trailer
      </button>
      <button className="text-sm sm:text-base bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 w-full cursor-pointer">
        Watch Now
      </button>
    </div>
  );
}
