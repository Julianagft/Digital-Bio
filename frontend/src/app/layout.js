import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Digital Bio",
  description: "Link Tree",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
      <main className="flex justify-center h-screen w-screen">
        {children}
      </main>

      </body>
    </html>
  );
}
