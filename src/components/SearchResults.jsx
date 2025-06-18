"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
      );
      const data = await res.json();
      setMovies(data.results || []);
    };
    fetchResults();
  }, [query]);

  if (!query)
    return <p className="text-center mt-5">Please enter a search query.</p>;

  return (
    <div className="container mt-4">
      <h2>Search Results for "{query}"</h2>
      <div className="row">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}
