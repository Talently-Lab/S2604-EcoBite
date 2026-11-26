import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoBite · Comé rico. Elegí mejor.",
  description:
    "Pedí en restaurantes de tu barrio con envases compostables y entregas de bajas emisiones. Zona piloto: Belgrano, Palermo y Recoleta.",
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
        {children}
      </body>
    </html>
  );
}
