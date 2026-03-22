import type { Metadata } from "next";
import { titlesFont, generalFont } from "@/config/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Reel App",
    default: "Home - Reel App",
  },
  description: "Descubre y compra tus boletos para las mejores películas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${generalFont.variable} ${titlesFont.variable} min-h-screen bg-background`}>
        {children}
      </body>
    </html>
  );
}
