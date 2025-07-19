import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body
        className={`min-h-[100dvh] ${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL('https://rhythmdoshi.vercel.app'),
  title: "Rhythm Doshi",
  description: "Personal Portfolio of Rhythm Doshi - Full Stack Developer",
  keywords: ["Rhythm Doshi", "Full Stack Developer", "Portfolio", "Web Development"],
  authors: [{ name: "Rhythm Doshi" }],
  icons: {
    icon: "/R.webp",
  },
  openGraph: {
    title: "Rhythm Doshi - Portfolio",
    description: "Full Stack Developer Portfolio",
    images: ["/R.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhythm Doshi - Portfolio",
    description: "Full Stack Developer Portfolio",
    images: ["/R.webp"],
  },
  other: {
    'csrf-token': crypto.randomUUID()
  }
};
