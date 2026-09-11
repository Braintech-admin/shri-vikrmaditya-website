import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "श्री विक्रमादित्य इंटर कॉलेज | कौंधियरा, प्रयागराज",
  description:
    "श्री विक्रमादित्य इंटर कॉलेज, कौंधियरा, प्रयागराज की आधिकारिक वेबसाइट।",
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