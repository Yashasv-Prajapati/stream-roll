import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stream Roll",
  description: "Upload Video and Share with anyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = false; // Replace with actual authentication status

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <Navbar currentPath={""} isAuthenticated={isAuthenticated} />
        {children}
        <Toaster  />
        <Footer />
      </body>
    </html>
  );
}
