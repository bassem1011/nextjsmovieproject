"use client";

import { useWishlist } from "../../context/WishlistContext";
import Link from "next/link";
import Image from "next/image";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  return (
    <div>
      <h2 className="mb-4">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No movies in wishlist.</p>
      ) : (
        <div className="row">
          {wishlist.map((movie) => (
            <div className="col-md-3 mb-4" key={movie.id}>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
                width={500}
                height={750}
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
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
