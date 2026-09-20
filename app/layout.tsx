import "./globals.css";
import { globalMetadata as metadata, viewport } from "@/utils/globalmetadata";

export { metadata, viewport };

// The <html>/<body> shell lives in app/[locale]/layout.tsx so that `lang` and
// `dir` can be emitted from the active locale on the server. This root layout is
// a pass-through. The root-level not-found/error/loading files can render
// outside the [locale] segment, so each of them carries its own shell.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
