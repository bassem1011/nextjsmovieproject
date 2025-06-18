// src/app/page.js

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "../context/WishlistContext";
import MovieCard from "../components/MovieCard";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();
      setMovies(data.results || []);
      setLoading(false);
    }

    fetchMovies();
  }, [page]);

  const handlePageChange = (newPage) => {
    router.push(`/?page=${newPage}`);
  };

  return (
    <div>
      <h1 className="mb-4">Now Playing</h1>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="row">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-secondary"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
