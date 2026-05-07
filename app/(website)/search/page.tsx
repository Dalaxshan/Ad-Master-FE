import { Suspense } from 'react';
import SearchSection from "@/components/website/SearchSection";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-500">Loading...</div></div>}>
      <SearchSection />
    </Suspense>
  );
}
