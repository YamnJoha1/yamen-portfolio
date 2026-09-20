import Spinner from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";

// app/layout.tsx is a pass-through, so this fallback renders its own
// <html>/<body>. It uses the plain Spinner rather than LoadingSpinner, which
// needs a LoadingProvider that only exists inside app/[locale]/layout.tsx.
export default function RootLoading() {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        <Spinner />
      </body>
    </html>
  );
}
