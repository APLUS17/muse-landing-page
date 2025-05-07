import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unfold Studio",
  description: "Create beautiful stories",
};

export const viewport: Viewport = {
  width: 475,
  height: 769,
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="overflow-x-hidden bg-black">
        <div className="w-[475px] h-[769px] mx-auto overflow-y-auto overflow-x-hidden relative">
          {children}
        </div>
      </body>
    </html>
  );
}


import './globals.css'