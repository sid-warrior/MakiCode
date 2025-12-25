import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevType - Master Your Coding Speed",
  description: "Practice typing with real code snippets. Improve your WPM and accuracy with syntax, brackets, and special characters.",
  keywords: ["typing test", "coding", "programming", "WPM", "typing speed", "developer tools"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
