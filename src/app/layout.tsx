import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Saksham — Senior Creative Developer Portfolio",
  description: "Senior Creative Developer portfolio showcasing high-performance web engineering, scroll-driven interactive experiences, and state-of-the-art UI designs.",
  keywords: ["Creative Developer", "Next.js", "Framer Motion", "WebGL", "HTML5 Canvas", "Interactive Developer", "Awwwards Portfolio"],
  authors: [{ name: "Saksham" }],
  openGraph: {
    title: "Saksham — Senior Creative Developer",
    description: "High-end scrollytelling personal portfolio website.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

