import "./globals.css";
import { ThemeProvider } from "next-themes";
import { LoadingProvider } from "@/lib/contexts/LoadingContext";
import { NavigationProgress } from "@/components/ui/NavigationProgress";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";
import { globalMetadata as metadata, viewport } from "@/utils/globalmetadata";
import { Suspense } from "react";

export { metadata, viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <LoadingProvider>
              <LoadingSpinner />
              <NavigationProgress />
              {children}
            </LoadingProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
