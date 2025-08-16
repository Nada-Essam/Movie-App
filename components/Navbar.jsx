"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (search.trim() === "") return;

    const currentPath = window.location.pathname;
    const path = currentPath.includes("series") ? "series" : "movies";
    router.push(`/${path}?search=${search}`);
    setSearch(""); // نفضي البحث بعد البحث
    setMenuOpen(false); // نقفل المينيو بعد البحث على الموبايل
  }

  return (
    <nav className="bg-gray-800 fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16 justify-between">
        {/* Logo */}
        <div className="flex-none">
          <h1 className="text-2xl font-bold text-white">Movie Zone</h1>
        </div>

        {/* Burger Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none text-white hover:text-red-500 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Links + Search (Desktop) */}
        <div className="hidden md:flex items-center gap-8 ">
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link href="/home" className="text-white hover:text-red-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/movies" className="text-white hover:text-red-500 transition">
                Movies
              </Link>
            </li>
            <li>
              <Link href="/series" className="text-white hover:text-red-500 transition">
                Series
              </Link>
            </li>
          </ul>

          {/* Search input desktop */}
         
        </div>
         <form onSubmit={handleSubmit} className="hidden md:flex items-center gap-2 bg-gray-700 rounded-lg px-4 py-2">
            <input
              type="search"
              placeholder="Search"
              className="bg-gray-700 text-white outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white" />
          </form>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-4 bg-gray-800 space-y-4 ">
          <ul className="flex flex-col space-y-4 text-xl">
            <li>
              <Link href="/home" className="text-white hover:text-red-500 transition" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/movies" className="text-white hover:text-red-500 transition" onClick={() => setMenuOpen(false)}>
                Movies
              </Link>
            </li>
            <li>
              <Link href="/series" className="text-white hover:text-red-500 transition" onClick={() => setMenuOpen(false)}>
                Series
              </Link>
            </li>
          </ul>

          {/* Search input mobile */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-gray-700 rounded-lg px-4 py-2 mt-4">
            <input
              type="search"
              placeholder="Search"
              className="bg-gray-700 text-white outline-none flex-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white" />
          </form>
        </div>
      )}
    </nav>
  );
}
