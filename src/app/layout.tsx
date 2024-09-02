import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "./components/navbar/navbar";

export const metadata: Metadata = {
  title: "Clon de X",
  description: "Un clon de X hecho con NextJS y Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen w-full grid grid-cols-3">
        <NavBar/>
        {children}
        <div></div>
      </body>
    </html>
  );
}
