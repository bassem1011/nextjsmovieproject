import { Suspense } from "react";
import HomeContent from "../components/HomeContent";

export default function HomePage() {
  return (
    <Suspense fallback={<p className="text-center mt-4">Loading...</p>}>
      <HomeContent />
    </Suspense>
  );
}
