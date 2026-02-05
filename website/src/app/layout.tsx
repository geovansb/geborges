import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "geborges.com | Desenvolvedor & Criador",
  description: "Landing page pessoal de geborges - desenvolvedor, criador e entusiasta de tecnologia. Explore meus projetos, currículo e blog.",
  keywords: ["geborges", "desenvolvedor", "portfolio", "projetos", "blog", "tecnologia"],
  authors: [{ name: "geborges" }],
  openGraph: {
    title: "geborges.com",
    description: "Desenvolvedor & Criador",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
