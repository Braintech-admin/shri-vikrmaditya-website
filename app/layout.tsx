import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoToTop from "@/components/GoToTop";

export const metadata: Metadata = {
  title: "श्री विक्रमादित्य इण्टर कॉलेज | कौंधियरा, प्रयागराज",
  description:
    "श्री विक्रमादित्य इण्टर कॉलेज, कौंधियरा, प्रयागराज की आधिकारिक वेबसाइट।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body>
        <Header />

        <main>{children}</main>

        <Footer />

        <GoToTop />
      </body>
    </html>
  );
}