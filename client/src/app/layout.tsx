import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header/Header";
import { Toaster } from "sonner";
import { ModalContextProvider } from "@/contexts/ModalContext";
import Sidebar from "@/components/sidebar/Sidebar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Books Management System",
  description: "Books Management System",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ModalContextProvider>
        <body className={`${inter.className} layout-container`}>
          <Header />

          <Sidebar />
          <main>
            <Toaster
              richColors
              duration={2000}
              position="top-right"
              className="sonner_toast"
            />
            <div id="overlay-root"></div>
            {children}
          </main>
        </body>
      </ModalContextProvider>
    </html>
  );
}
