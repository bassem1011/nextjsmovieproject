import { Suspense } from "react";
import SearchResults from "../../components/SearchResults";

export default function SearchPage() {
  return (
    <Suspense
      fallback={<p className="text-center mt-5">Loading search results...</p>}
    >
      <SearchResults />
    </Suspense>
  );
}
