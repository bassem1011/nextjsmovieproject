"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "../context/WishlistContext";

export default function MovieCard({ movie }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100">
        <Image
          src={posterUrl}
          alt={movie.title}
          width={700}
          height={500}
          className="card-img-top"
          style={{ height: "375px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{movie.title}</h5>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <Link
              href={`/movie/${movie.id}`}
              className="btn btn-sm btn-primary"
            >
              Details
            </Link>
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
                style={{
                  color: isInWishlist(movie.id) ? "#ff5252" : "#ccc",
                  fontSize: "60px",
                }}
              >
                ♥
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
