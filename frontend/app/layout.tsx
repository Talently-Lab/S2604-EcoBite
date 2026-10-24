import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoBite",
  description: "Plataforma de restaurantes sustentables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bricolage.variable} ${dmSans.variable} antialiased`}
    >
      <body className="min-h-screen bg-canvas flex flex-col">
        <Headers/>
        <main className="grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}