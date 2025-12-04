import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Portfolio | Harshvardhan Bhusari - Full Stack Developer",
  description: "Harshvardhan Bhusari - Full Stack Developer specializing in modern web technologies. View my projects, skills, and get in touch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Animated Starry Background */}
        <div className="stars-background">
          <div className="stars-layer-1"></div>
          <div className="stars-layer-2"></div>
          <div className="stars-layer-3"></div>
          <div className="stars-layer-4"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
