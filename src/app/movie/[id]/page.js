// src/app/movie/[id]/page.js

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function fetchMovieData() {
      const [detailsRes, recRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`
        ),
      ]);

      const details = await detailsRes.json();
      const recs = await recRes.json();

      setMovie(details);
      setRecommendations(recs.results || []);
    }

    fetchMovieData();
  }, [id]);

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <div>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        width={300}
        height={450}
        className="img-fluid mb-4"
        style={{ maxWidth: "300px", height: "auto" }}
        priority
      />

      <p>
        <strong>Overview:</strong> {movie.overview}
      </p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average} / 10
      </p>
      <h4 className="mt-5">Recommended Movies</h4>
      <div className="row">
        {recommendations.map((rec) => (
          <div className="col-md-3 mb-4" key={rec.id}>
            <div className="card h-100">
              <Image
                src={`https://image.tmdb.org/t/p/w500/${rec.poster_path}`}
                alt={rec.title}
                width={300}
                height={450}
                className="card-img-top"
                style={{ width: "100%", height: "auto" }}
                priority={false}
              />
              <div className="card-body">
                <h6 className="card-title">{rec.title}</h6>
                <Link
                  href={`/movie/${rec.id}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
