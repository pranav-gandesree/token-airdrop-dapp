import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/Provider";
import Navbar from "@/components/canvas/Navbar";

export const metadata: Metadata = {
  title: "Token Airdrop",
  description: "Claim your airdrop now!!!"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className="min-h-screen bg-gray-800 font-sans antialiased text-white">

        <Providers>
          <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
