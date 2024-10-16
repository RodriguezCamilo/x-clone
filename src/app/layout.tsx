import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "X - Clon",
  description: "Un clon de X hecho con NextJS y Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      {children}
    </html>
  );
}
