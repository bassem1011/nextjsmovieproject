"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "../../context/WishlistContext";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    async function fetchSearch() {
      if (!query) return;

      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      setResults(data.results || []);
      setLoading(false);
    }

    fetchSearch();
  }, [query]);

  return (
    <div>
      <h2 className="mb-4">Search Results for: &quot;{query}&quot;</h2>

      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="row">
          {results.map((movie) => (
            <div className="col-md-3 mb-4" key={movie.id}>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
                width={500}
                height={750}
                unoptimized
              />

              <button
                className="btn-heart"
                onClick={() => toggleWishlist(movie)}
                title={
                  isInWishlist(movie.id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"
                }
              >
                <span
                  style={{ color: isInWishlist(movie.id) ? "#ff5252" : "#ccc" }}
                >
                  ♥
                </span>
              </button>

              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <Link href={`/movie/${movie.id}`} className="btn btn-primary">
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
