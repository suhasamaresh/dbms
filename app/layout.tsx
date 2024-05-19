import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Page from "@/components/assistant";
import Provider from "@/components/provider";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Page />
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
