import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const atkinsonSans = localFont({
  variable: "--font-display-sans",
  display: "swap",
  src: [
    { path: "./fonts/AtkinsonHyperlegible-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/AtkinsonHyperlegible-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const jetBrainsMono = localFont({
  variable: "--font-display-mono",
  display: "swap",
  src: [
    { path: "./fonts/JetBrainsMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/JetBrainsMono-SemiBold.ttf", weight: "600", style: "normal" },
  ],
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
        className={`${atkinsonSans.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
