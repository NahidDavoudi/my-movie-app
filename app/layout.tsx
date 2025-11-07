import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Movie App",
  description: "A movie app with custom design system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
