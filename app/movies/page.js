"use client";
import { Suspense } from "react";
import MoviesContent from "./MoviesContent";





export default function Movies() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20 text-2xl">Loading search...</div>}>
      <  MoviesContent/>
    </Suspense>
  );
}

