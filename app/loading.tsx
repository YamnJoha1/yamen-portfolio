import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Suspense } from "react";

export default function RootLoading() {
  return (
    <Suspense>
    <LoadingSpinner />;
    </Suspense>
  )
} 