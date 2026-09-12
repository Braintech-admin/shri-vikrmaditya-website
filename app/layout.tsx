import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "श्री विक्रमादित्य इंटर कॉलेज",
  description:
    "श्री विक्रमादित्य इंटर कॉलेज, बरौली कर्मा, कौंधियरा, प्रयागराज",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}