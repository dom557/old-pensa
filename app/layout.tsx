import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://old-pensa.vercel.app/"),
  title: "Pensa Familly | Old  | But  | Gold",
  description:
    " Website for Pensa Members , and their infos (name , role .etc) ",
  keywords: [
    "Pensa",
    "Samdak",
  ],
  openGraph: {
    
    title: "Pensa Familly | Old  | But  | Gold",
    description:
    " Website for Pensa Members , and their infos (name , role .etc) ",
    images: "/graph.jpg",
  },
  alternates: {
    canonical: "https://old-pensa.vercel.app/",
  },};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {children}
      </body>
    </html>
  );
}
