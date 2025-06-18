"use client";

import Link from "next/link";
import { useWishlist } from "../context/WishlistContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { wishlist } = useWishlist();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // prevent hydration mismatch

  return (
    <nav
      className="navbar navbar-expand-lg py-3"
      style={{ backgroundColor: "#ffc107" }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" href="/">
          🎬 TMDB Movies
        </Link>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" href="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/wishlist">
              Wishlist{" "}
              <span className="badge bg-danger ms-1">{wishlist.length}</span>
            </Link>
          </li>
        </ul>
        <form className="d-flex" action="/search" method="GET">
          <input
            className="form-control me-2"
            type="search"
            name="query"
            placeholder="Search..."
          />
          <button className="btn btn-outline-dark" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
