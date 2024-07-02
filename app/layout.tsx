import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { CartProvider } from "./_context/cart";
import AuthProvider from "./_providers/auth";

import { Toaster } from "./_components/ui/sonner";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FSW Foods",
  description: "Peça sua comida favorita",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
