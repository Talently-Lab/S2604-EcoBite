import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "EcoBite · Comida rica que no se desperdicia",
    template: "%s · EcoBite",
  },
  description:
    "Descubrí restaurantes y platos cerca tuyo y ayudá a que no se desperdicie comida.",
  openGraph: {
    type: "website",
    siteName: "EcoBite",
    locale: "es_AR",
    title: "EcoBite · Comida rica que no se desperdicia",
    description:
      "Descubrí restaurantes y platos cerca tuyo y ayudá a que no se desperdicie comida.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#166534" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1712" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a href="#contenido" className="skip-link">
          Ir al contenido
        </a>
        <AuthProvider>
          <Header />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
