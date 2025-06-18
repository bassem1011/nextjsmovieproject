import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { WishlistProvider } from "../context/WishlistContext";

export const metadata = {
  title: "TMDB Movies",
  description: "Next.js Movie App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <WishlistProvider>
          <Navbar />
          <main className="container py-4">{children}</main>
        </WishlistProvider>
      </body>
    </html>
  );
}
